import db from '../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../utils/apiUtils';

// Wrap the handler with the auth middleware
export default requireAuth(function handler(req, res) {
  // GET - retrieve all programs
  if (req.method === 'GET') {
    const programs = db.getAllPrograms();
    return apiResponse(res, { success: true, programs });
  }
  
  // POST - create a new program
  if (req.method === 'POST') {
    const { name, description, startDate, endDate } = req.body;
    
    if (!name || !description) {
      return errorResponse(res, 'Name and description are required');
    }
    
    const program = db.addProgram({ name, description, startDate, endDate });
    return apiResponse(res, { success: true, program }, 201);
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});