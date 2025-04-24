export default function Sidebar({ activeView, setActiveView, userRole, onLogout }) {
    const navItems = [
      { id: 'clients', label: 'Clients', icon: 'users' },
      { id: 'newClient', label: 'New Client', icon: 'user-plus' },
      { id: 'programs', label: 'Programs', icon: 'list' },
      { id: 'newProgram', label: 'New Program', icon: 'plus-circle', requireAdmin: true }
    ];
    
    return (
      <aside className="w-64 bg-indigo-800 text-white">
        <div className="p-4">
          <h1 className="text-2xl font-bold">HIMS</h1>
          <p className="text-sm text-indigo-200">Health Information Management</p>
        </div>
        
        <nav className="mt-8">
          <ul>
            {navItems.map(item => (
              (!item.requireAdmin || userRole === 'admin') && (
                <li key={item.id}>
                  <button
                    className={`flex items-center w-full px-4 py-3 hover:bg-indigo-700 ${
                      activeView === item.id ? 'bg-indigo-900' : ''
                    }`}
                    onClick={() => setActiveView(item.id)}
                  >
                    <span className="mr-3">
                      <i className={`fas fa-${item.icon}`}></i>
                    </span>
                    {item.label}
                  </button>
                </li>
              )
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-64 p-4 border-t border-indigo-700">
          <button
            className="flex items-center w-full px-4 py-2 text-indigo-200 hover:text-white"
            onClick={onLogout}
          >
            <span className="mr-3">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            Sign Out
          </button>
        </div>
      </aside>
    );
  }