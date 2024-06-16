/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Registration } from "./components/Registration";
import { ForgotPassword } from "./components/ForgotPassword";
import { Login } from "./components/Login";
import { ResetPassword } from "./components/ResetPassword";
import { VerifyOTP } from "./components/VerifyOTP";
import Page404 from "../../../_metronic/layout/components/404";
import { SetPassword } from "./components/SetPassword";
import { LinkExpire } from "./components/LinkExpire";
// import NifLogin from './components/NifLogin'

// import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add("bg-white");
    return () => {
      document.body.classList.remove("bg-white");
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-column flex-lg-row flex-column-fluid">
        <div className="d-flex flex-column flex-lg-row-auto w-xl-500px positon-xl-relative">
          <div className="d-flex flex-column position-xl-fixed top-0 bottom-0 w-xl-600px scroll-y">
            <div className="d-flex flex-row-fluid flex-column  p-7">
              <Outlet />
              <p className="text-dark mb-0 px-6" style={{ marginTop: "auto" }}>
                HmHy © {new Date().getFullYear()}. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column flex-lg-row-fluid py-10 backgroundUrlAuth"
          style={{
            // backgroundColor: '#E4F7FD',

            height: "100vh",
            backgroundImage: "url('/media/misc/MiscBG.png')",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password/:token" element={<ResetPassword />} />
      <Route path="create-account/:token" element={<SetPassword />} />
      <Route path="link-expired" element={<LinkExpire />} />
      <Route path="verify-otp" element={<VerifyOTP />} />
      <Route index element={<Login />} />
    </Route>
    <Route path="*" element={<Page404 />} />
    {/* <Route path='nif-login' element={<NifLogin />} /> */}
  </Routes>
);

export { AuthPage };
