// API endpoint for user login
import authService from '../../../services/AuthService';
import { apiResponse, errorResponse } from '../../utils/apiUtils';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return errorResponse(res, 'Method not allowed', 405);
  }

  const { username, password } = req.body;
  
  if (!username || !password) {
    return errorResponse(res, 'Username and password are required');
  }
  
  const result = authService.authenticate(username, password);
  
  if (result.success) {
    return apiResponse(res, {
      success: true,
      token: result.token,
      role: result.role
    });
  } else {
    return errorResponse(res, result.message);
  }
}