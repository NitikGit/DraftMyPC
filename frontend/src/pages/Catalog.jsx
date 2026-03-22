import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Search,
  Filter,
  Cpu,
  Monitor,
  HardDrive,
  MemoryStick,
  Box,
  Fan,
  Zap,
  ExternalLink
} from "lucide-react";


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

const tierColors = {
  budget: "bg-green-500/20 text-green-400 border-green-500/30",
  "mid-range": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "high-end": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  enthusiast: "bg-orange-500/20 text-orange-400 border-orange-500/30"
};

const Catalog = () => {
  const navigate = useNavigate();

  const [components, setComponents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTier, setSelectedTier] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [loading, setLoading] = useState(true);

  const categories = ["all", "cpu", "gpu", "motherboard", "ram", "storage", "psu", "case", "cooler"];
  const tiers = ["all", "budget", "mid-range", "high-end", "enthusiast"];

  // ✅ FETCH FROM YOUR FLASK BACKEND (SAME AS BUILDER)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/components")
      .then(res => res.json())
      .then(data => {
        console.log("catalog:", data);
        setComponents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const maxPrice = components.length
    ? Math.max(...components.map(c => c.price))
    : 500000;

  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesSearch =
        component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || component.category === selectedCategory;

      const matchesTier =
        selectedTier === "all" || component.performanceTier === selectedTier;

      const matchesPrice =
        component.price >= priceRange[0] &&
        component.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesTier && matchesPrice;
    });
  }, [components, searchQuery, selectedCategory, selectedTier, priceRange]);

  return (
    

export default Catalog;