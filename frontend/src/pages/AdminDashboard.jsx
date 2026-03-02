import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-lime-400">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p className="text-gray-400 text-sm">
            View, delete or update users
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p className="text-gray-400 text-sm">
            Add or remove PC components
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-xl font-semibold mb-2">View Reports</h2>
          <p className="text-gray-400 text-sm">
            See system analytics
          </p>
        </div>

      </div>
    </div>
  );
}