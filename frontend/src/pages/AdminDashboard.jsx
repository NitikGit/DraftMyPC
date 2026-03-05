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

  let specsParsed;

  try {
    specsParsed = JSON.parse(form.specs);
  } catch {
    alert("Specs must be valid JSON");
    return;
  }

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
    specs: specsParsed
  };

  const res = await fetch("http://127.0.0.1:5000/components", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newComponent)
  });

  const data = await res.json();
  console.log(data);

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
          <h1 className="text-2xl font-bold">
            Admin <span className="text-[#76b900]">PC Components</span>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[400px_1fr] gap-8">

        {/* ADD COMPONENT */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 h-fit">

          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <span className="text-[#76b900] text-xl">+</span> Add Component
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <input name="name" onChange={handleChange}
              placeholder="RTX 4090 Founders Edition"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            <div className="grid grid-cols-2 gap-3">

              <input name="brand" onChange={handleChange}
                placeholder="NVIDIA"
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

              <input name="model" onChange={handleChange}
                placeholder="RTX 4090"
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <select name="category" onChange={handleChange}
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2">

                <option value="cpu">CPU</option>
                <option value="gpu">GPU</option>
                <option value="motherboard">Motherboard</option>
                <option value="ram">RAM</option>
                <option value="storage">Storage</option>
                <option value="psu">PSU</option>
                <option value="case">Case</option>
                <option value="cooler">Cooler</option>

              </select>

              <select name="tier" onChange={handleChange}
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2">

                <option value="budget">Budget</option>
                <option value="mid-range">Mid Range</option>
                <option value="high-end">High End</option>
                <option value="enthusiast">Enthusiast</option>

              </select>

            </div>

            <input name="price" type="number" onChange={handleChange}
              placeholder="159999"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            <input name="imageUrl" onChange={handleChange}
              placeholder="https://image-url"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            <input name="bestFor" onChange={handleChange}
              placeholder="gaming, editing"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            <textarea name="specs" rows={4} onChange={handleChange}
              placeholder='{"cores":16,"clock":"3.5GHz"}'
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 font-mono"/>

            <button
              type="submit"
              className="w-full bg-[#76b900] hover:bg-[#8ad000] text-black font-semibold py-2.5 rounded-lg">
              Add Component
            </button>

          </form>

        </div>

        {/* COMPONENT TABLE */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-6">
            Components ({components.length})
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left py-3 px-4 text-gray-400">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400">Category</th>
                  <th className="text-left py-3 px-4 text-gray-400">Brand</th>
                  <th className="text-left py-3 px-4 text-gray-400">Price</th>
                  <th className="text-left py-3 px-4 text-gray-400">Tier</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                {components.map((c) => (

                  <tr key={c.id} className="border-b border-[#1a1a1a]">

                    <td className="py-3 px-4 font-medium">{c.name}</td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded bg-[#76b900]/10 text-[#76b900] text-xs uppercase">
                        {c.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-gray-400">{c.brand}</td>

                    <td className="py-3 px-4 text-[#76b900] font-semibold">
                      ₹{c.price}
                    </td>

                    <td className="py-3 px-4 capitalize">
                      {c.performance_tier}
                    </td>

                    <td className="py-3 px-4">

                      <button
                        onClick={() => deleteComponent(c.id)}
                        className="p-1.5 rounded hover:bg-red-500/10 text-red-500">

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}