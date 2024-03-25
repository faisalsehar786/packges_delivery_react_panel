import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

export function VerifyOTP() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
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
            setTimeout(() => {
              navigate("/auth/login");
            }, 3000);
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
            style={{ maxHeight: "50px" }}
          />
          {/* <h2 className='text-dark mb-14 mx-2'>HYHMapparatet</h2> */}
        </div>
        <h1 className="authtext">Bekreft OTP</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-400">Fyll inn OTP for å logge på.</div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div
          className="mb-10 bg-light-success p-8 rounded"
          style={{ width: "81%" }}
        >
          <div className="text-dark">
            Engangskoden du har skrevet er ikke gyldig. Vennligst prøv igjen med
            ny kode.
          </div>
        </div>
      )}

      {/* {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded' style={{width: '81%'}}>
            <div className='text-info'>
              Dersom brukernavnet ditt er riktig vil du motta en epost med instrukser
            </div>
          </div>
        )} */}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6">OTP</label>
        <input
          type="text"
          placeholder="OTP"
          autoComplete="off"
          {...formik.getFieldProps("otp")}
          className={clsx("form-control form-control-lg f", {
            "is-invalid": formik.touched.otp && formik.errors.otp,
          })}
          style={{ width: "81%" }}
        />
        {/* {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )} */}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="row" style={{ marginBottom: "140px" }}>
        <div className="col-md-6">
          <Link to="/auth/login">
            <button
              type="button"
              id="kt_login_password_reset_form_cancel_button"
              className="btn btn-lg btn-light fw-bolder"
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Avbryt
            </button>
          </Link>{" "}
        </div>
        <div className="col-md-6">
          <button
            style={{ width: "160px" }}
            type="submit"
            id="kt_password_reset_submit"
            className="btn btn-lg btn-primary authbgcolor mb-5"
          >
            <span className="indicator-progress">
              Logg inn
              {loading && (
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              )}
            </span>
          </button>
        </div>
      </div>
      {/* <div className='d-flex flex-wrap justify-content-between pb-lg-0 '>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Avbryt
            </button>
          </Link>{' '}
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary  authbgcolor  '
          >
            <span className='indicator-label'>Send passord</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div> */}
      {/* end::Form group */}
    </form>
  );
}
