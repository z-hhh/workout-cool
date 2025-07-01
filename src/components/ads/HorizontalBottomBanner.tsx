import { GoogleAdSense } from "./GoogleAdSense";
import { AdWrapper } from "./AdWrapper";
import { AdPlaceholder } from "./AdPlaceholder";

export function HorizontalBottomBanner() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <AdWrapper>
      <div className="w-full h-[120px] mt-4">
        {isDevelopment ? (
          <AdPlaceholder height="120px" type="Bottom Banner" width="100%" />
        ) : (
          <GoogleAdSense
            adClient="ca-pub-3437447245301146"
            adSlot="9024074746"
            style={{ display: "block", width: "100%", height: "120px" }}
          />
        )}
      </div>
    </AdWrapper>
  );
}
