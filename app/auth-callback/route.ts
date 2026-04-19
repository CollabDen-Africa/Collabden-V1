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
  
  // Robust token detection: Check all possible parameter names
  const token = searchParams.get('token') || 
                searchParams.get('accessToken') || 
                searchParams.get('auth_token') ||
                searchParams.get('access_token');
                
  // Shared cookie options for consistency
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const, 
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  };

  const error = searchParams.get('error') || 
                searchParams.get('message');

  if (error) {
    console.error('AuthCallback: Backend reported error:', error);
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.LOGIN}?error=${encodeURIComponent(error)}`, origin));
  }

  if (!token) {
    console.error('AuthCallback: No token found in URL parameters');
    return NextResponse.redirect(new URL(`${ROUTES.AUTH.LOGIN}?error=${encodeURIComponent('Authentication failed: No token received')}`, origin));
  }

  // Set the HTTP-only cookie on a baseline response first
  const dashboardUrl = new URL(ROUTES.DASHBOARD.ROOT, origin);
  const response = NextResponse.redirect(dashboardUrl);
  response.cookies.set('auth-token', token, cookieOptions);

  try {
    // Fetch profile to determine if user is new or returning
    const profileUrl = `${API_ENDPOINTS.AUTH.PROFILE}`;
    console.log('AuthCallback: Fetching profile from:', profileUrl);
    
    const profileResponse = await fetch(profileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    });

    if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        const user = profileData?.data || profileData?.user;
        
        // Use a more nuanced check for "new user"
        // If they just signed up via Google, they might be 'verified' but still 'new'
        // Check if they have a profile, or use a specific flag if available
        const isNewUser = user && (!user.isVerified || !user.firstName); 
        
        console.log('AuthCallback: Profile check:', { 
          email: user?.email, 
          isVerified: user?.isVerified, 
          isNewUser 
        });

        if (isNewUser) {
          console.log('AuthCallback: Redirecting to onboarding/intro');
          const onboardResponse = NextResponse.redirect(new URL(ROUTES.DASHBOARD.SETUP, origin));
          onboardResponse.cookies.set('auth-token', token, cookieOptions);
          return onboardResponse;
        }
    } else {
        console.warn('AuthCallback: Profile fetch failed:', profileResponse.status);
    }

    console.log('AuthCallback: Returning user, redirecting to dashboard');
    return response;
  } catch (error) {
    console.error('AuthCallback: Error during profile check:', error);
    // Fallback to dashboard
    return response;
  }
}
