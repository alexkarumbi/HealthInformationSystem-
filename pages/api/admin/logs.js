
import logService from '../../../services/LoggingService';
import { apiResponse, errorResponse, requireAuth } from '../../utils/apiUtils';

// Admin middleware
const requireAdmin = (handler) => {
  return requireAuth((req, res) => {
    if (req.user.role !== 'admin') {
      return errorResponse(res, 'Admin access required', 403);
    }
    return handler(req, res);
  });
};

export default requireAdmin(function handler(req, res) {
  // GET - retrieve system logs
  if (req.method === 'GET') {
    const { userId, action, severity, startDate, endDate } = req.query;
    
    const logs = logService.getLogs({
      userId: userId ? Number(userId) : undefined,
      action,
      severity,
      startDate,
      endDate
    });
    
    return apiResponse(res, { success: true, logs });
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});
