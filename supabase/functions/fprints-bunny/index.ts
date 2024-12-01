// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
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

interface UploadRequestBody {
  base64Data: string
}

const getContentTypeAndExt = (base64Data: string): { contentType: string, extension: string } => {
  const match = base64Data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/)
  if (!match) {
    throw new Error('Invalid base64 data format')
  }
  
  const contentType = match[1]
  const extension = contentType.split('/')[1]
  
  return { contentType, extension }
}

const generateUniqueFilename = (extension: string): string => {
  const uuid = crypto.randomUUID()
  return `${uuid}.${extension}`
}

// Add size limit constant (10MB in bytes)
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

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

    const { base64Data }: UploadRequestBody = await req.json()

    if (!base64Data) {
      throw new Error('Missing base64 data')
    }

    // Get content type and extension from base64 data
    const { contentType, extension } = getContentTypeAndExt(base64Data)

    // Validate content type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(contentType)) {
      throw new Error('Invalid content type. Only images are allowed.')
    }

    // Remove data:image/xyz;base64, prefix
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '')
    
    // Convert base64 to binary
    const binaryData = Uint8Array.from(atob(cleanBase64), c => c.charCodeAt(0))

    // Check file size
    if (binaryData.length > MAX_FILE_SIZE) {
      throw new Error('File size exceeds limit of 10MB')
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(extension)

    // Upload to Bunny.net storage
    const response = await fetch(
      `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${BUNNY_STORAGE_FOLDER}/${uniqueFilename}`,
      {
        method: 'PUT',
        headers: {
          'AccessKey': BUNNY_API_KEY!,
          'Content-Type': contentType,
        },
        body: binaryData,
      }
    )

    if (!response.ok) {
      throw new Error(`Bunny.net upload failed: ${response.statusText}`)
    }

    const cdnUrl = `https://${BUNNY_STORAGE_ZONE}.b-cdn.net/${BUNNY_STORAGE_FOLDER}/${uniqueFilename}`

    return new Response(
      JSON.stringify({ 
        success: true,
        url: cdnUrl
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

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/fprints-bunny' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
