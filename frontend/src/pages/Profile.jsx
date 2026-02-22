import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSavedBuilds } from "@/hooks/useSavedBuilds";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Profile() {
  const { user, logout } = useAuth();
  const { builds } = useSavedBuilds();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-6">Profile</h1>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </Card>

        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Saved Builds</h2>

          {builds.length === 0 ? (
            <p className="text-muted-foreground">No saved builds yet.</p>
          ) : (
            <div className="space-y-3">
              {builds.map((build) => (
                <div
                  key={build.id}
                  className="border p-3 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{build.name}</p>
                    <p className="text-sm text-muted-foreground">
                      NPR {build.total_price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="flex gap-4">
          <Button onClick={() => navigate("/builder")}>
            Go To Builder
          </Button>

          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>

      </div>
    </div>
  );
}