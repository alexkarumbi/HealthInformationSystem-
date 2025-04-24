class DatabaseService {
    constructor() {
      this.clients = [];
      this.programs = [];
      this.nextClientId = 1;
      this.nextProgramId = 1;
    }
  
    // Client methods
    addClient(clientData) {
      const id = this.nextClientId++;
      const client = new Client(
        id,
        clientData.firstName,
        clientData.lastName,
        clientData.dateOfBirth,
        clientData.gender,
        clientData.contactNumber,
        clientData.email,
        clientData.address
      );
      this.clients.push(client);
      return client;
    }
  
    getClientById(id) {
      return this.clients.find(client => client.id === Number(id)) || null;
    }
  
    searchClients(query) {
      query = query.toLowerCase();
      return this.clients.filter(client => 
        client.firstName.toLowerCase().includes(query) ||
        client.lastName.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query) ||
        client.contactNumber.includes(query)
      );
    }
  
    getAllClients() {
      return this.clients;
    }
  
    // Program methods
    addProgram(programData) {
      const id = this.nextProgramId++;
      const program = new HealthProgram(
        id,
        programData.name,
        programData.description,
        programData.startDate,
        programData.endDate
      );
      this.programs.push(program);
      return program;
    }
  
    getProgramById(id) {
      return this.programs.find(program => program.id === Number(id)) || null;
    }
  
    getAllPrograms() {
      return this.programs;
    }
  
    // Enrollment methods
    enrollClientInProgram(clientId, programId) {
      const client = this.getClientById(clientId);
      const program = this.getProgramById(programId);
      
      if (!client) {
        return { success: false, message: 'Client not found' };
      }
      
      if (!program) {
        return { success: false, message: 'Program not found' };
      }
      
      return client.enrollInProgram(program);
    }
  }
  
  // Create a singleton instance of the database service
  const db = new DatabaseService();
  
  // Add some initial data for demonstration
  db.addProgram({ name: 'TB Control', description: 'Tuberculosis screening and treatment program' });
  db.addProgram({ name: 'Malaria Prevention', description: 'Malaria prevention and treatment initiative' });
  db.addProgram({ name: 'HIV/AIDS Management', description: 'Comprehensive HIV/AIDS care and support' });
  db.addProgram({ name: 'Maternal Health', description: 'Pre and post-natal care for expectant mothers' });
  
  // Export the database service instance
  export default db;