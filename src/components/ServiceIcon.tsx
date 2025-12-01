import { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface ServiceIconProps {
  iconName: string | null;
  className?: string;
}

export const ServiceIcon = ({ iconName, className = "h-12 w-12" }: ServiceIconProps) => {
  // Default to Battery icon if none specified
  const Icon = iconName && (LucideIcons as any)[iconName] 
    ? (LucideIcons as any)[iconName] as LucideIcon
    : LucideIcons.Battery;

  return (
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
      <Icon className={`${className} text-primary`} strokeWidth={1.5} />
    </div>
  );
};
