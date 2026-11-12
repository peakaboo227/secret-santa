// Port of Pawker.Icon. Spec: design-system/components/Icon/README.md
import { cx } from "./cx";

const ICONS = {
  back: "M6 2h2v1h-2zM5 3h2v1h-2zM4 4h2v1h-2zM3 5h2v1h-2zM3 6h2v1h-2zM4 7h2v1h-2zM5 8h2v1h-2zM6 9h2v1h-2z",
  forward: "M3 2h2v1h-2zM4 3h2v1h-2zM5 4h2v1h-2zM6 5h2v1h-2zM6 6h2v1h-2zM5 7h2v1h-2zM4 8h2v1h-2zM3 9h2v1h-2z",
  close: "M1 1h2v1h-2zM9 1h2v1h-2zM2 2h2v1h-2zM8 2h2v1h-2zM3 3h2v1h-2zM7 3h2v1h-2zM4 4h4v1h-4zM5 5h2v1h-2zM4 6h4v1h-4zM3 7h2v1h-2zM7 7h2v1h-2zM2 8h2v1h-2zM8 8h2v1h-2zM1 9h2v1h-2zM9 9h2v1h-2z",
  menu: "M1 2h10v1h-10zM1 3h10v1h-10zM1 5h10v1h-10zM1 6h10v1h-10zM1 8h10v1h-10zM1 9h10v1h-10z",
  plus: "M5 1h2v1h-2zM5 2h2v1h-2zM5 3h2v1h-2zM5 4h2v1h-2zM1 5h10v1h-10zM1 6h10v1h-10zM5 7h2v1h-2zM5 8h2v1h-2zM5 9h2v1h-2zM5 10h2v1h-2z",
  check: "M9 2h2v1h-2zM8 3h2v1h-2zM7 4h2v1h-2zM0 5h2v1h-2zM6 5h2v1h-2zM1 6h2v1h-2zM5 6h2v1h-2zM2 7h4v1h-4zM3 8h2v1h-2z",
  gift: "M2 1h2v1h-2zM8 1h2v1h-2zM3 2h2v1h-2zM7 2h2v1h-2zM1 3h10v1h-10zM1 4h1v1h-1zM5 4h2v1h-2zM10 4h1v1h-1zM1 5h10v1h-10zM2 6h1v1h-1zM5 6h2v1h-2zM9 6h1v1h-1zM2 7h1v1h-1zM5 7h2v1h-2zM9 7h1v1h-1zM2 8h1v1h-1zM5 8h2v1h-2zM9 8h1v1h-1zM2 9h1v1h-1zM5 9h2v1h-2zM9 9h1v1h-1zM2 10h8v1h-8z",
  wishlist: "M1 2h2v1h-2zM4 2h7v1h-7zM1 3h2v1h-2zM4 3h7v1h-7zM1 5h2v1h-2zM4 5h7v1h-7zM1 6h2v1h-2zM4 6h7v1h-7zM1 8h2v1h-2zM4 8h7v1h-7zM1 9h2v1h-2zM4 9h7v1h-7z",
  link: "M1 3h4v1h-4zM7 3h4v1h-4zM0 4h2v1h-2zM4 4h1v1h-1zM7 4h1v1h-1zM10 4h2v1h-2zM0 5h1v1h-1zM3 5h6v1h-6zM11 5h1v1h-1zM0 6h2v1h-2zM4 6h1v1h-1zM7 6h1v1h-1zM10 6h2v1h-2zM1 7h4v1h-4zM7 7h4v1h-4z",
  copy: "M4 1h7v1h-7zM4 2h1v1h-1zM10 2h1v1h-1zM1 3h7v1h-7zM10 3h1v1h-1zM1 4h1v1h-1zM7 4h1v1h-1zM10 4h1v1h-1zM1 5h1v1h-1zM7 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM7 6h4v1h-4zM1 7h1v1h-1zM7 7h1v1h-1zM1 8h1v1h-1zM7 8h1v1h-1zM1 9h7v1h-7z",
  key: "M1 3h4v1h-4zM0 4h1v1h-1zM5 4h1v1h-1zM0 5h1v1h-1zM2 5h2v1h-2zM5 5h7v1h-7zM0 6h1v1h-1zM2 6h2v1h-2zM5 6h2v1h-2zM8 6h1v1h-1zM10 6h1v1h-1zM0 7h1v1h-1zM5 7h1v1h-1zM8 7h1v1h-1zM10 7h1v1h-1zM1 8h4v1h-4z",
  info: "M3 1h6v1h-6zM2 2h1v1h-1zM9 2h1v1h-1zM1 3h1v1h-1zM5 3h2v1h-2zM10 3h1v1h-1zM1 4h1v1h-1zM10 4h1v1h-1zM1 5h1v1h-1zM5 5h2v1h-2zM10 5h1v1h-1zM1 6h1v1h-1zM5 6h2v1h-2zM10 6h1v1h-1zM1 7h1v1h-1zM5 7h2v1h-2zM10 7h1v1h-1zM2 8h1v1h-1zM9 8h1v1h-1zM3 9h6v1h-6z",
  manage: "M1 2h5v1h-5zM7 2h4v1h-4zM1 3h5v1h-5zM7 3h4v1h-4zM1 5h2v1h-2zM4 5h7v1h-7zM1 6h2v1h-2zM4 6h7v1h-7zM1 8h7v1h-7zM9 8h2v1h-2zM1 9h7v1h-7zM9 9h2v1h-2z",
  lock: "M4 1h4v1h-4zM3 2h1v1h-1zM8 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM2 4h8v1h-8zM2 5h8v1h-8zM2 6h3v1h-3zM7 6h3v1h-3zM2 7h3v1h-3zM7 7h3v1h-3zM2 8h8v1h-8zM2 9h8v1h-8z",
  calendar: "M3 1h1v1h-1zM8 1h1v1h-1zM1 2h10v1h-10zM1 3h1v1h-1zM10 3h1v1h-1zM1 4h10v1h-10zM1 5h1v1h-1zM10 5h1v1h-1zM1 6h1v1h-1zM3 6h2v1h-2zM7 6h2v1h-2zM10 6h1v1h-1zM1 7h1v1h-1zM10 7h1v1h-1zM1 8h1v1h-1zM3 8h2v1h-2zM7 8h2v1h-2zM10 8h1v1h-1zM1 9h1v1h-1zM10 9h1v1h-1zM1 10h10v1h-10z",
  bell: "M5 1h2v1h-2zM4 2h1v1h-1zM7 2h1v1h-1zM3 3h1v1h-1zM8 3h1v1h-1zM3 4h1v1h-1zM8 4h1v1h-1zM3 5h1v1h-1zM8 5h1v1h-1zM2 6h1v1h-1zM9 6h1v1h-1zM1 7h10v1h-10zM5 9h2v1h-2z",
} as const;

/** The 16 ui icons, drawn on a 12x12 pixel grid. */
export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  /** 12 next to text and inside buttons (1px pixels), 24 for tabs, menu and sheets (2px pixels). Default 12. */
  size?: 12 | 24;
  /** Only for an icon-only control (menu, close). Without it the icon is decorative and hidden from screen readers. */
  label?: string;
  className?: string;
}

export function Icon({ name, size = 12, label, className }: IconProps) {
  const d = ICONS[name];
  if (!d) {
    console.warn(`Icon: unknown icon ${name}`);
    return null;
  }
  const px = size === 24 ? 24 : 12;
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };
  return (
    <svg
      className={cx("pk-icon", className)}
      width={px}
      height={px}
      viewBox="0 0 12 12"
      shapeRendering="crispEdges"
      fill="currentColor"
      focusable="false"
      {...a11y}
    >
      <path d={d} />
    </svg>
  );
}
