import axios from 'axios';

/**
 * Standardizes error extraction from API responses.
 * Deeply searches for an error message in common backend response structures.
 */
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    // 1. Check for nested message/error in response data
    if (data) {
      if (typeof data === 'string') return data;
      
      // Some backends return { message: "..." } or { error: "..." }
      if (data.message) return data.message;
      if (data.error) return data.error;

      // Handle cases where data is wrapped: { data: { message: "..." } }
      if (data.data?.message) return data.data.message;
      if (data.data?.error) return data.data.error;

      // Handle arrays of errors (common in some APIs)
      if (Array.isArray(data.errors) && data.errors.length > 0) {
        const firstError = data.errors[0];
        return typeof firstError === 'string' ? firstError : firstError.message || firstError.error || 'Validation error';
      }
    }

    // 2. Fallback to axios top-level error message
    if (error.message === 'Network Error') {
      return 'Unable to connect to the server. Please check your internet connection.';
    }

    // 3. Fallback to status text
    if (error.response?.statusText) {
      return `Server Error: ${error.response.statusText}`;
    }

    return error.message || 'An unexpected network error occurred';
  }

  // 4. Standard JS Error
  if (error instanceof Error) {
    return error.message;
  }

  // 5. Final Fallback
  return 'An unexpected error occurred';
};

/**
 * Global error handler for logging and potential UI notification integration.
 */
export const handleApiError = (error: unknown): string => {
  const message = getErrorMessage(error);
  console.error('[API Error]:', {
    message,
    originalError: error
  });
  return message;
};
