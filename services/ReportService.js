class ReportService {
    constructor(dbService) {
      this.db = dbService;
    }
    
    generateEnrollmentReport(startDate, endDate) {
      const clients = this.db.getAllClients();
      const programs = this.db.getAllPrograms();
      
      // Convert string dates to Date objects
      const start = startDate ? new Date(startDate) : new Date(0); // Beginning of time
      const end = endDate ? new Date(endDate) : new Date(); // Now
      
      // Initialize program counts
      const programCounts = {};
      programs.forEach(program => {
        programCounts[program.id] = {
          programName: program.name,
          enrollmentCount: 0,
          clientDetails: []
        };
      });
      
      // Count enrollments within date range
      clients.forEach(client => {
        client.programEnrollments.forEach(enrollment => {
          const enrollmentDate = new Date(enrollment.enrollmentDate);
          
          if (enrollmentDate >= start && enrollmentDate <= end) {
            const programId = enrollment.program.id;
            
            if (programCounts[programId]) {
              programCounts[programId].enrollmentCount++;
              programCounts[programId].clientDetails.push({
                clientId: client.id,
                clientName: client.getFullName(),
                enrollmentDate: enrollmentDate
              });
            }
          }
        });
      });
      
      // Convert to array for easier consumption
      const reportData = Object.values(programCounts);
      
      // Add summary statistics
      const totalEnrollments = reportData.reduce((sum, program) => sum + program.enrollmentCount, 0);
      const averageEnrollmentsPerProgram = totalEnrollments / programs.length;
      
      return {
        generatedAt: new Date(),
        period: { startDate: start, endDate: end },
        summary: {
          totalPrograms: programs.length,
          totalEnrollments,
          averageEnrollmentsPerProgram
        },
        programData: reportData
      };
    }
    
    generateClientDemographicsReport() {
      const clients = this.db.getAllClients();
      
      // Gender distribution
      const genderDistribution = {};
      clients.forEach(client => {
        const gender = client.gender || 'Unspecified';
        genderDistribution[gender] = (genderDistribution[gender] || 0) + 1;
      });
      
      // Age distribution
      const ageGroups = {
        'Under 18': 0,
        '18-30': 0,
        '31-45': 0,
        '46-60': 0,
        'Over 60': 0,
        'Unknown': 0
      };
      
      clients.forEach(client => {
        if (!client.dateOfBirth) {
          ageGroups['Unknown']++;
          return;
        }
        
        const birthDate = new Date(client.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        
        if (age < 18) ageGroups['Under 18']++;
        else if (age <= 30) ageGroups['18-30']++;
        else if (age <= 45) ageGroups['31-45']++;
        else if (age <= 60) ageGroups['46-60']++;
        else ageGroups['Over 60']++;
      });
      
      return {
        generatedAt: new Date(),
        totalClients: clients.length,
        genderDistribution,
        ageDistribution: ageGroups
      };
    }
  }
  
  // Export the report service class (not an instance)
  export default ReportService;