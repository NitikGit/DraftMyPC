import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { prebuiltTemplates } from "@/data/prebuiltTemplates";
import { Cpu, Zap, Shield, TrendingDown, Wrench, Target, User, LogOut, Box } from "lucide-react";


const Index = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const features = [
    {
      icon: Cpu,
      title: "Smart Compatibility",
      description: "AI-powered compatibility checking ensures every part works together perfectly",
    },
    {
      icon: TrendingDown,
      title: "Real-Time Prices",
      description: "Compare prices across Daraz, ITTI, Ocean, and Neo stores instantly",
    },
    {
      icon: Wrench,
      title: "Save Your Builds",
      description: "Sign in to save and manage your custom PC builds across sessions",
    },
  ];

  const purposes = [
    {
      icon: Target,
      title: "Gaming",
      description: "High FPS, smooth gameplay",
      gradient: "from-lime/20 to-lime/5",
    },
    {
      icon: Zap,
      title: "Content Creation",
      description: "Video editing, 3D rendering",
      gradient: "from-lime/20 to-lime/5",
    },
    {
      icon: Shield,
      title: "Professional Work",
      description: "Productivity, multitasking",
      gradient: "from-lime/20 to-lime/5",
    },
  ];

const handleSignOut = () => {
  localStorage.clear();
  navigate("/signin");
};

  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-8 h-8 text-lime" />
            <span className="text-2xl font-bold text-foreground">PC Builder NP</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/builder")}>
              Builder
            </Button>
            <Button variant="ghost" onClick={() => navigate("/catalog")}>
              Catalog
            </Button>
            <Button variant="ghost" onClick={() => navigate("/compare-builds")}>
              Compare
            </Button>
            <Button variant="ghost" onClick={() => navigate("/price-tracker")}>
              Prices
            </Button>
            <Button variant="ghost" onClick={() => navigate("/3d-builder")}>
              3D View
            </Button>
            
            {role ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  {user.email?.split('@')[0]}
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={() => navigate("/signin")}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-lime/10 border border-lime/30 rounded-full">
            <span className="text-lime text-sm font-semibold">Nepal's First Smart PC Configurator</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Build Your Perfect PC
            <br />
            <span className="text-lime">Without The Hassle</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Compare prices, check compatibility, and get AI-powered recommendations tailored to Nepal's market. 
            From first-time builders to seasoned upgraders.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button variant="hero" onClick={() => navigate("/builder")}>
              Start Building Now
            </Button>
            <Button variant="glass" size="lg" onClick={() => navigate("/catalog")}>
              Browse Catalog
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-glass-border p-8 shadow-2xl shadow-lime/10 hover:shadow-lime/20 transition-all duration-500">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["RTX 4070 Ti", "i7-14700K", "32GB DDR5", "1TB NVMe"].map((spec, i) => (
                  <div key={i} className="bg-secondary/50 rounded-lg p-4 border border-glass-border hover:border-lime/30 transition-all duration-300">
                    <div className="text-lime text-2xl font-bold mb-1">✓</div>
                    <div className="text-foreground font-semibold">{spec}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Total Build Cost</span>
                <span className="text-3xl font-bold text-lime">NPR 2,45,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            Ready-Made Builds
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Choose from our curated prebuilt templates for common use cases
          </p>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {prebuiltTemplates.slice(0, 7).map((template) => (
              <Card 
                key={template.id} 
                className="bg-card border-glass-border p-6 hover:border-lime/30 transition-all duration-300 cursor-pointer group"
                onClick={() => navigate("/builder")}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Box className="w-5 h-5 text-lime" />
                  <Badge variant="secondary" className="text-xs">{template.category}</Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-lime transition-colors">
                  {template.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <div className="text-xl font-bold text-lime">
                  NPR {template.totalPrice.toLocaleString()}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            Why Build With Us?
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Building a PC shouldn't take weeks of research. We've simplified the entire process.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-glass-border p-8 hover:border-lime/30 transition-all duration-300 hover:shadow-lg hover:shadow-lime/10 group">
                <feature.icon className="w-12 h-12 text-lime mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-foreground mb-4">
            Start With A Purpose
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Tell us what you need, and we'll guide you to the perfect build
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {purposes.map((purpose, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${purpose.gradient} border-glass-border p-8 cursor-pointer hover:border-lime/50 transition-all duration-300 hover:scale-105 group`}
                onClick={() => navigate("/builder")}
              >
                <purpose.icon className="w-10 h-10 text-lime mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-bold text-foreground mb-2">{purpose.title}</h3>
                <p className="text-muted-foreground">{purpose.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-card to-secondary border-lime/30 p-12 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Ready to Build Your Dream PC?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of Nepali PC builders who've simplified their build process
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="hero" onClick={() => navigate("/builder")}>
                Get Started Free
              </Button>
              {!user && (
                <Button variant="outline" onClick={() => navigate("/signup")}>
                  Create Account
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-glass-border py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 PC Builder NP. Built for Nepali PC enthusiasts.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
