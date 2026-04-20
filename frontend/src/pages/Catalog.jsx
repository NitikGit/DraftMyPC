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
import API_URL from "../config";


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

  useEffect(() => {
    fetch(`${API_URL}/components`)
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
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-lime" />
              <span className="text-xl font-bold text-foreground">Parts Catalog</span>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/builder")}>
            Open Builder
          </Button>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-7xl">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              PC Components Catalog
            </h1>
            <p className="text-muted-foreground">
              Browse {components.length}+ components with specs, pricing & retailer links
            </p>
          </div>

          <Card className="bg-card border-glass-border p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-lime" />
              <h3 className="font-semibold text-foreground">Filters</h3>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary border-glass-border"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-secondary border-glass-border">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTier} onValueChange={setSelectedTier}>
                <SelectTrigger className="bg-secondary border-glass-border">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier === "all" ? "All Tiers" : tier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  NPR {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()}
                </div>
                <Slider
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
                  max={maxPrice}
                  step={1000}
                />
              </div>
            </div>
          </Card>

          <div className="mb-4 text-muted-foreground">
            Showing {filteredComponents.length} of {components.length} components
          </div>

          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredComponents.map((component) => (
                <ComponentCard key={component.id} component={component} />
              ))}
            </div>
          )}

          {!loading && filteredComponents.length === 0 && (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p>No components found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ComponentCard = ({ component }) => {
  const CategoryIcon = categoryIcons[component.category] || Box;

  return (
    <Card className="bg-card border-glass-border p-6 hover:border-lime/30 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary rounded-lg">
            <CategoryIcon className="w-5 h-5 text-lime" />
          </div>
          <div>
            <Badge variant="outline" className="text-xs mb-1">
              {component.category.toUpperCase()}
            </Badge>
            <h3 className="font-bold text-foreground group-hover:text-lime">
              {component.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-1 mb-4 text-sm text-muted-foreground">
        {Object.entries(component.specs || {}).slice(0, 3).map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span>{k}</span>
            <span>{String(v)}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {(component.bestFor || []).map((b, i) => (
          <Badge key={i} variant="secondary">{b}</Badge>
        ))}
      </div>

      <div className="flex justify-between mb-4">
        <Badge className={tierColors[component.performanceTier]}>
          {component.performanceTier}
        </Badge>
        <div className="text-xl font-bold text-lime">
          NPR {component.price.toLocaleString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(component.retailerLinks || []).map((link, i) => (
          <a key={i} href={link.url} target="_blank">
            {link.name}
          </a>
        ))}
      </div>
    </Card>
  );
};

export default Catalog;