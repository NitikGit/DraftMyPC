import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      
      <h1 className="text-4xl font-bold mb-6">
        Welcome to Your Dashboard
      </h1>

      <p className="text-gray-400 mb-10">
        Manage your PC builds here
      </p>

      <button
        onClick={() => navigate("/builder")}
        className="bg-lime-400 text-black px-6 py-3 rounded-lg font-semibold 
                   hover:shadow-[0_0_20px_#A3FF1A] transition-all duration-300"
      >
        Go to PC Builder
      </button>

    </div>
  );
}
