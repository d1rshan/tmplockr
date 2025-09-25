import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-background overflow-hidden flex flex-col gap-4 text-sm rounded-md border pb-4",
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
        "relative px-4",
        separator
          ? "border-b min-h-10 flex items-center font-semibold subtle-headings"
          : "font-medium pt-2",
        className
      )}
      {...props}
    ></div>
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn(className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("font-normal", className)}
      {...props}
    />
  );
}

// function CardAction({ className, ...props }: React.ComponentProps<"div">) {
//   return (
//     <div
//       data-slot="card-action"
//       className={cn(
//         "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
//         className
//       )}
//       {...props}
//     />
//   );
// }

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
      className={cn("flex items-center px-4", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  // CardAction,
  CardDescription,
  CardContent,
};
