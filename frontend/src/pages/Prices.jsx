import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function Prices() {
  const [components, setComponents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const calculateTrend = (history) => {
    if (!history || history.length < 2) return null;

    const prices = history.map(h => Number(h.price));
    const latest = prices[prices.length - 1];
    const previous = prices[prices.length - 2];
    const change = ((latest - previous) / previous) * 100;

    return {
      latest,
      lowest: Math.min(...prices),
      highest: Math.max(...prices),
      change: Number(change.toFixed(1)),
      prices
    };
  };

  const isBestBuy = (trend) => {
    if (!trend) return false;
    return trend.latest <= trend.lowest * 1.05;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:5000/components");
      const data = await res.json();

      const withHistory = await Promise.all(
        data.map(async (comp) => {
          try {
            const histRes = await fetch(
              `http://127.0.0.1:5000/price-history/${comp.id}`
            );
            const history = await histRes.json();

            return {
              ...comp,
              history,
              trend: calculateTrend(history)
            };
          } catch {
            return { ...comp, history: [], trend: null };
          }
        })
      );

      withHistory.sort((a, b) => a.price - b.price);
      setComponents(withHistory);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const filtered = components.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.brand.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-background px-6 pt-24 pb-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">PC Price Tracker</h1>
        <p className="text-muted-foreground">
          Monitor real-time component prices in Nepal
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <Input
          placeholder="Search components..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {paginated.map((c) => (
          <Card key={c.id} className="p-6 hover:border-lime/30 transition">
            <div className="flex justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{c.name}</h2>

                  <Badge variant="outline">{c.category}</Badge>

                  {isBestBuy(c.trend) && (
                    <Badge className="bg-lime/20 text-lime border-lime/30">
                      BEST BUY
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {c.brand} • {c.model}
                </p>

                {c.trend && (
                  <div className="bg-secondary/40 rounded-lg p-4 border mb-4">
                    <div className="flex items-end gap-2 h-20">
                      {c.trend.prices.map((p, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t ${
                            c.trend.change < 0
                              ? "bg-lime/40"
                              : "bg-red-400/40"
                          }`}
                          style={{
                            height: `${(p / c.trend.highest) * 100}%`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {c.trend && (
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Lowest</p>
                      <p className="text-lime font-bold">
                        NPR {c.trend.lowest.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Highest</p>
                      <p className="text-red-400 font-bold">
                        NPR {c.trend.highest.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-muted-foreground">Change</p>
                      <p
                        className={`font-bold ${
                          c.trend.change < 0
                            ? "text-lime"
                            : "text-red-400"
                        }`}
                      >
                        {c.trend.change < 0 ? "↓" : "↑"} {c.trend.change}%
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right min-w-[140px]">
                <p className="text-sm text-muted-foreground mb-1">
                  Current Price
                </p>

                <p className="text-3xl font-bold text-lime mb-2">
                  NPR {Number(c.price).toLocaleString()}
                </p>

                {c.trend && (
                  <div
                    className={`flex justify-end items-center gap-1 text-sm font-semibold ${
                      c.trend.change < 0
                        ? "text-lime"
                        : "text-red-400"
                    }`}
                  >
                    {c.trend.change < 0 ? (
                      <TrendingDown size={16} />
                    ) : (
                      <TrendingUp size={16} />
                    )}
                    {c.trend.change}%
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 rounded-lg border ${
                currentPage === index + 1
                  ? "bg-lime text-black border-lime"
                  : "bg-zinc-900 border-zinc-700 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}