// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders, handleCors } from '../_shared/cors.ts'

serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get image URL from request body
    const { url } = await req.json()
    
    if (!url) {
      throw new Error('Missing image URL')
    }

    // Fetch the image
    const imageResponse = await fetch(url)
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`)
    }

    // Get the content type from the original response
    const contentType = imageResponse.headers.get('content-type')
    
    // Stream the image data
    return new Response(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/jpeg', // Fallback to jpeg if no content type
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        ...corsHeaders
      }
    })

  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
}) 