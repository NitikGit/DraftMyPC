import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Papa from "papaparse";
import API_URL from "../config";


export default function Admin() {

  const [components, setComponents] = useState([]);
  
  {/* pagination states */
  }
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
  //State for CSV file
  const [csvRows, setCsvRows] = useState([]);
  const [csvErrors, setCsvErrors] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadingCsv, setUploadingCsv] = useState(false);

  const [stats, setStats] = useState({users: 0,builds: 0,components: 0});

  //Helper to Normalize CSV Row
    const normalizeRow = (row, index) => {
    let specsParsed = {};

    try {
      specsParsed = row.specs ? JSON.parse(row.specs) : {};
    } catch {
      throw new Error(`Row ${index + 2}: specs must be valid JSON`);
    }

    return {
      name: row.name?.trim() || "",
      brand: row.brand?.trim() || "",
      model: row.model?.trim() || "",
      category: row.category?.trim() || "",
      performanceTier: row.tier?.trim() || "",
      price: Number(row.price) || 0,
      imageUrl: row.imageUrl?.trim() || "",
      bestFor: row.bestFor
        ? row.bestFor.split(",").map((x) => x.trim()).filter(Boolean)
        : [],
      specs: specsParsed,
    };
  };

  const parseCsvFile = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedRows = [];
        const errors = [];

        results.data.forEach((row, index) => {
          try {
            const normalized = normalizeRow(row, index);

            if (!normalized.name || !normalized.brand || !normalized.category) {
              errors.push(`Row ${index + 2}: missing required fields`);
              return;
            }

            parsedRows.push(normalized);
          } catch (err) {
            errors.push(err.message);
          }
        });

        setCsvRows(parsedRows);
        setCsvErrors(errors);
      },
      error: (error) => {
        setCsvRows([]);
        setCsvErrors([error.message || "Failed to parse CSV"]);
      },
    });
  };

  const handleCsvInputChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    parseCsvFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    parseCsvFile(file);
  };

  const handleUploadPreviewedCsv = async () => {
    if (!csvRows.length) {
      alert("No valid CSV rows to upload");
      return;
    }

    try {
      setUploadingCsv(true);

      const res = await fetch(`${API_URL}/upload-csv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "role": "admin"
        },
        body: JSON.stringify({ components: csvRows }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      alert(`Uploaded ${data.insertedCount} components successfully`);

      setCsvRows([]);
      setCsvErrors([]);

      const fresh = await fetch(`${API_URL}/components`);
      const freshData = await fresh.json();
      setComponents(freshData);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploadingCsv(false);
    }
  };

  //Get Components API
  useEffect(() => {
  fetch(`${API_URL}/components`, {
    headers: {
      "role": "admin"
    }
  })
  .then(res => res.json())
  .then(data => setComponents(data))
  .catch(err => console.error(err));
  }, []);

  useEffect(() => {
  fetch(`${API_URL}/admin/stats`, {
    headers: {
      "role": "admin"
    }
  })
    .then(res => res.json())
    .then(data => setStats(data))
    .catch(err => console.error(err));
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

  const res = await fetch(`${API_URL}/components`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "role": "admin"
    },
    body: JSON.stringify(newComponent)
  });

  const data = await res.json();
  console.log(data);

  window.location.reload();
};

  //API Delete Component
  const deleteComponent = async (id) => {

  await fetch(`${API_URL}/components/${id}`, {
  method: "DELETE",
  headers: {
    "role": "admin"
  }
});

  setComponents(components.filter(c => c.id !== id));

  };

    const updatePrice = async (comp) => {
  try {
    const res = await fetch(`${API_URL}/update-price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "role": "admin"
      },
      body: JSON.stringify({
        id: comp.id,
        price: Number(comp.price),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Price updated successfully");
    } else {
      alert(data.error || "Update failed");
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};

const navigate = useNavigate();

const handleSignOut = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  navigate("/signin");
};

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      <div className="border-b border-[#1a1a1a] bg-[#111]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          <h1 className="text-2xl font-bold">
            Admin <span className="text-[#76b900]">PC Components</span>
          </h1>

          <div className="flex items-center gap-2">

            <button
              onClick={() => navigate("/price-tracker")}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#1a1a1a] rounded-lg transition"
            >
              Prices
            </button>

            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-semibold bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition"
            >
              Sign Out
            </button>

          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-3 gap-6">

      <div className="bg-[#111] border border-[#222] rounded-xl p-5">
        <p className="text-gray-400 text-sm">Total Users</p>
        <h2 className="text-2xl font-bold text-[#76b900]">{stats.users}</h2>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-xl p-5">
        <p className="text-gray-400 text-sm">Total Builds</p>
        <h2 className="text-2xl font-bold text-[#76b900]">{stats.builds}</h2>
      </div>

      <div className="bg-[#111] border border-[#222] rounded-xl p-5">
        <p className="text-gray-400 text-sm">Total Components</p>
        <h2 className="text-2xl font-bold text-[#76b900]">{stats.components}</h2>
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
              placeholder="GPU"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

            <div className="grid grid-cols-2 gap-3">

              <input name="brand" onChange={handleChange}
                placeholder="Brand eg.NVIDIA"
                className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2"/>

              <input name="model" onChange={handleChange}
                placeholder="Model"
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
              placeholder="Price"
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
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 mb-8">
  <h2 className="text-lg font-semibold mb-4">
    Upload CSV
  </h2>

  <div
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
    className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
      dragActive ? "border-[#76b900] bg-[#76b900]/10" : "border-[#333] bg-[#0f0f0f]"
    }`}
  >
    <p className="mb-3 text-gray-300">
      Drag & drop your CSV here
    </p>

    <p className="mb-4 text-sm text-gray-500">
      or choose a file manually
    </p>

    <input
      type="file"
      accept=".csv"
      onChange={handleCsvInputChange}
      className="block mx-auto text-sm"
    />
  </div>

  {!!csvErrors.length && (
    <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <h3 className="text-red-400 font-semibold mb-2">CSV Errors</h3>
      <div className="space-y-1 text-sm text-red-300">
        {csvErrors.map((err, i) => (
          <p key={i}>{err}</p>
        ))}
      </div>
    </div>
  )}

  {!!csvRows.length && (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Preview ({csvRows.length} rows)</h3>

        <button
          onClick={handleUploadPreviewedCsv}
          disabled={uploadingCsv}
          className="bg-[#76b900] hover:bg-[#8ad000] text-black font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {uploadingCsv ? "Uploading..." : "Upload to DB"}
        </button>
      </div>

      <div className="overflow-x-auto border border-[#222] rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-[#181818]">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Brand</th>
              <th className="text-left px-4 py-3">Model</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Tier</th>
              <th className="text-left px-4 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {csvRows.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-t border-[#222]">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.brand}</td>
                <td className="px-4 py-3">{row.model}</td>
                <td className="px-4 py-3">{row.category}</td>
                <td className="px-4 py-3">{row.performanceTier}</td>
                <td className="px-4 py-3">₹{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {csvRows.length > 10 && (
        <p className="text-xs text-gray-500 mt-2">
          Showing first 10 rows only
        </p>
      )}
    </div>
  )}
</div>
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
                  <th className="text-left py-3 px-4 text-gray-400">Update</th>
                  <th className="text-left py-3 px-4 text-gray-400">Delete</th>
                </tr>
              </thead>
              <tbody>
                {components
                  .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                  .map((c, index) => {
                    const realIndex = (currentPage - 1) * itemsPerPage + index;
                    return (
                      <tr key={c.id} className="border-b border-[#1a1a1a]">

                        <td className="py-3 px-4 font-medium">{c.name}</td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded bg-[#76b900]/10 text-[#76b900] text-xs uppercase">
                            {c.category}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-gray-400">{c.brand}</td>

                        <td className="py-3 px-4">
                          <input
                            type="number"
                            value={c.price}
                            onChange={(e) => {
                              const updated = [...components];
                              updated[realIndex].price = e.target.value;
                              setComponents(updated);
                            }}
                            className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 w-28 text-white"
                          />
                        </td>

                        <td className="py-3 px-4 capitalize">{c.performanceTier}</td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => updatePrice(c)}
                            className="bg-[#76b900] hover:bg-[#8ad000] text-black font-semibold px-3 py-2 rounded-lg"
                          >
                            Update
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteComponent(c.id)}
                            className="p-1.5 rounded hover:bg-red-500/10 text-red-500"
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {Math.ceil(components.length / itemsPerPage) > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#222]">

              <p className="text-sm text-gray-400">
                Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, components.length)} of {components.length}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm bg-[#1a1a1a] border border-[#333] rounded-lg disabled:opacity-40 hover:border-[#76b900] transition"
                >
                  ← Prev
                </button>

                {[...Array(Math.ceil(components.length / itemsPerPage))].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                      currentPage === i + 1
                        ? "bg-[#76b900] text-black border-[#76b900] font-semibold"
                        : "bg-[#1a1a1a] border-[#333] hover:border-[#76b900]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(components.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(components.length / itemsPerPage)}
                  className="px-3 py-1.5 text-sm bg-[#1a1a1a] border border-[#333] rounded-lg disabled:opacity-40 hover:border-[#76b900] transition"
                >
                  Next →
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}