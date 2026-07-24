import React from "react";
import { Link } from "react-router-dom";

const variantes = {
  primary: "bg-coral text-white hover:bg-coral-dark",
  secondary: "bg-forest text-white hover:bg-forest-dark",
  outline: "border-2 border-forest text-forest hover:bg-forest hover:text-white",
  ghost: "bg-white text-forest hover:bg-marigold-light/40"
};

export default function Button({
  to,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-sm md:text-base transition-all duration-200 hover:scale-[1.03] active:scale-100 ${variantes[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
