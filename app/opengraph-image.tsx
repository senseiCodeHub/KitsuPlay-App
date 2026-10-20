import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "KitsuPlay — Chase your next favourite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logo: string | null = null;
  try {
    const file = await readFile(path.join(process.cwd(), "public", "apple-touch-icon.png"));
    logo = `data:image/png;base64,${file.toString("base64")}`;
  } catch {
    logo = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "#fff6ec",
          background:
            "radial-gradient(circle at 82% 6%, rgba(255,106,44,0.45) 0, transparent 45%), linear-gradient(140deg, #0b0806 0%, #1a0f08 60%, #0b0806 100%)",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logo}
              alt=""
              width={70}
              height={70}
              style={{ borderRadius: "20px", boxShadow: "0 18px 40px rgba(255,106,44,0.35)" }}
            />
          ) : (
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(150deg,#ffc178,#f0571c)",
                boxShadow: "0 18px 40px rgba(255,106,44,0.35)"
              }}
            >
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "#fff4e6", display: "flex" }} />
            </div>
          )}
          <div style={{ display: "flex", fontSize: "42px", fontWeight: 800, letterSpacing: "-2px" }}>KitsuPlay</div>
          <div
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,193,120,0.35)",
              color: "#ffcf9f",
              fontSize: "16px",
              letterSpacing: "2px"
            }}
          >
            ANDROID APK
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "48px" }}>
          <div style={{ display: "flex", fontSize: "70px", lineHeight: 1.02, fontWeight: 800, letterSpacing: "-4px" }}>
            Chase your next
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "70px",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-4px",
              background: "linear-gradient(100deg,#ffe0bb,#ffa45c 45%,#ff6a2c)",
              backgroundClip: "text",
              color: "transparent"
            }}
          >
            favourite.
          </div>
        </div>
        <div style={{ marginTop: "26px", fontSize: "24px", color: "#c0ac9b" }}>
          Latest stable build · Full version history · Direct downloads
        </div>
        <div
          style={{
            position: "absolute",
            right: "80px",
            bottom: "54px",
            color: "#ffb877",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "3px"
          }}
        >
          KITSUPLAY · QUICK AS A FOX
        </div>
      </div>
    ),
    { ...size }
  );
}
