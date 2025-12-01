import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps {
  name: string | null;
  className?: string;
  fallback?: keyof typeof LucideIcons;
}

export const DynamicIcon = ({ name, className = "h-8 w-8", fallback = "Zap" }: DynamicIconProps) => {
  const iconName = name || fallback;
  const Icon = ((LucideIcons as any)[iconName] || LucideIcons.Zap) as LucideIcon;

  return <Icon className={className} />;
};
