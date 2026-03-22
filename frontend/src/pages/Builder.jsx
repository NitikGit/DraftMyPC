import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { prebuiltTemplates } from "@/data/prebuiltTemplates";
import { useSavedBuilds } from "@/hooks/useSavedBuilds";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
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
  Save,
  Trash2,
  ExternalLink,
  User,
  Zap,
  FolderOpen
} from "lucide-react";

const categoryIcons = {
  cpu: Cpu,
  gpu: Monitor,
  motherboard: Zap,
  ram: MemoryStick,
  storage: HardDrive,
  psu: Zap,
  case: Box,
  cooler: Fan
};

const categories = [
  { id: "cpu", name: "Processor", required: true },
  { id: "gpu", name: "Graphic Card", required: true },
  { id: "motherboard", name: "Motherboard", required: true },
  { id: "ram", name: "RAM", required: true },
  { id: "storage", name: "Storage", required: true },
  { id: "psu", name: "Power Supply", required: true },
  { id: "case", name: "Case", required: false },
  { id: "cooler", name: "CPU Cooler", required: false },
];

const Builder = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { builds, saveBuild, deleteBuild } = useSavedBuilds();
  const [pcComponents, setPcComponents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("cpu");
  const [selectedComponents, setSelectedComponents] = useState({});
  const [buildName, setBuildName] = useState("");
  // Fetch components from backend 
  useEffect(() => {
  fetch("http://127.0.0.1:5000/components")
    .then(res => res.json())
    .then(data => {
      console.log("components:", data);
      setPcComponents(data);
    })
    .catch(err => console.error(err));
}, []);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);

  // Filter components by selected category
  const categoryComponents = useMemo(() => {
  return pcComponents.filter(c => c.category === selectedCategory);
}, [selectedCategory, pcComponents]);

  // Calculate total cost
  const totalCost = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, comp) => sum + (comp?.price || 0), 0);
  }, [selectedComponents]);

  // Calculate compatibility score
  const compatibilityScore = useMemo(() => {
    const selected = Object.values(selectedComponents).filter(Boolean);
    if (selected.length === 0) return 0;
    return Math.min(100, 70 + selected.length * 5);
  }, [selectedComponents]);

  const handleAddComponent = (component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
    toast.success(`Added ${component.name} to build`);
  };

const handleRemoveComponent = (category) => {
    setSelectedComponents(prev => {
      const next = { ...prev };
      delete next[category];
      return next;
    });
  };

  const handleSaveBuild = async () => {
    if (!user) {
      toast.error("Please sign in to save builds");
      navigate("/signin");
      return;
    }

    if (!buildName.trim()) {
      toast.error("Please enter a build name");
      return;
    }

    const componentsData = Object.fromEntries(
      Object.entries(selectedComponents).map(([key, comp]) => [
        key,
        comp ? { name: comp.name, price: comp.price, id: comp.id } : null
      ])
    );

    await saveBuild(buildName, componentsData, totalCost);
    setBuildName("");
    setSaveDialogOpen(false);
  };

  const handleLoadBuild = (build) => {
    const loaded = {};
    Object.entries(build.components).forEach(([key, value]) => {
      if (value && value.id) {
        const component = pcComponents.find(c => c.id === value.id);
        if (component) loaded[key] = component;
      }
    });
    setSelectedComponents(loaded);
    setLoadDialogOpen(false);
    toast.success(`Loaded build: ${build.name}`);
  };

  const handleLoadTemplate = (template) => {
  const loaded = {};

  Object.entries(template.components).forEach(([key, id]) => {
    const component = pcComponents.find(c => c.id === id);
    if (component) loaded[key] = component;
  });

  setSelectedComponents(loaded);
  setLoadDialogOpen(false);
  toast.success(`Loaded template: ${template.name}`);
  };
  const CategoryIcon = categoryIcons[selectedCategory] || Box;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Cpu className="w-6 h-6 text-lime" />
              <span className="text-xl font-bold text-foreground">PC Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={loadDialogOpen} onOpenChange={setLoadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Load Build
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Load Build</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <h4 className="font-semibold text-foreground">Prebuilt Templates</h4>
                  <div className="grid gap-2 max-h-40 overflow-y-auto">
                    {prebuiltTemplates.map(t => (
                      <Button
                        key={t.id}
                        variant="outline"
                        className="justify-start"
                        onClick={() => handleLoadTemplate(t)}
                      >
                        📦 {t.name} - NPR {t.totalPrice.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                  
                  {user && builds.length > 0 && (
                    <>
                      <h4 className="font-semibold text-foreground">Your Saved Builds</h4>
                      <div className="grid gap-2 max-h-40 overflow-y-auto">
                        {builds.map(b => (
                          <div key={b.id} className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              className="flex-1 justify-start"
                              onClick={() => handleLoadBuild(b)}
                            >
                              💾 {b.name} - NPR {b.total_price.toLocaleString()}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteBuild(b.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  
                  {!user ? (
  <p className="text-sm text-muted-foreground">
    <Button
      variant="link"
      className="p-0 h-auto"
      onClick={() => navigate("/signin")}
    >
      Sign in
    </Button>{" "}
    to access your saved builds
  </p>
) : (
  <p className="text-sm text-muted-foreground">
  </p>
)}

                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save Build
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Your Build</DialogTitle>
                </DialogHeader>
                {user ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="Build name..."
                      value={buildName}
                      onChange={(e) => setBuildName(e.target.value)}
                      className="bg-secondary border-glass-border"
                    />
                    <Button onClick={handleSaveBuild} className="w-full">
                      Save Build
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Sign in to save your builds</p>
                    <Button onClick={() => navigate('/signin')}>Sign In</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {user ? (
              <Button variant="ghost" size="sm" onClick={() => navigate('/profile')}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => navigate('/signin')}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-20 flex">
        <aside className="w-72 border-r border-glass-border bg-card/30 p-6 overflow-y-auto h-[calc(100vh-5rem)] sticky top-20">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            Components
          </h3>
          <div className="space-y-2">
            {categories.map((category) => {
              const Icon = categoryIcons[category.id] || Box;
              const isSelected = selectedComponents[category.id];
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                   selectedCategory === category.id
                      ? "bg-lime/10 border border-lime/40 text-lime shadow-[0_0_40px_hsl(83_100%_36%/0.35)]"
                      : isSelected
                      ? "bg-secondary border border-lime/20 text-foreground"
                      : "bg-secondary/50 border border-glass-border text-foreground hover:border-lime/20 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {isSelected ? (
                    <Badge className="bg-lime/20 text-lime border-lime/30 text-xs">✓</Badge>
                  ) : category.required ? (
                    <Badge variant="outline" className="text-xs border-lime/30 text-lime">
                      Required
                    </Badge>
                  ) : null}
                </button>
              );
            })}
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Select Your {categories.find(c => c.id === selectedCategory)?.name}
              </h1>
              <p className="text-muted-foreground">
                {categoryComponents.length} options available • Compare prices across Nepali retailers
              </p>
            </div>

            <div className="space-y-4">
              {categoryComponents.map((component) => (
                <Card 
                  key={component.id} 
                  className={`bg-card border-glass-border p-6 hover:border-lime/30 transition-all duration-300 group ${
                    selectedComponents[component.category]?.id === component.id ? 'border-lime/50 bg-lime/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-lime transition-colors">
                          {component.name}
                        </h3>
                        <Badge className={`
                          ${component.performanceTier === 'budget' ? 'bg-green-500/20 text-green-400' : ''}
                          ${component.performanceTier === 'mid-range' ? 'bg-blue-500/20 text-blue-400' : ''}
                          ${component.performanceTier === 'high-end' ? 'bg-purple-500/20 text-purple-400' : ''}
                          ${component.performanceTier === 'enthusiast' ? 'bg-orange-500/20 text-orange-400' : ''}
                        `}>
                          {component.performanceTier}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {component.bestFor.map((purpose, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{purpose}</Badge>
                        ))}
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-4">
                        {Object.entries(component.specs).slice(0, 3).map(([k, v]) => (
                          <span key={k} className="mr-3">{k}: {String(v)}</span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                      {component.retailerLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded-full transition-colors"
                        >
                          {link.name}: NPR {link.price.toLocaleString()}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 ml-4">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Best Price</div>
                        <div className="text-2xl font-bold text-lime">
                          NPR {component.price.toLocaleString()}
                        </div>
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
                        <Button variant="default" onClick={() => handleAddComponent(component)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add to Build
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>

        <aside className="w-80 border-l border-glass-border bg-card/30 p-6 overflow-y-auto h-[calc(100vh-5rem)] sticky top-20">
          <h3 className="text-lg font-bold text-foreground mb-4">Your Build</h3>
          
          {Object.keys(selectedComponents).length > 0 && (
            <Card className="bg-secondary/50 border-glass-border p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Compatibility</span>
                <Badge className="bg-lime/20 text-lime border-lime/30">
                  {compatibilityScore}%
                </Badge>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-lime to-lime-glow h-2 rounded-full transition-all duration-500"
                  style={{ width: `${compatibilityScore}%` }}
                />
              </div>
            </Card>
          )}

          <div className="space-y-3 mb-6">
            {Object.entries(selectedComponents).map(([key, comp]) => comp && (
              <div key={key} className="bg-secondary/50 rounded-lg p-3 border border-glass-border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase mb-1">{key}</div>
                    <div className="text-sm font-semibold text-foreground mb-1">{comp.name}</div>
                    <div className="text-lime font-bold">NPR {comp.price.toLocaleString()}</div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoveComponent(key)}
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
            
            {categories.filter(c => !selectedComponents[c.id]).slice(0, 3).map((category) => {
              const Icon = categoryIcons[category.id] || Box;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className="w-full bg-secondary/30 border-2 border-dashed border-glass-border rounded-lg p-4 hover:border-lime/30 transition-all duration-300 group"
                >
                  <Icon className="w-6 h-6 text-muted-foreground mx-auto mb-2 group-hover:text-lime transition-colors" />
                  <div className="text-sm text-muted-foreground group-hover:text-foreground">
                    Add {category.name}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="border-t border-glass-border pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-foreground font-semibold">Total Cost</span>
              <span className="text-2xl font-bold text-lime">
                NPR {totalCost.toLocaleString()}
              </span>
            </div>
              <Button 
              variant="hero"
              className="w-full"
              size="lg"
              onClick={() =>
              navigate("/3d-builder", { state: { selectedComponents } })
              }
              > 
              View 3D Preview
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-glass-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button 
                variant="glass" 
                className="w-full justify-start" 
                size="sm"
                onClick={() => navigate("/compare-builds")}
              >
                <Zap className="w-4 h-4 mr-2" />
                Compare Builds
              </Button>
              <Button 
                variant="glass" 
                className="w-full justify-start" 
                size="sm"
                onClick={() => navigate("/catalog")}
              >
                <Cpu className="w-4 h-4 mr-2" />
                Full Catalog
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Builder;
