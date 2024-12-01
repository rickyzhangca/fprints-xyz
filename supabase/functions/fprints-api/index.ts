import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { handleCors, openCorsHeaders } from '../_shared/cors.ts'


serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req, openCorsHeaders)
  if (corsResponse) return corsResponse

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
            ...openCorsHeaders
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
          ...openCorsHeaders
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
          ...openCorsHeaders
        }
      }
    )
  }
}) 