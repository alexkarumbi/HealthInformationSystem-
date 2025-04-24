import db from '../../services/DatabaseService';
import ReportService from '../../../services/ReportService';
import { apiResponse, errorResponse, requireAuth } from '../../utils/apiUtils';

// Initialize report service with database service
const reportService = new ReportService(db);

export default requireAuth(function handler(req, res) {
  // GET - generate enrollment report
  if (req.method === 'GET') {
    const { startDate, endDate } = req.query;
    
    try {
      const report = reportService.generateEnrollmentReport(startDate, endDate);
      return apiResponse(res, { success: true, report });
    } catch (error) {
      return errorResponse(res, 'Failed to generate report: ' + error.message);
    }
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});