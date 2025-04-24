import db from '../../services/DatabaseService';
import { apiResponse, errorResponse, requireAuth } from '../../utils/apiUtils';

export default requireAuth(function handler(req, res) {
  // GET - retrieve all clients or search
  if (req.method === 'GET') {
    const { query } = req.query;
    
    let clients;
    if (query) {
      clients = db.searchClients(query);
    } else {
      clients = db.getAllClients();
    }
    
    return apiResponse(res, { success: true, clients });
  }
  
  // POST - register a new client
  if (req.method === 'POST') {
    const { firstName, lastName, dateOfBirth, gender, contactNumber, email, address } = req.body;
    
    if (!firstName || !lastName) {
      return errorResponse(res, 'First name and last name are required');
    }
    
    const client = db.addClient({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      contactNumber,
      email,
      address
    });
    
    return apiResponse(res, { success: true, client }, 201);
  }
  
  return errorResponse(res, 'Method not allowed', 405);
});