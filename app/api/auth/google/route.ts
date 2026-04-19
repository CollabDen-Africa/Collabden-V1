import { NextResponse } from 'next/server';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

/**
 * GET /api/auth/google
 * This route redirects the user to the backend's Google authentication endpoint.
 */
export async function GET(request: Request) {
  try {
    const { origin } = new URL(request.url);
    
    // Construct the backend URL with origin information
    const backendUrl = new URL(API_ENDPOINTS.AUTH.GOOGLE_AUTH);
    
    // Try common parameter names for redirecting back to the frontend
    backendUrl.searchParams.set('frontend_url', origin);
    backendUrl.searchParams.set('redirect_uri', `${origin}/auth-callback`);
    
    console.log('Google Auth Initiation: Redirecting to', backendUrl.toString());
    
    return NextResponse.redirect(backendUrl.toString());
  } catch (error) {
    console.error('Google Auth redirect error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate Google authentication' },
      { status: 500 }
    );
  }
}
