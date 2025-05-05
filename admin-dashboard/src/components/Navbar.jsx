const Navbar = () => {
    return (
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search for users"
          className="px-4 py-2 border rounded-md w-1/3"
        />
        <div className="flex items-center gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Add</button>
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    );
  };
  
  export default Navbar;
  