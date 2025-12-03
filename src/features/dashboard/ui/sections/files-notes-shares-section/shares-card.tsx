"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Copy } from "lucide-react";
import { Code } from "@/lib/db/schema";
import { toast } from "sonner";


export function SharesCard({ shares }: { shares: Code[] }) {
  return (
    <Card className="sm:col-span-2 col-span-1">
      <CardHeader>
        <CardTitle>SHARES</CardTitle>
      </CardHeader>
      <CardContent className="uppercase flex flex-col gap-3 h-80 overflow-y-scroll scrollbar-hide">
        {shares.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            NO ACTIVE SHARES
          </div>
        ) : (
          shares.map((share, index) => (
            <ShareItem key={`share-${index}`} share={share} index={index + 1} />
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ShareItem({ share, index }: { share: Code; index: number }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(share.code.toString());
    toast.success("CODE COPIED TO CLIPBOARD");
  };

  return (
    <div className="group relative border border-border rounded-lg p-3 hover:bg-accent/50 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
          {index.toString().padStart(2, '0')}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            {share.code.toString().split('').map((digit, i) => (
              <div
                key={i}
                className="bg-muted   rounded-md w-10 h-10 flex items-center justify-center"
              >
                <span className=" text-foreground">
                  {digit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopy}
          >
            <Copy className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
