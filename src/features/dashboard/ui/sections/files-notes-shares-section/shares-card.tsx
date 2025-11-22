"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Clock } from "lucide-react";
import { useState } from "react";

// Mock data for now - replace with actual shares data later
const mockShares = [
  {
    id: "1",
    code: "ABC123",
    filesCount: 2,
    notesCount: 1,
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  },
  {
    id: "2", 
    code: "XYZ789",
    filesCount: 0,
    notesCount: 3,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(), // 23 hours
  }
];

export function SharesCard() {
  const [shares] = useState(mockShares);

  const formatTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return "EXPIRED";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}H ${minutes}M`;
    }
    return `${minutes}M`;
  };

  return (
    <Card className="sm:col-span-2 col-span-1">
      <CardHeader>
        <CardTitle>SHARES</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 h-80 overflow-y-scroll scrollbar-hide p-4">
        {shares.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            NO ACTIVE SHARES
          </div>
        ) : (
          shares.map((share, index) => (
            <div
              key={share.id}
              className="group relative bg-card border border-border rounded-lg p-3 hover:bg-accent/50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Share2 className="size-3 text-primary" />
                    <p className="text-sm font-medium font-mono">
                      {share.code}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {share.filesCount} FILES • {share.notesCount} NOTES
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="size-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {formatTimeRemaining(share.expiresAt)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => {
                      navigator.clipboard.writeText(share.code);
                    }}
                  >
                    <Share2 className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
