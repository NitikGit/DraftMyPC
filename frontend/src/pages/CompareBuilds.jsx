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
   
  );
};

export default CompareBuilds;
