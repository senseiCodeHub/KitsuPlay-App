import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "KitsuPlay — Official Android Download";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", color: "#fff8f2", background: "radial-gradient(circle at 85% 10%, #713a1e 0, transparent 38%), linear-gradient(135deg, #0b0b10 0%, #1c120d 100%)", fontFamily: "Arial" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
        <div style={{ width: "76px", height: "76px", borderRadius: "22px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#ff9958,#ff6b35)", color: "#1a0d07", fontSize: "42px", fontWeight: 900 }}>K</div>
        <div style={{ display: "flex", fontSize: "46px", fontWeight: 800, letterSpacing: "-2px" }}>KitsuPlay</div>
      </div>
      <div style={{ marginTop: "55px", fontSize: "66px", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px" }}>Your next watch.<br/><span style={{ color: "#ff9958" }}>One tap away.</span></div>
      <div style={{ marginTop: "28px", fontSize: "25px", color: "#c8b5a6" }}>Official Android APK · Version history · Direct downloads</div>
      <div style={{ position: "absolute", right: "80px", bottom: "54px", color: "#ffbd8a", fontSize: "18px", fontWeight: 700 }}>KITSUPLAY · ANDROID</div>
    </div>,
    { ...size }
  );
}
