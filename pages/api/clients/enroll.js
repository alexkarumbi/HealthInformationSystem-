import db from '../../../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../../../utils/apiUtils';

export default requireAuth(function handler(req, res) {
  // POST - enroll client in a program
  if (req.method === 'POST') {
    const { clientId } = req.query;
    const { programId } = req.body;
    
    if (!programId) {
      return errorResponse(res, 'Program ID is required');
    }
    
    const result = db.enrollClientInProgram(Number(clientId), Number(programId));
    
    if (result.success) {
      return apiResponse(res, { success: true, message: result.message });
    } else {
      return errorResponse(res, result.message);
    }
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});
