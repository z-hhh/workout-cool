import { GoogleAdSense } from "./GoogleAdSense";
import { AdWrapper } from "./AdWrapper";

export function HorizontalTopBanner() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <AdWrapper>
      <div className="w-full mb-4">
        <GoogleAdSense adClient="ca-pub-3437447245301146" adSlot="7555914556" style={{ display: "block" }} />
      </div>
    </AdWrapper>
  );
}
