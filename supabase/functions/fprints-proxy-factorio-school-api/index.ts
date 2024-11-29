import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

// Define allowed origins for CORS
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://fprints.xyz'
]

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Vary': 'Origin'
})

serve(async (req) => {
  const origin = req.headers.get('origin') || ALLOWED_ORIGINS[0]

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(origin)
    })
  }

  // Check if origin is allowed
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(
      JSON.stringify({ error: 'Origin not allowed' }),
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin)
        }
      }
    )
  }
  
  try {
    // Extract blueprint ID from request body
    const { id } = await req.json()

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Blueprint ID is required' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders(origin)
          }
        }
      )
    }

    // Fetch from Factorio School API
    const response = await fetch(`https://www.factorio.school/api/blueprint/${id}`)
    const data = await response.json()

    // Return the response
    return new Response(
      JSON.stringify(data),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders(origin)
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
          ...corsHeaders(origin)
        }
      }
    )
  }
})
