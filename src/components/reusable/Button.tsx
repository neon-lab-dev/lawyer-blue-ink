/**
 * Reusable Button component
 */
import React from "react";
import { twMerge } from "tailwind-merge";

const classes = {
  default: "rounded-[4px] font-[600]",
  variants: {
    primary: "bg-primary text-white px-[32px] py-[16px]",
    outline: "border-primary border-[3px] text-primary px-[32px] py-[16px]",
    secondary: "px-[16px] py-[8px] bg-secondary text-primary",
  },
} as const;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof classes.variants;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }) => {
    return (
      <button
        className={twMerge(
          classes.default,
          classes.variants[variant],
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
