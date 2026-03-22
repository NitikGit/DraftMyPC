import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { prebuiltTemplates } from "@/data/prebuiltTemplates";
import { useSavedBuilds } from "@/hooks/useSavedBuilds";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowLeft,
  GitCompare,
  DollarSign,
  Zap,
  TrendingUp,
  CheckCircle2,
  XCircle
} from "lucide-react";

const CompareBuilds = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { builds } = useSavedBuilds();
  const [build1Id, setBuild1Id] = useState("");
  const [build2Id, setBuild2Id] = useState("");

  const allBuilds = [
    ...prebuiltTemplates.map(t => ({ id: `template-${t.id}`, name: t.name, type: 'template', data: t })),
    ...builds.map(b => ({ id: `saved-${b.id}`, name: b.name, type: 'saved', data: b }))
  ];

  const getBuildData = (id) => {
    if (!id) return null;
    
    if (id.startsWith('template-')) {
      const templateId = id.replace('template-', '');
      return prebuiltTemplates.find(t => t.id === templateId);
    } else if (id.startsWith('saved-')) {
      const savedId = id.replace('saved-', '');
      const saved = builds.find(b => b.id === savedId);
      if (saved) {
        return {
          id: saved.id,
          name: saved.name,
          description: saved.description || '',
          purpose: 'Custom Build',
          tier: 'custom',
          totalPrice: saved.total_price,
          components: saved.components,
          performanceRatings: { gaming: 0, productivity: 0, content: 0 }
        };
      }
    }
    return null;
  };

  const build1 = getBuildData(build1Id);
  const build2 = getBuildData(build2Id);

  const priceDiff = build1 && build2 ? build2.totalPrice - build1.totalPrice : 0;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <GitCompare className="w-6 h-6 text-lime" />
              <span className="text-xl font-bold text-foreground">Compare Builds</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Build Comparison</h1>
            <p className="text-muted-foreground">Compare two PC builds side-by-side</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-glass-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Build 1</h3>
              <Select value={build1Id} onValueChange={setBuild1Id}>
                <SelectTrigger className="bg-secondary border-glass-border">
                  <SelectValue placeholder="Select a build..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>Select a build</SelectItem>
                  {prebuiltTemplates.map(t => (
                    <SelectItem key={`template-${t.id}`} value={`template-${t.id}`}>
                      📦 {t.name}
                    </SelectItem>
                  ))}
                  {builds.map(b => (
                    <SelectItem key={`saved-${b.id}`} value={`saved-${b.id}`}>
                      💾 {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Card className="bg-card border-glass-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Build 2</h3>
              <Select value={build2Id} onValueChange={setBuild2Id}>
                <SelectTrigger className="bg-secondary border-glass-border">
                  <SelectValue placeholder="Select a build..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>Select a build</SelectItem>
                  {prebuiltTemplates.map(t => (
                    <SelectItem key={`template-${t.id}`} value={`template-${t.id}`}>
                      📦 {t.name}
                    </SelectItem>
                  ))}
                  {builds.map(b => (
                    <SelectItem key={`saved-${b.id}`} value={`saved-${b.id}`}>
                      💾 {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>
          </div>

          {build1 && build2 ? (
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-lime/10 to-lime/5 border-lime/30 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-lime" />
                    <h3 className="text-lg font-semibold text-foreground">Price Difference</h3>
                  </div>
                  <div className="text-2xl font-bold">
                    {priceDiff === 0 ? (
                      <span className="text-muted-foreground">Same Price</span>
                    ) : priceDiff > 0 ? (
                      <span className="text-destructive">Build 2 is NPR {Math.abs(priceDiff).toLocaleString()} more</span>
                    ) : (
                      <span className="text-lime">Build 2 is NPR {Math.abs(priceDiff).toLocaleString()} less</span>
                    )}
                  </div>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <BuildCard build={build1} label="Build 1" />
                <BuildCard build={build2} label="Build 2" />
              </div>

              <Card className="bg-card border-glass-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-lime" />
                  Component Comparison
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-glass-border">
                        <th className="text-left py-3 text-muted-foreground font-medium">Component</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">{build1.name}</th>
                        <th className="text-left py-3 text-muted-foreground font-medium">{build2.name}</th>
                        <th className="text-center py-3 text-muted-foreground font-medium">Match</th>
                      </tr>
                    </thead>
                    <tbody>
                      {['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'psu', 'case', 'cooler'].map(key => {
                        const comp1 = build1.components[key];
                        const comp2 = build2.components[key];
                        const comp1Name = typeof comp1 === 'object' && comp1 ? comp1.name : comp1 || '-';
                        const comp2Name = typeof comp2 === 'object' && comp2 ? comp2.name : comp2 || '-';
                        const isMatch = comp1Name === comp2Name;

                        return (
                          <tr key={key} className="border-b border-glass-border/50">
                            <td className="py-3 text-foreground font-medium capitalize">{key}</td>
                            <td className="py-3 text-muted-foreground">{String(comp1Name)}</td>
                            <td className="py-3 text-muted-foreground">{String(comp2Name)}</td>
                            <td className="py-3 text-center">
                              {isMatch ? (
                                <CheckCircle2 className="w-5 h-5 text-lime mx-auto" />
                              ) : (
                                <XCircle className="w-5 h-5 text-muted-foreground mx-auto" />
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          ) : (
            <Card className="bg-card border-glass-border p-12 text-center">
              <GitCompare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Select Two Builds to Compare</h3>
              <p className="text-muted-foreground mb-6">
                Choose from prebuilt templates or your saved builds
              </p>
              {!user && (
                <Button variant="outline" onClick={() => navigate('/auth')}>
                  Sign in to access saved builds
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

const BuildCard = ({ build, label }) => {
  return (
    <Card className="bg-card border-glass-border p-6">
      <Badge variant="outline" className="mb-2">{label}</Badge>
      <h3 className="text-xl font-bold text-foreground mb-2">{build.name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{build.description || build.purpose}</p>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total Price:</span>
          <span className="text-lime font-bold">NPR {build.totalPrice.toLocaleString()}</span>
        </div>
        {build.tier && build.tier !== 'custom' && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tier:</span>
            <Badge variant="secondary">{build.tier}</Badge>
          </div>
        )}
      </div>

      {build.performanceRatings && build.performanceRatings.gaming > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-lime" />
            <span className="text-sm text-muted-foreground">Performance</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-lg font-bold text-foreground">{build.performanceRatings.gaming}</div>
              <div className="text-xs text-muted-foreground">Gaming</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-lg font-bold text-foreground">{build.performanceRatings.productivity}</div>
              <div className="text-xs text-muted-foreground">Work</div>
            </div>
            <div className="bg-secondary/50 rounded p-2">
              <div className="text-lg font-bold text-foreground">{build.performanceRatings.content}</div>
              <div className="text-xs text-muted-foreground">Content</div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CompareBuilds;
