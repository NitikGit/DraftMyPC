import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import PCViewer3D from "@/components/PCViewer3D";
import { 
  ArrowLeft,
  Box,
  RotateCw,
  Palette,
  Lightbulb,
  Maximize2,
  Download
} from "lucide-react";

const ThreeDBuilder = () => {
  const navigate = useNavigate();
  const [caseColor, setCaseColor] = useState("#0A0A0A");
  const [rgbEnabled, setRgbEnabled] = useState(true);
  const [glassPanel, setGlassPanel] = useState(true);

  const colors = [
    { id: "black", name: "Black", hex: "#0A0A0A" },
    { id: "white", name: "White", hex: "#EDEDED" },
    { id: "gray", name: "Gray", hex: "#666666" },
    { id: "red", name: "Red", hex: "#DC2626" },
    { id: "blue", name: "Blue", hex: "#2563EB" },
  ];

  const [selectedParts] = useState({
case:true,
motherboard:true,
gpu:true,
ram:true,
cooler:true,
fans:true,
psu:true
})


  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/builder")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Box className="w-6 h-6 text-lime" />
              <span className="text-xl font-bold text-foreground">3D PC Viewer</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm" onClick={() => navigate("/builder")}>
              Back to Builder
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-20 flex h-screen">
        <main className="flex-1 p-6">
          <Card className="bg-card border-glass-border h-full relative overflow-hidden">
            <PCViewer3D
rgbEnabled={rgbEnabled}
glassPanel={glassPanel}
selectedParts={selectedParts}
/>
            
            <div className="absolute bottom-6 left-6 flex gap-2">
              <Badge className="bg-lime/20 text-lime border-lime/30">
                Drag to Rotate
              </Badge>
              <Badge variant="outline" className="border-glass-border">
                Scroll to Zoom
              </Badge>
            </div>
          </Card>
        </main>

        <aside className="w-80 border-l border-glass-border bg-card/30 p-6 overflow-y-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Customize</h2>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Palette className="w-5 h-5 text-lime" />
              <h3 className="text-lg font-semibold text-foreground">Case Color</h3>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setCaseColor(color.hex)}
                  className={`w-full aspect-square rounded-lg border-2 transition-all duration-300 ${
                    caseColor === color.hex 
                      ? 'border-lime scale-110' 
                      : 'border-glass-border hover:border-lime/50'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-lime" />
                <h3 className="text-lg font-semibold text-foreground">RGB Lighting</h3>
              </div>
              <Button 
                variant={rgbEnabled ? "default" : "outline"}
                size="sm"
                onClick={() => setRgbEnabled(!rgbEnabled)}
              >
                {rgbEnabled ? "On" : "Off"}
              </Button>
            </div>
            {rgbEnabled && (
              <Card className="bg-secondary/50 border-glass-border p-4">
                <p className="text-sm text-muted-foreground mb-3">RGB Effects Active</p>
                <div className="h-2 rounded-full bg-gradient-to-r from-lime via-lime-glow to-lime animate-pulse" />
              </Card>
            )}
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-lime" />
                <h3 className="text-lg font-semibold text-foreground">Glass Panel</h3>
              </div>
              <Button 
                variant={glassPanel ? "default" : "outline"}
                size="sm"
                onClick={() => setGlassPanel(!glassPanel)}
              >
                {glassPanel ? "Show" : "Hide"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Tempered glass side panel shows internal components
            </p>
          </div>

          <Card className="bg-secondary/50 border-glass-border p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Preview Settings</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Color:</span>
                <span className="text-foreground font-medium">
                  {colors.find(c => c.hex === caseColor)?.name || 'Custom'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">RGB:</span>
                <span className="text-foreground font-medium">{rgbEnabled ? "Enabled" : "Disabled"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Glass:</span>
                <span className="text-foreground font-medium">{glassPanel ? "Visible" : "Hidden"}</span>
              </div>
            </div>
          </Card>

          <Button 
            variant="hero" 
            className="w-full mt-6"
            onClick={() => navigate("/builder")}
          >
            Back to Builder
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default ThreeDBuilder;
