import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'

// Define allowed User-Agent patterns for API tools
const ALLOWED_USER_AGENTS = [
  /^HTTPie/,
  /^PostmanRuntime/,
  /^insomnia/,
  /^curl/,
  /^Postman/
]

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, user-agent',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  // Check if User-Agent is allowed
  const userAgent = req.headers.get('user-agent') || ''
  const isAllowedClient = ALLOWED_USER_AGENTS.some(pattern => pattern.test(userAgent))

  if (!isAllowedClient) {
    return new Response(
      JSON.stringify({ error: 'Access denied. Only API tools are allowed.' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Get URL parameters
    const url = new URL(req.url)
    const id = url.searchParams.get('id')

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Blueprint ID is required' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Query the blueprints table
    const { data, error } = await supabaseClient
      .from('blueprints')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error

    // Return the response
    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
}) 