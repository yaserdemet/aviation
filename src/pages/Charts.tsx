import { TrendingUp, Plane, PlaneLanding } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useFlight } from "@/hooks/useFlight";
import { CountryChart } from "@/components/aviationComponent/chartComponent/CountryChart";

export const description = "Hava trafiği genel durum analizi";

const chartConfig = {
  visitors: {
    label: "Uçuşlar",
  },
  air: {
    label: "Havada",
    color: "#93c5fd", // Pastel Blue
  },
  ground: {
    label: "Yerde",
    color: "#b9fbc0", // Pastel Green
  },
} satisfies ChartConfig;

export default function Charts() {
  const { data, isLoading, isError, error } = useFlight();

  if (isLoading) {
    return (
        <div className="p-8 flex items-center justify-center min-h-100">
            <div className="flex flex-col items-center gap-4 text-muted-foreground/60 animate-pulse">
                <Plane className="w-12 h-12 rotate-45 opacity-20" />
                <p className="font-semibold text-sm tracking-wide">TABLO ANALİZ EDİLİYOR...</p>
            </div>
        </div>
    )
  }

  if (isError) {
    return (
        <div className="p-8 text-center bg-red-50/50 text-red-500 rounded-3xl border border-red-100/50 flex flex-col items-center gap-3 m-8">
          <CardTitle className="font-semibold">Sistem Bağlantısı Kesildi</CardTitle>
          <p className="text-xs opacity-70 italic">{error?.message}</p>
        </div>
    )
  }

  const states = data?.states || [];
  const onTheGround = states.filter((item: any) => item[8] === true).length;
  const onTheAir = states.length - onTheGround;

  const chartData = [
    { browser: "Havada", visitors: onTheAir, fill: "#93c5fd" },
    { browser: "Yerde", visitors: onTheGround, fill: "#b9fbc0" },
  ];
 
  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-400 mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground/90 uppercase">Radar İstatistikleri</h1>
        <p className="text-muted-foreground/70 text-sm italic font-light">Küresel uçuş trafiği ve bölgesel yoğunluk analizi raporu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col shadow-sm border-none bg-card/40 backdrop-blur-md overflow-hidden">
          <CardHeader className="items-center pb-0 border-b border-slate-100/50 bg-slate-50/30 mb-6">
            <CardTitle className="text-xl font-semibold tracking-tight text-foreground/80">Uçuş Konumu Oranı</CardTitle>
            <CardDescription className="pb-4 text-xs">Anlık toplam {states.length.toLocaleString()} uçuşun dağılımı</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-75"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel className="rounded-xl border-none shadow-xl bg-white/90" />}
                />
                <Pie
                  data={chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={8}
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="opacity-90 hover:opacity-100 transition-opacity" />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-4 text-sm bg-slate-50/30 pb-6 pt-4 border-t border-slate-100/50">
            <div className="flex justify-center gap-8 w-full">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#93c5fd]" />
                    <span className="font-medium text-muted-foreground">Havada: {onTheAir.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#b9fbc0]" />
                    <span className="font-medium text-muted-foreground">Yerde: {onTheGround.toLocaleString()}</span>
                </div>
            </div>
            <div className="text-[12px] text-muted-foreground/60 text-center italic font-light">
              Küresel radar sistemlerinden gelen anlık konum verilerine dayalı analiz.
            </div>
          </CardFooter>
        </Card>

        <CountryChart />
      </div>
    </div>
  );
}
