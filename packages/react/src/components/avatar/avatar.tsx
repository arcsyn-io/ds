import { forwardRef, useEffect, useState, type HTMLAttributes } from "react";
import { cx } from "../../utilities/cx.js";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  id: string;
  name?: string;
  image?: string;
  size?: AvatarSize;
}

function initialsFromName(name?: string) {
  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase();
  return `${parts[0][0]}${parts.at(-1)?.[0]}`.toLocaleUpperCase();
}

function colorFromId(id: string) {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) | 0;
  return `hsl(${Math.abs(hash) % 360} 32% 28%)`;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { id, name, image, size = "md", className, style, ...props },
  ref,
) {
  const [imageVisible, setImageVisible] = useState(Boolean(image));
  useEffect(() => setImageVisible(Boolean(image)), [image]);
  const label = name ? `Avatar de ${name}` : "Avatar sem nome";

  return (
    <span
      ref={ref}
      className={cx("arcsyn-avatar", className)}
      data-size={size}
      style={{ backgroundColor: colorFromId(id), ...style }}
      role={imageVisible ? undefined : "img"}
      aria-label={imageVisible ? undefined : label}
      {...props}
    >
      {imageVisible && image ? <img className="arcsyn-avatar__image" src={image} alt={name ?? ""} onError={() => setImageVisible(false)} /> : initialsFromName(name)}
    </span>
  );
});
