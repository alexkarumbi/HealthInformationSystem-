import { useState } from 'react';

export default function ClientProfile({ client, programs, onEnroll }) {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  // Get list of programs client is not enrolled in
  const availablePrograms = programs.filter(program => 
    !client.programEnrollments.some(enrollment => enrollment.program.id === program.id)
  );
  
  const handleEnroll = async () => {
    if (!selectedProgram) return;
    
    const result = await onEnroll(client.id, parseInt(selectedProgram));
    
    if (result.success) {
      setEnrollmentStatus({ type: 'success', message: 'Client enrolled successfully' });
      setSelectedProgram('');
    } else {
      setEnrollmentStatus({ type: 'error', message: result.message || 'Failed to enroll client' });
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setEnrollmentStatus(null);
    }, 3000);
  };
  
  if (!client) {
    return <div>No client selected</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Client Profile</h2>
        <p className="text-gray-600">View and manage client information</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Full Name</label>
                <div className="mt-1 text-gray-900">{client.firstName} {client.lastName}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                <div className="mt-1 text-gray-900">{client.dateOfBirth}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Gender</label>
                <div className="mt-1 text-gray-900">{client.gender}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Contact Number</label>
                <div className="mt-1 text-gray-900">{client.contactNumber}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <div className="mt-1 text-gray-900">{client.email || 'Not provided'}</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500">Address</label>
                <div className="mt-1 text-gray-900">{client.address || 'Not provided'}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">Program Enrollments</h3>
            
            {client.programEnrollments.length > 0 ? (
              <div className="mt-4 space-y-4">
                {client.programEnrollments.map((enrollment, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="font-medium text-gray-900">{enrollment.program.name}</div>
                    <div className="text-sm text-gray-500">{enrollment.program.description}</div>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {enrollment.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-500">
                  Not enrolled in any programs
                </p>
              </div>
            )}
            
            <div className="mt-6">
              <h4 className="font-medium text-gray-900">Enroll in Program</h4>
              
              {availablePrograms.length > 0 ? (
                <div className="mt-2 flex space-x-2">
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select a program...</option>
                    {availablePrograms.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={handleEnroll}
                    disabled={!selectedProgram}
                    className="px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                  >
                    Enroll
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-gray-500">
                  Client is enrolled in all available programs
                </p>
              )}
              
              {enrollmentStatus && (
                <div className={`mt-2 p-2 rounded-md ${
                  enrollmentStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {enrollmentStatus.message}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">API Access</h3>
          <p className="mt-1 text-sm text-gray-500">
            Use the following endpoint to access this client's profile via API:
          </p>
          <div className="mt-2 p-4 bg-gray-50 rounded-md">
            <code className="text-sm">GET /api/clients/{client.id}</code>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Authentication required. Include the Authorization header with your token.
          </p>
        </div>
      </div>
    </div>
  );
}