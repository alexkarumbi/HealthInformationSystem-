import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ClientList from './ClientList';
import ClientProfile from './ClientProfile';
import ProgramList from './ProgramList';
import NewClient from './NewClient';
import NewProgram from './NewProgram';

export default function Dashboard({ token, userRole, onLogout }) {
  const [activeView, setActiveView] = useState('clients');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Fetch clients and programs on load
  useEffect(() => {
    fetchClients();
    fetchPrograms();
  }, []);
  
  const fetchClients = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/clients', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setClients(data.clients);
      } else {
        setError(data.message || 'Failed to fetch clients');
      }
    } catch (err) {
      setError('An error occurred while fetching clients');
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchPrograms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/programs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPrograms(data.programs);
      } else {
        setError(data.message || 'Failed to fetch programs');
      }
    } catch (err) {
      setError('An error occurred while fetching programs');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClientSelect = (client) => {
    setSelectedClient(client);
    setActiveView('clientProfile');
  };
  
  const handleAddClient = async (clientData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(clientData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setClients([...clients, data.client]);
        setActiveView('clients');
      } else {
        setError(data.message || 'Failed to add client');
      }
    } catch (err) {
      setError('An error occurred while adding client');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddProgram = async (programData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(programData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        setPrograms([...programs, data.program]);
        setActiveView('programs');
      } else {
        setError(data.message || 'Failed to add program');
      }
    } catch (err) {
      setError('An error occurred while adding program');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEnrollClient = async (clientId, programId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/clients/${clientId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ programId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Refresh client data to show updated enrollments
        fetchClients();
        return { success: true };
      } else {
        setError(data.message || 'Failed to enroll client');
        return { success: false, message: data.message };
      }
    } catch (err) {
      setError('An error occurred while enrolling client');
      return { success: false, message: 'An error occurred' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderActiveView = () => {
    switch (activeView) {
      case 'clients':
        return <ClientList clients={clients} onClientSelect={handleClientSelect} />;
      case 'clientProfile':
        return (
          <ClientProfile 
            client={selectedClient} 
            programs={programs} 
            onEnroll={handleEnrollClient} 
          />
        );
      case 'programs':
        return <ProgramList programs={programs} />;
      case 'newClient':
        return <NewClient onSubmit={handleAddClient} />;
      case 'newProgram':
        return <NewProgram onSubmit={handleAddProgram} />;
      default:
        return <ClientList clients={clients} onClientSelect={handleClientSelect} />;
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        userRole={userRole} 
        onLogout={onLogout} 
      />
      
      <main className="flex-1 overflow-auto p-6">
        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 rounded-md">
            {error}
            <button 
              className="float-right font-bold"
              onClick={() => setError('')}
            >
              ×
            </button>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          renderActiveView()
        )}
      </main>
    </div>
  );
}