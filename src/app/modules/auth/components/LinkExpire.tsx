import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { addBearer, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { setAuth, setRefreshToken, setToken } from "../core/AuthHelpers";
import { verifyOtp } from "../core/_requests";

const initialValues = {
  otp: "",
};

const otpPasswordSchema = Yup.object().shape({
  otp: Yup.string().required("OTP is required"),
});

export function LinkExpire() {
  const [, setLoading] = useState(false);
  const [, setHasErrors] = useState<boolean | undefined>(undefined);
  const { setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: otpPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      const id = localStorage.getItem("otp_id");
      setLoading(true);
      setHasErrors(undefined);
      setTimeout(() => {
        verifyOtp(id, values.otp.trim())
          .then((auth) => {
            setHasErrors(false);
            setLoading(false);
            setAuth(auth.data.data);
            setCurrentUser(auth.data.data);
            setRefreshToken(addBearer(auth.headers.authorization));
            setToken(addBearer(auth.data.data.access_token));
            localStorage.setItem("currentUser", JSON.stringify(auth.data.data));
            localStorage.removeItem("otp_id");
          })
          .catch(() => {
            setHasErrors(true);
            setLoading(false);
            setSubmitting(false);
            setStatus("OTP not verified");
          });
      }, 1000);
    },
  });
  return (
    <form
      // className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id="kt_login_password_reset_form"
      onSubmit={formik.handleSubmit}
    >
      <div className=" mb-10">
        {/* begin::Title */}

        <div className=" mb-10 d-flex " style={{ alignItems: "center" }}>
          <img
            src={toAbsoluteUrl("/media/logos/S-logo-full-dark.png")}
            alt="logo"
            className="svg-icon-cufs mb-14"
            style={{ maxHeight: "100px" }}
          />
        </div>
      </div>

      <div style={{ height: "10rem" }} />

      <div
        className="mb-10 bg-light-success p-8 rounded"
        style={{ width: "81%" }}
      >
        <div className="text-dark fw-bold fs-3">Link utløpt!</div>
        <div className="text-dark">
          Linken du mottok er dessverre utløpt. Vennligst kontakt din leder
          eller HmHy Support for å få ny link.
        </div>
      </div>
    </form>
  );
}
