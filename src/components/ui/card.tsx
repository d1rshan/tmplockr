import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-background overflow-hidden flex flex-col gap-4 rounded-md border pb-4",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({
  className,
  separator = false,
  ...props
}: React.ComponentProps<"div"> & { separator?: boolean }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header  pt-4 grid auto-rows-min grid-rows-[auto_auto] items-start gap-0 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto]",
        separator
          ? "border-b [.border-b]:pb-3 font-semibold bg-[#ECEEF0] dark:bg-[#1E1E24]"
          : "[.border-b]:pb-0 font-medium",
        className
      )}
      {...props}
    ></div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none text-sm", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm font-normal", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 text-sm h-full", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
