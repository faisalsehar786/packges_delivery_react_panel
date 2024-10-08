import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";
// import {MenuTestPage} from '../pages/MenuTestPage'
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import Page404 from "../../_metronic/layout/components/404";
import SendPushNotification from "../pages/push-notification/SendPushNotification";

const PrivateRoutes = () => {
  const UsermangementRouts = lazy(
    () => import("../pages/usermangement/UsermangementRouts")
  );
  const PackageRouts = lazy(() => import("../pages/packages/PackageRouts"));
  const ExternalRouts = lazy(
    () => import("../pages/externalroutes/ExternalRouts")
  );

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/home/oversikt" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
      
        <Route
          path="home/pushnotification"
          element={<SendPushNotification />}
        />

        <Route
          path="user-mangement/*"
          element={
            <SuspensedView>
              <UsermangementRouts />
            </SuspensedView>
          }
        />

        <Route
          path="home/*"
          element={
            <SuspensedView>
              <PackageRouts />
            </SuspensedView>
          }
        />

        <Route
          path="external/*"
          element={
            <SuspensedView>
              <ExternalRouts />
            </SuspensedView>
          }
        />

        {/* Page Not Found */}
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

const SuspensedView: FC = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<></>}>{children}</Suspense>;
};

export { PrivateRoutes };
