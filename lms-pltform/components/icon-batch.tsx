import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      background: {
        default: "bg-primary/20",
        success: "bg-emerald-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      },
    },
    defaultVariants: {
      background: "default",
      size: "default",
    },
  }
);

const iconVariants = cva("", {
  variants: {
    color: {
      default: "text-primary",
      success: "text-emerald-700",
    },
    iconSize: {
      default: "h-8 w-8",
      md: "h-5 w-5",
      sm: "h-4 w-4",
    },
  },
  defaultVariants: {
    color: "default",
    iconSize: "default",
  },
});

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
}

export const IconBadge = ({
  icon: Icon,
  background,
  color,
  size,
  iconSize,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ background, size }))}>
      <Icon className={cn(iconVariants({ color, iconSize }))} />
    </div>
  );
};
