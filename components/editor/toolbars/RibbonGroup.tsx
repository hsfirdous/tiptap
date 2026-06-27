"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RibbonGroupProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const RibbonGroup = React.memo(
  ({ label, children, className }: RibbonGroupProps) => (
    <div
      className={cn(
        "flex flex-col h-full border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 px-2 group/ribbon relative",
        className,
      )}
    >
      <div className="flex-1 flex items-center gap-1">{children}</div>
      <div className="text-[10px] text-center text-zinc-400 dark:text-zinc-500 py-0.5 group-hover/ribbon:text-zinc-600 dark:group-hover/ribbon:text-zinc-300 transition-colors font-medium">
        {label}
      </div>
    </div>
  ),
);

RibbonGroup.displayName = "RibbonGroup";
