import { useEffect, useMemo, useState } from "react";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay-ts";
import "react-overlay-loader/styles.css";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { MasterInit } from "../_metronic/layout/MasterInit";
import SmallSize from "../_metronic/layout/components/SmallSize";
import { LayoutProvider } from "../_metronic/layout/core";
import BreadcrumbsContext, {
  Breadcrumb,
} from "../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../_metronic/layout/core/Loading";
import MasterLayoutState from "../context/Masterlayout/MasterlayoutState";
import ResolutionWarning from "./components/ResolutionWarning";
import { AuthInit } from "./modules/auth";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    document.body.style.pointerEvents = loading ? "none" : "auto";
  }, [loading]);

  const loadingContextValue = useMemo(
    () => ({ loading, setLoading }),
    [loading, setLoading]
  );
  const breadcrumbsContextValue = useMemo(
    () => ({ breadcrumbs, setBreadcrumbs }),
    [breadcrumbs, setBreadcrumbs]
  );

  return (
    <>
      <ResolutionWarning
        handleReturn={(val: boolean) => {
          setShow404(val);
        }}
      />
      {show404 ? (
        <SmallSize />
      ) : (
        <LoadingContext.Provider value={loadingContextValue}>
          <LoadingOverlay
            spinner={
              <Spinner
                animation="border"
                variant="primary"
                title="Laster inn..."
              />
            }
            active={loading}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(255, 255, 255, 0.5)",
                height: "100vh",
              }),
            }}
          >
            <BreadcrumbsContext.Provider value={breadcrumbsContextValue}>
              <MasterLayoutState>
                <I18nProvider>
                  <LayoutProvider>
                    <AuthInit>
                      <Outlet />
                      <MasterInit />
                    </AuthInit>
                  </LayoutProvider>
                </I18nProvider>
              </MasterLayoutState>
            </BreadcrumbsContext.Provider>
          </LoadingOverlay>
        </LoadingContext.Provider>
      )}
    </>
  );
};

export { App };
