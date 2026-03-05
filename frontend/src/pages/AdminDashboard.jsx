import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export default function Admin() {

  const [components, setComponents] = useState([]);

  const [form, setForm] = useState({
  name: "",
  brand: "",
  model: "",
  category: "cpu",
  tier: "budget",
  price: "",
  imageUrl: "",
  bestFor: "",
  specs: "{}"
  });

  //Get Components API
  useEffect(() => {
  fetch("http://127.0.0.1:5000/components")
  .then(res => res.json())
  .then(data => setComponents(data));
  }, []);

  //Handle Entry
  const handleChange = (e) => {
  setForm({
  ...form,
  [e.target.name]: e.target.value
  });
  };

  //API Add Component
  const handleSubmit = async (e) => {
  e.preventDefault();

  const newComponent = {
    id: Date.now().toString(),
    name: form.name,
    brand: form.brand,
    model: form.model,
    category: form.category,
    performanceTier: form.tier,
    price: Number(form.price),
    imageUrl: form.imageUrl,
    bestFor: form.bestFor.split(",").map(x => x.trim()),
    specs: JSON.parse(form.specs)
  };

  await fetch("http://127.0.0.1:5000/components", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newComponent)
  });

  window.location.reload();

  };

  //API Delete Component
  const deleteComponent = async (id) => {

  await fetch(`http://127.0.0.1:5000/components/${id}`, {
    method: "DELETE"
  });

  setComponents(components.filter(c => c.id !== id));

  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <div className="border-b border-[#1a1a1a] bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button className="p-2 rounded hover:bg-[#1a1a1a] transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-2xl font-bold">
            Admin  <span className="text-[#76b900]">PC Components</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[400px_1fr] gap-8">

        <div className="bg-[#111] border border-[#222] rounded-xl p-6 h-fit">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="text-[#76b900] text-xl">+</span> Add Component
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name *</label>
              <input
                type="text"
                placeholder="RTX 4090 Founders Edition"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Brand *</label>
                <input
                  type="text"
                  placeholder="NVIDIA"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Model *</label>
                <input
                  type="text"
                  placeholder="RTX 4090"
                  className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category</label>
                <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#76b900]">
                  <option value="cpu">CPU</option>
                  <option value="gpu">GPU</option>
                  <option value="motherboard">MOTHERBOARD</option>
                  <option value="ram">RAM</option>
                  <option value="storage">STORAGE</option>
                  <option value="psu">PSU</option>
                  <option value="case">CASE</option>
                  <option value="cooler">COOLER</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tier</label>
                <select className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#76b900]">
                  <option value="budget">Budget</option>
                  <option value="mid-range">Mid-Range</option>
                  <option value="high-end">High-End</option>
                  <option value="enthusiast">Enthusiast</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Price (₹) *</label>
              <input
                type="number"
                placeholder="159999"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Best For (comma-separated)</label>
              <input
                type="text"
                placeholder="gaming, video editing, 3d rendering"
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#76b900]"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Specs (JSON)</label>
              <textarea
                rows={4}
                placeholder='{"cores": 16, "clock": "3.5 GHz"}'
                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 font-mono focus:outline-none focus:border-[#76b900]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#76b900] hover:bg-[#8ad000] text-black font-semibold py-2.5 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(118,185,0,0.3)]"
            >
              Add Component
            </button>
          </form>
        </div>


        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-6">Components (3)</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Brand</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Price</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tier</th>
                  <th className="py-3 px-4 w-12"></th>
                </tr>
              </thead>
              <tbody>
               
                <tr className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition">
                  <td className="py-3 px-4 font-medium">RTX 4090 FE</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-[#76b900]/10 text-[#76b900] text-xs font-semibold uppercase">GPU</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">NVIDIA</td>
                  <td className="py-3 px-4 text-[#76b900] font-semibold">₹1,59,999</td>
                  <td className="py-3 px-4 text-gray-400 capitalize">Enthusiast</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded hover:bg-red-500/10 text-red-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>

                
                <tr className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition">
                  <td className="py-3 px-4 font-medium">Ryzen 9 7950X</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-[#76b900]/10 text-[#76b900] text-xs font-semibold uppercase">CPU</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">AMD</td>
                  <td className="py-3 px-4 text-[#76b900] font-semibold">₹44,999</td>
                  <td className="py-3 px-4 text-gray-400 capitalize">High-End</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded hover:bg-red-500/10 text-red-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>

               
                <tr className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a]/50 transition">
                  <td className="py-3 px-4 font-medium">Corsair Vengeance 32GB</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded bg-[#76b900]/10 text-[#76b900] text-xs font-semibold uppercase">RAM</span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">Corsair</td>
                  <td className="py-3 px-4 text-[#76b900] font-semibold">₹9,499</td>
                  <td className="py-3 px-4 text-gray-400 capitalize">Mid-Range</td>
                  <td className="py-3 px-4">
                    <button className="p-1.5 rounded hover:bg-red-500/10 text-red-500 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}