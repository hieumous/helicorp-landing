import type { ReactElement } from "react";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "Helix One — Premium Smartwatch by Helicorp";

const pills = ["14-day battery", "AMOLED 3000 nits", "5ATM water resistant", "Titan Grade 5"];

export function OgFrame(): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        backgroundColor: "#0a0a12",
        backgroundImage:
          "radial-gradient(900px circle at 75% 20%, rgba(99,102,241,0.35), transparent 55%), radial-gradient(700px circle at 10% 90%, rgba(139,92,246,0.25), transparent 55%)",
        color: "#ffffff",
        fontFamily: "sans-serif",
      }}
    >
      {/* Brand row */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            backgroundColor: "#6366f1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: 800,
          }}
        >
          H
        </div>
        <div
          style={{
            marginLeft: "20px",
            fontSize: "30px",
            fontWeight: 700,
            letterSpacing: "4px",
            color: "#c7d2fe",
          }}
        >
          HELICORP
        </div>
      </div>

      {/* Title block */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: "120px", fontWeight: 800, lineHeight: 1 }}>
          Helix One
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "40px",
            fontWeight: 500,
            color: "#a5b4fc",
            maxWidth: "900px",
          }}
        >
          The premium smartwatch that redefines your rhythm.
        </div>
      </div>

      {/* Feature pills */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {pills.map((p) => (
          <div
            key={p}
            style={{
              display: "flex",
              marginRight: "16px",
              marginTop: "10px",
              padding: "12px 24px",
              borderRadius: "999px",
              border: "1px solid rgba(165,180,252,0.4)",
              backgroundColor: "rgba(99,102,241,0.12)",
              fontSize: "26px",
              color: "#e0e7ff",
            }}
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  );
}
