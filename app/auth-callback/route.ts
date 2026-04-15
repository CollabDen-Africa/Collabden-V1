import { NextResponse } from 'next/server';
import { ROUTES } from '@/constants/routes';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

/**
 * Handle Google OAuth callback from backend as a Route Handler
 * Expected URL: /auth-callback?token=...
 * This is used because cookies can only be modified in a Server Action or Route Handler.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get('token');

  console.log('AuthCallback (Route Handler): Initializing callback process');

  if (!token) {
    console.error('AuthCallback: No token provided in URL');
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, origin));
  }

  // Set the HTTP-only cookie
  const response = NextResponse.next();
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });

  try {
    // Fetch profile to determine if user is new or returning
    const profileResponse = await fetch(API_ENDPOINTS.AUTH.PROFILE, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const profileData = await profileResponse.json();
    console.log('AuthCallback: Fetched profile data:', JSON.stringify(profileData));

    const user = profileData?.data || profileData?.user;
    
    // Heuristic: If user is not verified or has no profile details, assume new signup
    // Adjust this logic if the backend provides a specific 'isNewUser' flag
    const isNewUser = user && !user.isVerified;

    if (isNewUser) {
      console.log('AuthCallback: New user detected, redirecting to onboarding');
      return NextResponse.redirect(new URL(ROUTES.DASHBOARD.SETUP, origin), {
        headers: response.headers, // Carry over the set-cookie header
      });
    }

    console.log('AuthCallback: Returning user detected, redirecting to dashboard');
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.ROOT, origin), {
      headers: response.headers, // Carry over the set-cookie header
    });
  } catch (error) {
    console.error('AuthCallback: Error during profile check:', error);
    // Fallback to dashboard if profile check fails
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.ROOT, origin), {
      headers: response.headers,
    });
  }
}
