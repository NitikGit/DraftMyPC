import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const API = "http://127.0.0.1:5000";

export const useSavedBuilds = () => {
  const { user } = useAuth();
  const [builds, setBuilds] = useState([]);

  const fetchBuilds = async () => {
    if (!user?.id) {
      setBuilds([]);
      return;
    }

    const res = await fetch(`${API}/builds?user_id=${user.id}`);
    const data = await res.json();

    if (res.ok) {
      setBuilds(data);
    } else {
      toast.error(data.error || "Failed to load builds");
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, [user?.id]);

  const saveBuild = async (name, components, total) => {
    if (!user?.id) {
      toast.error("Please sign in");
      return;
    }

    const res = await fetch(`${API}/builds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        name,
        components,
        total_price: total,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Build saved to database");
      fetchBuilds();
    } else {
      toast.error(data.error || "Failed to save");
    }
  };

  const deleteBuild = async (id) => {
    if (!user?.id) return;

    const res = await fetch(`${API}/builds/${id}?user_id=${user.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBuilds((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return { builds, saveBuild, deleteBuild };
};