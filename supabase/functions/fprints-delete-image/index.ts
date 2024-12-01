import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders, handleCors } from '../_shared/cors.ts'

const BUNNY_API_KEY = Deno.env.get('BUNNY_API_KEY')
const BUNNY_STORAGE_ZONE = Deno.env.get('BUNNY_STORAGE_ZONE')
const BUNNY_STORAGE_REGION = Deno.env.get('BUNNY_STORAGE_REGION')
const BUNNY_STORAGE_FOLDER = Deno.env.get('BUNNY_STORAGE_FOLDER')

// Supabase client setup
const supabaseClient = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  {
    auth: {
      persistSession: false,
    }
  }
)

serve(async (req: Request) => {
  // Handle CORS preflight
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get user session
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token)

    if (authError || !user) {
      throw new Error('Unauthorized')
    }

    const { imagePath } = await req.json()
    
    if (!imagePath) {
      throw new Error('Image path is required')
    }

    // Extract filename from CDN URL or full path
    const filename = imagePath.split('/').pop()
    if (!filename) {
      throw new Error('Invalid image path')
    }

    // Delete from Bunny.net storage
    const response = await fetch(
      `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${BUNNY_STORAGE_FOLDER}/${filename}`,
      {
        method: 'DELETE',
        headers: {
          'AccessKey': BUNNY_API_KEY!,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`Failed to delete image: ${response.statusText}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Image deleted successfully'
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
      }
    )

  } catch (error) {
    const status = error.message === 'Unauthorized' ? 401 : 400
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      {
        status,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        },
      }
    )
  }
}) 