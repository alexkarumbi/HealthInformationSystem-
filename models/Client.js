class Client {
    constructor(id, firstName, lastName, dateOfBirth, gender, contactNumber, email, address) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.dateOfBirth = dateOfBirth;
      this.gender = gender;
      this.contactNumber = contactNumber;
      this.email = email;
      this.address = address;
      this.programEnrollments = []; // List of programs the client is enrolled in
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  
    // Method to enroll client in a program
    enrollInProgram(program, enrollmentDate = new Date()) {
      const enrollment = {
        program,
        enrollmentDate,
        status: 'Active'
      };
      
      // Check if already enrolled
      const existingEnrollment = this.programEnrollments.find(
        e => e.program.id === program.id
      );
      
      if (existingEnrollment) {
        return { success: false, message: 'Client already enrolled in this program' };
      }
      
      this.programEnrollments.push(enrollment);
      this.updatedAt = new Date();
      return { success: true, message: 'Client enrolled successfully' };
    }
  
    // Method to get full name
    getFullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }