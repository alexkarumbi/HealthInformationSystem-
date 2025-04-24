export default function ProgramList({ programs }) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Health Programs</h2>
          <p className="text-gray-600">View all available health programs</p>
        </div>
        
        <div className="p-6">
          {programs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {programs.map(program => (
                <div key={program.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-medium text-gray-900">{program.name}</h3>
                  <p className="mt-2 text-gray-600">{program.description}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    <div>
                      <strong>Start Date:</strong> {new Date(program.startDate).toLocaleDateString()}
                    </div>
                    {program.endDate && (
                      <div>
                        <strong>End Date:</strong> {new Date(program.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No programs available
            </div>
          )}
        </div>
      </div>
    );
  }