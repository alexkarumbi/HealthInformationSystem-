import db from '../../../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../../../utils/apiUtils';
import { encrypt, decrypt } from '../../../../utils/encryption';

// Extended middleware that checks for appropriate role
const requireMedicalAccess = (handler) => {
  return requireAuth((req, res) => {
    // Check if user has appropriate role to access medical records
    if (req.user.role !== 'doctor' && req.user.role !== 'admin') {
      return errorResponse(res, 'Insufficient permissions to access medical records', 403);
    }
    
    // Log access for audit purposes
    console.log(`Medical record access by ${req.user.userId} at ${new Date().toISOString()}`);
    
    return handler(req, res);
  });
};

export default requireMedicalAccess(function handler(req, res) {
  const { id } = req.query;
  const client = db.getClientById(Number(id));
  
  if (!client) {
    return errorResponse(res, 'Client not found', 404);
  }
  
  // GET - retrieve medical records
  if (req.method === 'GET') {
    // In a real system, these would be fetched from a database and decrypted
    const dummyMedicalRecords = [
      {
        id: 1,
        date: '2023-06-15',
        doctorName: 'Dr. Smith',
        diagnosis: 'Common cold',
        prescription: 'Rest and fluids',
        notes: 'Patient showing improvement'
      },
      {
        id: 2,
        date: '2023-05-10',
        doctorName: 'Dr. Johnson',
        diagnosis: 'Seasonal allergies',
        prescription: 'Antihistamines',
        notes: 'Follow up in 2 weeks'
      }
    ];
    
    return apiResponse(res, { 
      success: true, 
      clientId: client.id,
      clientName: client.getFullName(),
      records: dummyMedicalRecords 
    });
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});