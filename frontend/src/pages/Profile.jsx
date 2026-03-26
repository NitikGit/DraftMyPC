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

  useEffect(() => {
    if (!user) navigate("/signin");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            Your <span className="text-[#76b900]">Profile</span>
          </h1>

          <Button
            variant="destructive"
            onClick={logout}
            className="bg-red-500 hover:bg-red-600"
          >
            Logout
          </Button>
        </div>

        <Card className="bg-[#111] border border-[#222] p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-[#76b900]">
            Account Details
          </h2>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-400">Username:</span>{" "}
              <span className="font-medium">{user.username}</span>
            </p>
            <p>
              <span className="text-gray-400">Email:</span>{" "}
              <span className="font-medium">{user.email}</span>
            </p>
          </div>
        </Card>

        <Card className="bg-[#111] border border-[#222] p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#76b900]">
              Saved Builds
            </h2>

            <Button
              size="sm"
              onClick={() => navigate("/builder")}
              className="bg-[#76b900] text-black hover:bg-[#8ad000]"
            >
              + New Build
            </Button>
          </div>

          {builds.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 mb-2">
                You haven’t saved any builds yet.
              </p>
              <Button
                onClick={() => navigate("/builder")}
                className="bg-[#76b900] text-black hover:bg-[#8ad000]"
              >
                Start Building 
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {builds.map((build) => (
                <div
                  key={build.id}
                  className="bg-[#0f0f0f] border border-[#222] rounded-lg p-4 hover:border-[#76b900] transition"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{build.name}</p>
                      <p className="text-sm text-gray-400">
                        NPR {build.total_price}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#333] hover:border-[#76b900]"
                      onClick={() => navigate(`/builder?load=${build.id}`)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={() => navigate("/builder")}
            className="bg-[#76b900] text-black hover:bg-[#8ad000]"
          >
            Go To Builder
          </Button>
        </div>

      </div>
    </div>
  );
}