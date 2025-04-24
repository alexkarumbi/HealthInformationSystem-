class LoggingService {
    constructor() {
      this.logs = [];
      this.MAX_LOGS = 1000; // Limit the number of in-memory logs
    }
    
    logActivity(userId, action, details, severity = 'info') {
      const logEntry = {
        timestamp: new Date(),
        userId,
        action,
        details,
        severity,
        ip: '127.0.0.1' // In real app, get from request
      };
      
      // Add to in-memory logs (in production, would write to database or file)
      this.logs.unshift(logEntry);
      
      // Trim logs if exceeding max size
      if (this.logs.length > this.MAX_LOGS) {
        this.logs = this.logs.slice(0, this.MAX_LOGS);
      }
      
      // For critical logs, could send alerts
      if (severity === 'critical') {
        this.sendAlert(logEntry);
      }
      
      return logEntry;
    }
    
    getLogs(filters = {}) {
      let filteredLogs = [...this.logs];
      
      // Apply filters
      if (filters.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
      }
      
      if (filters.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filters.action);
      }
      
      if (filters.severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === filters.severity);
      }
      
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        filteredLogs = filteredLogs.filter(log => log.timestamp >= startDate);
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        filteredLogs = filteredLogs.filter(log => log.timestamp <= endDate);
      }
      
      return filteredLogs;
    }
    
    sendAlert(logEntry) {
      // In production, this would send email/SMS/push notification
      console.error('CRITICAL ALERT:', logEntry);
    }
  }
  
  // Create a singleton instance
  const logger = new LoggingService();
  
  // Export the logger service instance
  export default logger;