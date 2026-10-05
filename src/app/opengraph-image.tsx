import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/constants";

export const runtime = "nodejs";
export const alt = "Malavika Susan — Senior Product Designer, Enterprise Software & AI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF9F6",
          padding: "80px",
          fontFamily: "serif",
          color: "#18181B",
          border: "16px solid #F0EEE9",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "#18181B",
            }}
          >
            Malavika Susan
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#71717A",
              lineHeight: 1.35,
              maxWidth: "900px",
              fontFamily: "sans-serif",
            }}
          >
            Senior Product Designer, Enterprise Software & AI
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E4E4E7",
            paddingTop: "28px",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 22,
              color: "#71717A",
              letterSpacing: "0.05em",
            }}
          >
            {SITE_URL.replace(/^https?:\/\//, "")}
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 20,
              color: "#A1A1AA",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
