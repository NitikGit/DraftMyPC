import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#2a2a2a] rounded-2xl p-8">
        {/* Tabs */}
        <div className="flex mb-8 bg-[#1a1a1a] rounded-lg p-1">
          <Link to="/signin" className="flex-1 text-center py-2 text-sm text-gray-400 rounded-md">
            Sign In
            </Link>

          <button className="flex-1 text-center py-2 text-sm bg-[#76b900] text-black font-semibold rounded-md">
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm mb-6">Sign up to save your PC builds</p>

        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Display Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#76b900] to-[#8ec926] text-black font-bold rounded-lg hover:scale-105 transition-transform"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/signin" className="text-[#76b900] hover:underline font-medium">
            Sign In
        </Link>
        </p>
      </div>
    </div>
  );
}