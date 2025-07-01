import { GoogleAdSense } from "./GoogleAdSense";
import { AdWrapper } from "./AdWrapper";
import { AdPlaceholder } from "./AdPlaceholder";

export function HorizontalBottomBanner() {
  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <AdWrapper>
      <div className="w-full max-w-full overflow-hidden" style={{ minHeight: "90px", maxHeight: "250px" }}>
        <div className="px-4 py-2">
          {isDevelopment ? (
            <AdPlaceholder height="90px" type="Bottom Banner" width="100%" />
          ) : (
            <GoogleAdSense
              adClient="ca-pub-3437447245301146"
              adFormat="horizontal"
              adSlot="9024074746"
              style={{ display: "block", minHeight: "50px", maxHeight: "250px" }}
            />
          )}
        </div>
      </div>
    </AdWrapper>
  );
}
