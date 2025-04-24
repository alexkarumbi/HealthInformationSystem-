import db from '../../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../../utils/apiUtils';

export default requireAuth(function handler(req, res) {
  const { id } = req.query;
  const client = db.getClientById(Number(id));
  
  if (!client) {
    return errorResponse(res, 'Client not found', 404);
  }
  
  // GET - retrieve client details
  if (req.method === 'GET') {
    return apiResponse(res, { success: true, client });
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});