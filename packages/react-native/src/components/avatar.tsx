import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from "react-native";
import { tokens } from "../theme.js";

export type AvatarSize = "sm" | "md" | "lg";
export interface AvatarProps { id: string; name?: string; image?: ImageSourcePropType; size?: AvatarSize; style?: StyleProp<ViewStyle>; }

function initialsFromName(name?: string) { const parts = name?.trim().split(/\s+/).filter(Boolean) ?? []; if (parts.length === 0) return "?"; if (parts.length === 1) return parts[0].slice(0, 2).toLocaleUpperCase(); return `${parts[0][0]}${parts.at(-1)?.[0]}`.toLocaleUpperCase(); }
function colorFromId(id: string) { let hash = 0; for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) | 0; return `hsl(${Math.abs(hash) % 360}, 32%, 28%)`; }

export function Avatar({ id, name, image, size = "md", style }: AvatarProps) {
  const [imageVisible, setImageVisible] = useState(Boolean(image));
  useEffect(() => setImageVisible(Boolean(image)), [image]);
  const dimension = { sm: 24, md: 32, lg: 40 }[size];
  return <View accessibilityRole="image" accessibilityLabel={name ? `Avatar de ${name}` : "Avatar sem nome"} style={[styles.root, { backgroundColor: colorFromId(id), height: dimension, width: dimension }, style]}>{imageVisible && image ? <Image source={image} onError={() => setImageVisible(false)} style={styles.image} /> : <Text style={[styles.initials, { fontFamily: tokens.fontFamily.sansSemibold, fontSize: size === "lg" ? tokens.fontSize.sm : tokens.fontSize.xs }]}>{initialsFromName(name)}</Text>}</View>;
}

const styles = StyleSheet.create({ root: { alignItems: "center", borderRadius: 9999, justifyContent: "center", overflow: "hidden" }, initials: { color: "#ffffff", includeFontPadding: false, textTransform: "uppercase" }, image: { height: "100%", width: "100%" } });
