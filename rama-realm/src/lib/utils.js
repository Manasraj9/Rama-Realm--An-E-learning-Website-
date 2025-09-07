import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// cn = className utility (shadcn standard)
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
