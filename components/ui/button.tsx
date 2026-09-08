import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap",
    "rounded-full text-sm font-semibold tracking-tight",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.97]",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "bg-navy text-navy-foreground shadow-[0_10px_28px_-12px_rgba(11,42,74,0.55)] hover:-translate-y-0.5 hover:bg-navy/95 hover:shadow-[0_16px_36px_-12px_rgba(11,42,74,0.6)]",
        destructive:
          "bg-red-accent text-red-accent-foreground shadow-[0_10px_28px_-12px_rgba(212,42,42,0.45)] hover:-translate-y-0.5 hover:bg-red-accent/95",
        outline:
          "border border-navy/20 bg-transparent text-navy hover:-translate-y-0.5 hover:border-navy/40 hover:bg-navy/[0.04] hover:shadow-[0_12px_28px_-16px_rgba(11,42,74,0.25)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary/80",
        ghost: "hover:bg-navy/5 text-navy",
        link: "rounded-none text-navy underline-offset-4 hover:underline",
        cta: [
          "bg-red-accent text-white",
          "shadow-[0_12px_32px_-10px_rgba(212,42,42,0.55)]",
          "hover:-translate-y-0.5 hover:bg-[#e03333]",
          "hover:shadow-[0_18px_40px_-12px_rgba(212,42,42,0.65)]",
          "before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-1/3",
          "before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent",
          "before:opacity-0 hover:before:animate-[btn-shine_0.7s_ease]",
          "hover:before:opacity-100",
        ].join(" "),
        "cta-outline":
          "border border-white/35 bg-white/5 text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/12",
        amber:
          "bg-amber-tech text-navy shadow-[0_10px_28px_-12px_rgba(232,162,39,0.45)] hover:-translate-y-0.5 hover:brightness-105",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 rounded-full px-4 text-xs",
        lg: "h-12 rounded-full px-8 text-[0.95rem]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
