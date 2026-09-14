import type { ReactNode } from "react";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div className={`glass-panel p-8 md:p-10 ${hover ? "glass-panel-hover" : ""} ${className}`}>
      {children}
    </div>
  );
}
