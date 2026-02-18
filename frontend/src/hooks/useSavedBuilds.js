import { useState } from "react";

export const useSavedBuilds = () => {
  const [builds, setBuilds] = useState([]);

  const saveBuild = async (name, components, total) => {
    const newBuild = {
      id: Date.now(),
      name,
      components,
      total_price: total
    };
    setBuilds(prev => [...prev, newBuild]);
  };

  const deleteBuild = (id) => {
    setBuilds(prev => prev.filter(b => b.id !== id));
  };

  return { builds, saveBuild, deleteBuild };
};
