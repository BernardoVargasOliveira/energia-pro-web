import { Battery, HardHat, Zap, Headphones, Factory, Store, Hospital, PartyPopper, Building2, Server, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Battery,
  HardHat,
  Zap,
  Headphones,
  Factory,
  Store,
  Hospital,
  PartyPopper,
  Building2,
  Server
};

interface IconMapperProps {
  iconName: string | null;
  className?: string;
}

export const IconMapper = ({ iconName, className = "h-12 w-12" }: IconMapperProps) => {
  const Icon = iconName ? iconMap[iconName] || Zap : Zap;
  return <Icon className={className} />;
};
