import authService from '../services/AuthService'; 

export const apiResponse = (res, data, status = 200) => {
  return res.status(status).json(data);
};

export const errorResponse = (res, message, status = 400) => {
  return res.status(status).json({ success: false, message });
};

export const requireAuth = (handler) => {
  return async (req, res) => {
    // Skip auth for certain endpoints
    if (req.url.includes('/api/auth')) {
      return handler(req, res);
    }

    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return errorResponse(res, 'Authentication required', 401);
    }
    
    const session = authService.validateSession(token);
    if (!session) {
      return errorResponse(res, 'Invalid or expired session', 401);
    }
    
    // Add consistent user information
    req.user = {
      userId: session.userId,
      role: session.role
    };
    
    return handler(req, res);
  };
};