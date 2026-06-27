"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RibbonButtonProps {
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  icon: React.ReactNode;
  label?: string;
  large?: boolean;
  className?: string;
  title?: string;
}

export const RibbonButton = React.memo(
  ({
    onClick,
    active,
    disabled,
    icon,
    label,
    large,
    className,
    title,
  }: RibbonButtonProps) => {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={cn(
          "flex flex-col items-center justify-center rounded transition-all duration-75 select-none outline-none disabled:opacity-30 disabled:cursor-not-allowed",
          large ? "w-16 h-full min-h-[64px] gap-1" : "p-1.5 h-8 w-8",
          active
            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 shadow-inner"
            : "hover:bg-zinc-200/50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300",
          className,
        )}
      >
        <div
          className={cn("flex items-center justify-center", large ? "p-1" : "")}
        >
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
                size: large ? 24 : 16,
              })
            : icon}
        </div>
        {label && (
          <span className="text-[10px] leading-tight font-medium truncate w-full px-0.5 text-center">
            {label}
          </span>
        )}
      </button>
    );
  },
);

RibbonButton.displayName = "RibbonButton";
