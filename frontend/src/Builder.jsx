import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Box,
  Fan,
  Plus,
  ArrowLeft,
  ChevronRight,
  Trash2,
  Zap
} from "lucide-react";

const dummyComponents = [
  { id: 1, name: "Ryzen 5 5600X", category: "cpu", price: 25000 },
  { id: 2, name: "RTX 3060", category: "gpu", price: 48000 },
  { id: 3, name: "16GB DDR4 RAM", category: "ram", price: 9000 },
  { id: 4, name: "1TB SSD", category: "storage", price: 11000 }
];

const categoryIcons = {
  cpu: Cpu,
  gpu: Monitor,
  motherboard: Zap,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Box,
  case: Box,
  cooler: Fan
};

const categories = [
  { id: "cpu", name: "Processor" },
  { id: "gpu", name: "Graphics Card" },
  { id: "motherboard", name: "Motherboard" },
  { id: "ram", name: "RAM" },
  { id: "storage", name: "Storage" },
  { id: "psu", name: "Power Supply" },
  { id: "case", name: "Case" },
  { id: "cooler", name: "Cooling" }
];

const Builder = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("cpu");
  const [selectedComponents, setSelectedComponents] = useState({});

  const categoryComponents = useMemo(() => {
    return dummyComponents.filter(
      c => c.category === selectedCategory
    );
  }, [selectedCategory]);

  const totalCost = useMemo(() => {
    return Object.values(selectedComponents).reduce(
      (sum, comp) => sum + (comp?.price || 0),
      0
    );
  }, [selectedComponents]);

  const handleAddComponent = (component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
  };

  const handleRemoveComponent = (category) => {
    setSelectedComponents(prev => {
      const next = { ...prev };
      delete next[category];
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full z-50 bg-black border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-lime-400" />
            <span className="text-xl font-bold">PC Builder</span>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex">

        {/* LEFT SIDEBAR */}
        <aside className="w-72 border-r border-gray-800 p-6">
          <div className="space-y-2">
            {categories.map(category => {
              const Icon = categoryIcons[category.id] || Box;
              const isSelected = selectedComponents[category.id];

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition
                  ${selectedCategory === category.id 
                    ? "bg-lime-500/10 border-lime-400 text-lime-400"
                    : "bg-zinc-900 border-zinc-800 hover:border-lime-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{category.name}</span>
                  </div>

                  {isSelected && (
                    <Badge className="bg-lime-500/20 text-lime-400">
                      ✓
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">
            Select {selectedCategory.toUpperCase()}
          </h1>

          <div className="space-y-4">
            {categoryComponents.map(component => (
              <Card
                key={component.id}
                className="p-6 bg-zinc-900 border border-zinc-800"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold">
                      {component.name}
                    </h3>
                    <p className="text-lime-400 font-bold">
                      NPR {component.price.toLocaleString()}
                    </p>
                  </div>

                  {selectedComponents[component.category]?.id === component.id ? (
                    <Button
                      variant="outline"
                      onClick={() => handleRemoveComponent(component.category)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  ) : (
                    <Button onClick={() => handleAddComponent(component)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 border-l border-gray-800 p-6">
          <h3 className="text-lg font-bold mb-4">Your Build</h3>

          {Object.entries(selectedComponents).map(([key, comp]) =>
            comp ? (
              <div
                key={key}
                className="mb-3 bg-zinc-900 p-3 rounded-lg"
              >
                <div className="flex justify-between">
                  <span>{comp.name}</span>
                  <Trash2
                    className="w-4 h-4 cursor-pointer text-red-500"
                    onClick={() => handleRemoveComponent(key)}
                  />
                </div>

                <div className="text-lime-400">
                  NPR {comp.price.toLocaleString()}
                </div>
              </div>
            ) : null
          )}

          <div className="mt-6 border-t border-gray-800 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-lime-400">
                NPR {totalCost.toLocaleString()}
              </span>
            </div>

            <Button
              className="w-full mt-4"
              onClick={() => navigate("/dashboard")}
            >
              Continue
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Builder;
