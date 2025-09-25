import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  pin,
  className,
  type,
  ...props
}: React.ComponentProps<"input"> & { pin?: boolean }) {
  return (
    <input
      type={type}
      data-slot="input"
      maxLength={pin ? 4 : undefined}
      inputMode={pin ? "numeric" : undefined}
      className={cn(
        "file:text-foreground  uppercase text-center placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-background border h-9 w-full min-w-0 rounded-md   px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 text-sm",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        pin && "tracking-[4px]",
        !pin && "pr-5",
        className
      )}
      {...props}
    />
  );
}

export { Input };
