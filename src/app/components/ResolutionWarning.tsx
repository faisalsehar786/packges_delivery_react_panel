import { useEffect } from "react";

const ResolutionError = ({ handleReturn }: any) => {
  useEffect(() => {
    const minWidthResolutionPixels = 1200;

    const minResolutionInches =
      minWidthResolutionPixels / window.devicePixelRatio;

    const calculateScreenWidthInches = () => {
      const screenWidthPixels = window.innerWidth;
      const screenWidthInches = screenWidthPixels / window.devicePixelRatio;

      if (
        screenWidthInches < minResolutionInches &&
        !(window.location.href.indexOf("parker") > -1)
      ) {
        handleReturn(true);
      } else {
        handleReturn(false);
      }
    };

    // Calculate initial screen width
    calculateScreenWidthInches();

    // Calculate screen width on resize
    window.addEventListener("resize", calculateScreenWidthInches);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", calculateScreenWidthInches);
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{/* Your website content goes here */}</>;
};

export default ResolutionError;
