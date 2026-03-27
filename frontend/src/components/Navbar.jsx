import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Cpu, User, LogOut } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-glass-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <Cpu className="w-8 h-8 text-lime" />
          <span className="text-2xl font-bold text-foreground">
            PC Builder NP
          </span>
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

          <Button variant="ghost" onClick={() => navigate("/3d-builder")}>
            3D View
          </Button>

          {user ? (
            <div className="flex items-center gap-2">

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/profile")}
              >
                <User className="w-4 h-4 mr-2" />
                {user.username || user.email?.split("@")[0]}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/signin");
                }}
              >
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
  );
}