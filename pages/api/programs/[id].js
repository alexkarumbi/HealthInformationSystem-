// API endpoint for specific health program
import db from '../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../utils/apiUtils';

export default requireAuth(function handler(req, res) {
  const { id } = req.query;
  const program = db.getProgramById(Number(id));
  
  if (!program) {
    return errorResponse(res, 'Program not found', 404);
  }
  
  // GET - retrieve program details
  if (req.method === 'GET') {
    return apiResponse(res, { success: true, program });
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});