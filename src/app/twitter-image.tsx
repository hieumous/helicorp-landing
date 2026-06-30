import { ImageResponse } from "next/og";
import { OgFrame, ogSize, ogContentType, ogAlt } from "@/components/og/og-frame";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return new ImageResponse(<OgFrame />, { ...ogSize });
}
