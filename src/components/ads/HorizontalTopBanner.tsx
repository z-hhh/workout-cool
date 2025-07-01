import { GoogleAdSense } from "./GoogleAdSense";
import { AdWrapper } from "./AdWrapper";
import { AdPlaceholder } from "./AdPlaceholder";

export function HorizontalTopBanner() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <AdWrapper>
      <div className="w-full h-[120px] mb-4">
        {isDevelopment ? (
          <AdPlaceholder height="120px" type="Top Banner" width="100%" />
        ) : (
          <GoogleAdSense
            adClient="ca-pub-3437447245301146"
            adSlot="7555914556"
            style={{ display: "block", width: "100%", height: "120px" }}
          />
        )}
      </div>
    </AdWrapper>
  );
}
