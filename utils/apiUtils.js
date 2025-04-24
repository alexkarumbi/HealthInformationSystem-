export const apiResponse = (res, data, status = 200) => {
    return res.status(status).json(data);
  };
  
  export const errorResponse = (res, message, status = 400) => {
    return res.status(status).json({ success: false, message });
  };
  
  // Authentication middleware function
  export const requireAuth = (handler) => {
    return async (req, res) => {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return errorResponse(res, 'Authentication required', 401);
      }
      
      const session = authService.validateSession(token);
      if (!session) {
        return errorResponse(res, 'Invalid or expired session', 401);
      }
      
      // Add user information to the request
      req.user = session;
      
      // Continue to the actual handler
      return handler(req, res);
    };
  };