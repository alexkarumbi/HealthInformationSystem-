import { useState } from 'react';

export default function ClientSearch({ onSearch }) {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    ageRange: '',
    program: '',
    enrollmentStatus: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, ...filters });
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search clients by name, email, or contact number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 mr-2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-indigo-600 hover:text-indigo-800"
          >
            {showAdvanced ? 'Hide advanced filters' : 'Show advanced filters'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={filters.gender}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="ageRange" className="block text-sm font-medium text-gray-700">
                Age Range
              </label>
              <select
                id="ageRange"
                name="ageRange"
                value={filters.ageRange}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any</option>
                <option value="under18">Under 18</option>
                <option value="18-30">18-30</option>
                <option value="31-45">31-45</option>
                <option value="46-60">46-60</option>
                <option value="over60">Over 60</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="program" className="block text-sm font-medium text-gray-700">
                Program
              </label>
              <select
                id="program"
                name="program"
                value={filters.program}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any</option>
                <option value="1">TB Control</option>
                <option value="2">Malaria Prevention</option>
                <option value="3">HIV/AIDS Management</option>
                <option value="4">Maternal Health</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="enrollmentStatus" className="block text-sm font-medium text-gray-700">
                Enrollment Status
              </label>
              <select
                id="enrollmentStatus"
                name="enrollmentStatus"
                value={filters.enrollmentStatus}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Any</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}