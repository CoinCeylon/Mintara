import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group",
  {
    variants: {
      variant: {
        default: "text-white shadow-default-button-shadow",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        nav: "text-white relative overflow-hidden",
      },
      size: {
        default: "h-[53px] w-full rounded-[4px] px-[8px] py-[16px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        nav: "h-[40px] w-full px-[16px] py-[8px] rounded-[4px]",
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
      >
        {variant === "default" ? (
          <>
            <span className="absolute inset-0 bg-default-button-start transition-all duration-300 ease-in-out group-hover:bg-default-button-hover-start"></span>
            <span className="absolute inset-0 bg-default-button-gradient opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></span>
            <span className="absolute inset-0 bg-default-button-hover-gradient opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></span>
            <span className="relative z-10 flex flex-row gap-2">
              {props.children}
            </span>
          </>
        ) : (
          props.children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
