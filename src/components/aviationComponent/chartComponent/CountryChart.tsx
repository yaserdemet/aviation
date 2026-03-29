import { TrendingUp, Globe } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useFlightsByCountry } from "@/hooks/useFlightByCountry"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "Hava sahası en yoğun 10 ülke"

const chartConfig = {
  count: {
    label: "Uçuş Sayısı",
    color: "#60a5fa", // Pastel Blue
  },
} satisfies ChartConfig

export function CountryChart() {
  const { data: dataCountry, isLoading, isError } = useFlightsByCountry();

  if (isLoading) {
    return (
      <Card className="flex flex-col h-[400px] items-center justify-center space-y-4 border-none shadow-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400" />
        <p className="text-sm text-muted-foreground font-medium italic">Ülke verileri analiz ediliyor...</p>
      </Card>
    );
  }

  if (isError || !dataCountry) {
    return (
      <Card className="flex flex-col h-[400px] items-center justify-center p-6 text-center border-none shadow-md">
        <p className="text-sm text-destructive font-medium">Veri akışında bir aksaklık oluştu.</p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col shadow-sm border-none bg-card/40 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          <CardTitle className="text-xl font-semibold tracking-tight text-foreground/80">Ülke Bazlı Trafik</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground/70">Hava sahasında en yoğun trafiğe sahip 10 bölge</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart 
            accessibilityLayer 
            data={dataCountry} 
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} stroke="#cbd5e1" />
            <XAxis
              dataKey="country"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              fontSize={11}
              angle={-25}
              textAnchor="end"
              height={60}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontWeight: 400 }}
              tickFormatter={(value) => value.length > 12 ? `${value.slice(0, 10)}...` : value}
            />
            <YAxis 
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickMargin={10}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <ChartTooltip
              cursor={{ fill: '#f1f5f9', opacity: 0.5 }}
              content={<ChartTooltipContent indicator="dot" className="rounded-xl border-none shadow-xl bg-white/90 backdrop-blur-sm" />}
            />
            <Bar 
              dataKey="count" 
              fill="#93c5fd" // Nice pastel blue 
              radius={[6, 6, 0, 0]}
              barSize={32}
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1.5 text-[13px] border-t border-slate-100/50 bg-slate-50/30 pb-4 pt-4">
        <div className="flex gap-2 leading-none font-medium text-blue-500/80">
          Canlı Veri Analizi <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground/60 italic font-light">
          OpenSky Network küresel radar verilerine göre anlık olarak güncellenmektedir.
        </div>
      </CardFooter>
    </Card>
  )
}
