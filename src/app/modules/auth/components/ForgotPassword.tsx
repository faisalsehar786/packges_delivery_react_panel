import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { requestPassword } from "../core/_requests";

const initialValues = {
  email: "",
};

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
});

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      setHasErrors(undefined);
      setTimeout(() => {
        requestPassword(values.email)
          .then(() => {
            setHasErrors(false);
            setLoading(false);
            setTimeout(() => {
              // window.location.href = '/auth/forgot-password'
              navigate("/auth/login");
            }, 3000);
          })
          .catch(() => {
            setHasErrors(true);
            setLoading(false);
            setSubmitting(false);
            setTimeout(() => {
              navigate("/auth/login");
            }, 3000);
            setStatus(
              "Innloggingsinformasjonen du har gitt er feil. Vennligst prøv igjen."
            );
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
          {/* <h2 className='text-dark mb-14 mx-2'>HYHMapparatet</h2> */}
        </div>

        <h1 className="authtext">Glemt passord?</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className="text-gray-400">
          Skriv inn ditt brukernavn for å resette passord
        </div>
        {/* end::Link */}
      </div>

      {/* begin::Title */}
      {hasErrors === true && (
        <div
          className="mb-10 bg-light-success p-8 rounded"
          style={{ width: "81%" }}
        >
          <div className="text-dark">
            Dersom brukernavnet ditt er riktig vil du motta en epost med
            instrukser.
            {/* noe galt eller e-posten du oppga ikke eksisterer */}
          </div>
        </div>
      )}

      {hasErrors === false && (
        <div
          className="mb-10 bg-light-success p-8 rounded"
          style={{ width: "81%" }}
        >
          <div className="text-dark">
            Dersom brukernavnet ditt er riktig vil du motta en epost med
            instrukser
          </div>
        </div>
      )}
      {/* end::Title */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Brukernavn
        </label>
        <input
          type="email"
          placeholder="Brukernavn"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx("form-control form-control-lg f", {
            "is-invalid": formik.touched.email && formik.errors.email,
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
        <div className="col-md-4">
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
        <div className="col-md-8">
          <button
            style={{ width: "215px", marginLeft: "3.1rem" }}
            type="submit"
            id="kt_password_reset_submit"
            className="btn btn-lg btn-primary authbgcolor mb-5"
          >
            <span className="indicator-label">
              Tilbakestill passord
              {loading && (
                <span className="spinner-border spinner-border-sm align-middle ms-2" />
              )}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
