const Dashboard = () => {
    return (
      <div className="p-6 space-y-6">
        {/* Section 1: User Statistics */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-lg font-semibold mb-2">User Statistics</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Active Buyer</p>
                <p className="text-xl font-bold">Buyer</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm">Event Creator</p>
                <p className="text-xl font-bold">Event</p>
              </div>
            </div>
          </div>
  
          {/* Account Management */}
          <div className="bg-white p-4 rounded-md shadow col-span-1">
            <h3 className="font-semibold mb-4">Account Management</h3>
            <ul className="text-sm space-y-2">
              <li>✔️ Banner Verification</li>
              <li>✔️ Verify Scheduler</li>
              <li>✔️ Manage Suspicious</li>
            </ul>
          </div>
  
          {/* Active Buyers */}
          <div className="bg-white p-4 rounded-md shadow col-span-1">
            <h3 className="font-semibold mb-4">Active Buyers</h3>
            <ul className="text-sm space-y-2">
              <li>👤 Jess - 192.35C</li>
              <li>👤 Mark - 198.25C</li>
              <li>👤 Kim - 165.95C</li>
            </ul>
          </div>
        </div>
  
        {/* Section 2: Overview & Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Chart */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold mb-2">User Accounts Overview</h3>
            <div className="h-40 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
              (Bar Chart Placeholder)
            </div>
          </div>
  
          {/* Banner Management */}
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold mb-2">Home Banner Management</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="bg-gray-100 px-2 py-1 rounded">Promotion Tips</button>
              <button className="bg-gray-100 px-2 py-1 rounded">Video Creation</button>
              <button className="bg-gray-100 px-2 py-1 rounded">Creative Ideas</button>
              <button className="bg-gray-100 px-2 py-1 rounded">Task Manager</button>
            </div>
          </div>
        </div>
  
        {/* Section 3: Bottom */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-md shadow col-span-2">
            <h3 className="font-semibold mb-2">Attract More Users</h3>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Social Media</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Social Media</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">Social Media</button>
            </div>
          </div>
  
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="font-semibold mb-2">Refund Request</h3>
            <p className="text-sm">Action needed. 12 open refund requests.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  