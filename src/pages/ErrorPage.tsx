// components/ErrorPage.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TriangleAlert, RefreshCw, Home } from "lucide-react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage({ error: propError, reset }: { error?: any, reset?: () => void }) {
  const routerError = useRouteError();
  const error = propError || routerError;

  let errorMessage = "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.";
  let errorDetail = "";

  if (isRouteErrorResponse(error)) {
    errorMessage = `${error.status} ${error.statusText}`;
    errorDetail = error.data || "";
  } else if (error instanceof Error) {
    errorDetail = error.message;
  } else if (typeof error === "string") {
    errorDetail = error;
  } else if (error && typeof error === "object" && "message" in error) {
    errorDetail = (error as any).message;
  }

  const handleReset = () => {
    if (reset) {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-10 pb-8 flex flex-col items-center text-center gap-6">

          {/* İkon */}
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <TriangleAlert className="w-10 h-10 text-destructive" />
          </div>

          {/* Başlık */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Bir şeyler ters gitti</h1>
            <p className="text-muted-foreground text-sm">
              {errorMessage}
            </p>
          </div>

          {/* Hata detayı (sadece dev'de veya varsa göster) */}
          {(import.meta.env.DEV || errorDetail) && errorDetail && (
            <div className="w-full bg-muted rounded-lg p-3 text-left">
              <p className="text-xs font-mono text-muted-foreground break-all">
                {errorDetail}
              </p>
            </div>
          )}

          {/* Butonlar */}
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <Home className="w-4 h-4 mr-2" />
              Ana Sayfa
            </Button>
            <Button
              className="flex-1"
              onClick={handleReset}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
