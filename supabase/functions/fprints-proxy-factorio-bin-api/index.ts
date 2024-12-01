import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, handleCors } from '../_shared/cors.ts'

serve(async (req) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Extract blueprint ID from request body
    const { url, type } = await req.json()

    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
          }
        }
      )
    }

    // Fetch from Factorio Bin API
    const response = await fetch(type === 'string' ? `${url}/blueprint.txt` : `${url}/info.json`)
    const data = type === 'string' ? await response.text() : await response.json()

    // Return the response
    return new Response(
      type === 'string' ? data : JSON.stringify(data),
      { 
        status: 200,
        headers: {
          'Content-Type': type === 'string' ? 'text/plain' : 'application/json',
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
