import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate, useLocation } from "react-router-dom"
import PCViewer3D from "@/components/PCViewer3D"
import {
  ArrowLeft,
  Box,
  RotateCw,
  Lightbulb,
  Download
} from "lucide-react"

const ThreeDBuilder = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const rawParts = location.state?.selectedComponents || {}

  const selectedParts = {
    cpu: !!rawParts.cpu,
    gpu: !!rawParts.gpu,
    ram: !!rawParts.ram,
    motherboard: !!rawParts.motherboard,
    psu: !!rawParts.psu,
    fans: !!rawParts.fans
  }

  const [rgbEnabled, setRgbEnabled] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)

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
              <span className="text-xl font-bold text-foreground">
                3D PC Viewer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2"/>
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
              selectedParts={selectedParts}
              rgbEnabled={rgbEnabled}
              autoRotate={autoRotate}
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

          <h2 className="text-2xl font-bold text-foreground mb-6">
            Customize
          </h2>

          <div className="mb-8">

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-lime"/>
                <h3 className="text-lg font-semibold text-foreground">
                  RGB Lighting
                </h3>
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
                <p className="text-sm text-muted-foreground mb-3">
                  RGB Effects Active
                </p>

                <div className="h-2 rounded-full bg-gradient-to-r from-lime via-lime-glow to-lime animate-pulse"/>
              </Card>
            )}

          </div>

          {/* AUTO ROTATE */}
          <div className="mb-8">

            <div className="flex items-center justify-between mb-4">

              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-lime"/>
                <h3 className="text-lg font-semibold text-foreground">
                  Auto Rotate
                </h3>
              </div>

              <Button
                variant={autoRotate ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoRotate(!autoRotate)}
              >
                {autoRotate ? "On" : "Off"}
              </Button>

            </div>

            <p className="text-sm text-muted-foreground">
              Slowly rotate the model automatically
            </p>

          </div>

          {/* CONTROLS */}
          <Card className="bg-secondary/50 border-glass-border p-4">

            <h3 className="text-sm font-semibold text-foreground mb-3">
              Controls
            </h3>

            <div className="space-y-2 text-sm text-muted-foreground">
              <p>🖱️ Drag to rotate</p>
              <p>🔍 Scroll to zoom</p>
              <p>📱 Pinch to zoom on mobile</p>
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
  )
}

export default ThreeDBuilder