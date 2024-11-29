// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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

serve(async (req: Request) => {
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
          ...corsHeaders(ALLOWED_ORIGINS[0])
        }
      }
    )
  }

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
        ...corsHeaders(origin)
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
          ...corsHeaders(origin)
        }
      }
    )
  }
}) 