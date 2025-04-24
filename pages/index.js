import { useState, useEffect } from 'react';
import Head from 'next/head';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [userRole, setUserRole] = useState('');
  
  // Check if user is already logged in on page load
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedRole = localStorage.getItem('userRole');
    
    if (savedToken && savedRole) {
      setToken(savedToken);
      setUserRole(savedRole);
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogin = (loginData) => {
    setToken(loginData.token);
    setUserRole(loginData.role);
    setIsAuthenticated(true);
    
    // Save authentication data
    localStorage.setItem('authToken', loginData.token);
    localStorage.setItem('userRole', loginData.role);
  };
  
  const handleLogout = () => {
    setToken('');
    setUserRole('');
    setIsAuthenticated(false);
    
    // Clear saved authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Health Information Management System</title>
        <meta name="description" content="Manage health programs and client information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {isAuthenticated ? (
        <Dashboard token={token} userRole={userRole} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}
