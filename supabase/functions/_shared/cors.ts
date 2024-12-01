// Base CORS headers
const baseCorsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, user-agent',
  'Access-Control-Max-Age': '86400', // Cache preflight request for 24 hours
}

// Allowed origins for most functions
const ALLOWED_ORIGINS = [
  'https://fprints.xyz',
  'http://localhost:5173'
]

// Helper function to create CORS headers for a specific origin
function createCorsHeaders(origin: string | null) {
  // If origin is in allowed list, use it; otherwise use the first allowed origin
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin || '') ? origin : ALLOWED_ORIGINS[0]
  return {
    ...baseCorsHeaders,
    'Access-Control-Allow-Origin': allowedOrigin,
    'Vary': 'Origin',
  }
}

// Standard CORS headers with origin restriction
export const corsHeaders = createCorsHeaders(ALLOWED_ORIGINS[0])

// Special headers for fprints-api that allows any origin
export const openCorsHeaders = {
  ...baseCorsHeaders,
  'Access-Control-Allow-Origin': '*',
}

// Helper function to handle CORS preflight requests and origin validation
export function handleCors(req: Request, headers = corsHeaders) {
  try {
    const origin = req.headers.get('origin')
    
    // For fprints-api (using openCorsHeaders), allow any origin
    if (headers === openCorsHeaders) {
      if (req.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: openCorsHeaders
        })
      }
      // Update headers for non-preflight requests
      Object.assign(headers, openCorsHeaders)
      return null
    }
    
    // For all other functions, create appropriate CORS headers
    const responseHeaders = createCorsHeaders(origin)
    
    // For preflight requests
    if (req.method === 'OPTIONS') {
      // Always respond to OPTIONS with appropriate CORS headers
      return new Response(null, {
        status: 204,
        headers: responseHeaders
      })
    }
    
    // For actual requests, check origin
    if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
      return new Response(
        JSON.stringify({ 
          error: 'Origin not allowed',
          origin: origin || 'no origin',
          allowedOrigins: ALLOWED_ORIGINS 
        }),
        {
          status: 403,
          headers: {
            'Content-Type': 'application/json',
            ...responseHeaders
          }
        }
      )
    }

    // Update the headers for subsequent use in the request
    Object.assign(headers, responseHeaders)
    
    return null
  } catch (error) {
    console.error('CORS handling error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'CORS error',
        message: error.message,
        stack: error.stack
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': ALLOWED_ORIGINS[0],
          ...baseCorsHeaders
        }
      }
    )
  }
} 