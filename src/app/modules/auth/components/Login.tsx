/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import toastr from "../../../../toaster";
import { useAuth } from "../core/Auth";
import { login } from "../core/_requests";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: localStorage.getItem("email") || "",
  password: localStorage.getItem("password") || "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth } = useAuth();
  const [fieldPass, setfieldPass] = useState(false);
  const navigate = useNavigate();
  const [rememberPassword, setRememberPassword] = useState(
    localStorage.getItem("rememberPassword") === "true"
  );

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        const auth = await login(values.email, values.password);
        if (auth) {
          localStorage.setItem("otp_id", auth.data.data.id);
          navigate("/auth/verify-otp");
          // updateRememberPassword()
          // setCurrentUser(auth.data.data)
          // setAuth(auth.data.data);
          // //  const user = await getUserByToken(auth.headers.authorization)
          // //  setCurrentUser(user.data.data)
          // setToken(auth.headers.authorization);
        }
      } catch (error: any) {
        toastr.error(error.response.data.message);
        // eslint-disable-next-line no-console
        console.error(error);
        saveAuth(undefined);
        setStatus(
          "Innloggingsinformasjonen du har gitt er feil. Vennligst prøv igjen."
        );
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      // className='form w-55'
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
      style={{ width: "450px", marginBottom: "10px" }}
    >
      {/* begin::Heading */}
      <div className=" mb-10 d-flex " style={{ alignItems: "center" }}>
        <img
          src={toAbsoluteUrl("/media/logos/S-logo-full-dark.png")}
          alt="logo"
          className="svg-icon-cufs mb-14"
          style={{ maxHeight: "100px" }}
        />
        {/* <h2 className='text-dark mb-14 mx-2'>HYHMapparatet AS</h2> */}
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      ) : (
        <div />
      )}

      <div className="fv-row">
        <h1 style={{ color: "#001B5C" }}>Log inn</h1>
      </div>
      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <label className="form-label fs-6 fw-bolder text-dark">
          Brukernavn
        </label>
        <input
          placeholder="Brukernavn"
          {...formik.getFieldProps("email")}
          className={clsx("form-control form-control-lg", {
            "is-invalid": formik.touched.email && formik.errors.email,
          })}
          type="email"
          name="email"
          autoComplete="off"
        />
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-10">
        <div className="d-flex justify-content-between mt-n5">
          <div className="d-flex flex-stack mb-2">
            {/* begin::Label */}
            <label className="form-label fw-bolder text-dark fs-6 mb-0">
              Passord
            </label>
            {/* end::Label */}
          </div>
        </div>
        <input
          type={fieldPass ? "text" : "password"}
          placeholder="Passord"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx("form-control form-control-lg", {
            "is-invalid": formik.touched.password && formik.errors.password,
          })}
        />
        <span
          className="btn btn-sm btn-icon  end-0 me-n2"
          onClick={() => setfieldPass(!fieldPass)}
          style={{ position: "absolute", left: "71%", top: "302px" }}
        >
          <i className={`fa fa-eye${fieldPass ? "" : "-slash"}`} />
        </span>
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div
        className="d-flex justify-content-between"
        style={{ marginBottom: "15px" }}
      >
        <div
          className="text-gray-400 d-flex  align-items-center
            "
        >
          <label style={{ marginLeft: "5px" }} className="form-label fs-5 mb-0">
            <input
              type="checkbox"
              id="rememberPassword"
              checked={rememberPassword}
              onChange={(e) => {
                setRememberPassword(e.target.checked);
              }}
            />{" "}
            Forbli pålogget
          </label>
        </div>
        <Link
          to="/auth/forgot-password"
          className="link-primary fs-6 fw-bolder"
          style={{ marginLeft: "5rem" }}
        >
          Glemt passord?
        </Link>
      </div>
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-lg btn-primary w-100  authbgcolor mb-2 "
          disabled={formik.isSubmitting || !formik.isValid}
        >
          <span className="indicator-label">
            Logg inn
            {loading && (
              <span className="spinner-border spinner-border-sm align-middle ms-2" />
            )}
          </span>
        </button>
      </div>
      {/* end::Action */}
    </form>
  );
}
