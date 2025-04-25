class AuthService {
  constructor() {
    this.users = [
      { id: 1, username: 'doctor1', password: 'securepass1', role: 'doctor' },
      { id: 2, username: 'admin', password: 'adminpass', role: 'admin' }
    ];
    this.sessions = {};
  }

  authenticate(username, password) {
    try {
      const user = this.users.find(u => u.username === username && u.password === password);
      if (!user) {
        return { success: false, message: 'Invalid credentials' };
      }
      
      const sessionToken = this.generateSessionToken();
      this.sessions[sessionToken] = {
        userId: user.id,
        role: user.role,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      };
      
      console.log(`New session created for ${username}. Token: ${sessionToken}`); // Debug log
      
      return {
        success: true,
        token: sessionToken,
        role: user.role,
        userId: user.id
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, message: 'Authentication failed' };
    }
  }

  validateSession(token) {
    if (!token) return false;
    
    const session = this.sessions[token];
    if (!session) {
      console.log(`Session not found for token: ${token}`);
      return false;
    }
    
    const now = new Date();
    if (now > session.expiresAt) {
      console.log(`Session expired for token: ${token}. Expired at: ${session.expiresAt}`);
      delete this.sessions[token];
      return false;
    }
    
    return session;
  }

  generateSessionToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
  
  // For debugging
  listActiveSessions() {
    return this.sessions;
  }
}
// Create a singleton instance of the auth service
const auth = new AuthService();
  
// Export the auth service instance
export default auth;
