import { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotImg from "../assets/forgot.jpeg";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const response = await fetch("http://127.0.0.1:5000/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        new_password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Password updated!");
      navigate("/signin");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">

      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src={forgotImg}
          alt="Forgot Password"
          className="w-[80%] max-w-md"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-8 border border-zinc-800 shadow-xl">

          <h1 className="text-white text-3xl font-bold mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-400 mb-6">
            Enter your email and set a new password
          </p>

          <div className="space-y-5">

            <div>
              <label className="text-white text-sm mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white focus:ring-2 focus:ring-lime-400 outline-none"
              />
            </div>

            <div>
              <label className="text-white text-sm mb-2 block">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-lg bg-zinc-800 text-white focus:ring-2 focus:ring-lime-400 outline-none"
              />
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-[#A3FF1A] text-black font-semibold py-3 rounded-lg transition 
                         hover:shadow-[0_0_20px_#A3FF1A] hover:scale-[1.02]"
            >
              Reset Password
            </button>

            <p className="text-gray-400 text-sm text-center mt-4">
              Remember your password?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-lime-400 cursor-pointer hover:underline"
              >
                Sign In
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}