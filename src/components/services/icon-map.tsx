import {
  Shield,
  Video,
  Users,
  Building,
  Lock,
  Wifi,
  Camera,
  Calendar,
  MapPin,
  Headset,
  CheckCircle2,
  LucideIcon
} from 'lucide-react';

export const IconMap: Record<string, LucideIcon> = {
  Shield,
  Video,
  Users,
  Building,
  Lock,
  Wifi,
  Camera,
  Calendar,
  MapPin,
  Headset,
  CheckCircle2
};

export function getIcon(name: string): LucideIcon {
  return IconMap[name] || Shield;
}
