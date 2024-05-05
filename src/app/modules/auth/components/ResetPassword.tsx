import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import {
  handleGetRequest,
  handlePostRequestWithoutMessage,
} from "../../../services";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required()
    .min(8, "Passordet må bestå av minst 8 karakterer.")

    .matches(
      /[0-9]/,
      "Passordet skal inneholde både tall, symboler, store og små bokstaver og bestå av minst 8 tegn"
    )
    .matches(
      /[a-z]/,
      "Passordet skal inneholde både tall, symboler, store og små bokstaver og bestå av minst 8 tegn"
    )
    .matches(
      /[A-Z]/,
      "Passordet skal inneholde både tall, symboler, store og små bokstaver og bestå av minst 8 tegn"
    )
    .matches(
      /[^\w]/,
      "Passordet skal inneholde både tall, symboler, store og små bokstaver og bestå av minst 8 tegn"
    ),

  // if empty then return required else check if password and confirm password are same, // if empty then return required else check if password and confirm password are same
  // if empty then return required else check if password and confirm password are same
  confirmPassword: Yup.string()
    .when("password", {
      is: (password: any) => {
        return password && password.length > 0;
      },
      then: Yup.string().oneOf([Yup.ref("password")], "Passordet stemmer ikke"),
    })
    .min(8, "Passordet må bestå av minst 8 karakterer."),
});

export function ResetPassword() {
  const [validationSchema, setValidationSchema] =
    useState<any>(resetPasswordSchema);
  const { token } = useParams<{ token: string }>();
  const [fieldPass, setfieldPass] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const getRequestDetails = async () => {
    const { data, success, message } = await handleGetRequest(
      `/admin/reset-password-request-details/${token}`
    )(setLoading);
    if (
      (!success && message === "Link utløpt") ||
      (success && message === "Link utløpt")
    ) {
      toast.error("Link utløpt", { autoClose: 3000 });
      setTimeout(() => {
        // window.location.href = '/auth/forgot-password'
        navigate("/auth/link-expired");
      }, 3000);

      return;
    }
    setData(data);
  };

  useEffect(() => {
    getRequestDetails();
  }, [token]);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const [formVal] = useState(initialValues);
  const submitStep = async (values: any) => {
    // eslint-disable-next-line eqeqeq
    if (!data) {
      toast.error("Lenken for tilbakestilling av passord har utløpt.", {
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
      return;
    }

    const { success } = await handlePostRequestWithoutMessage(
      `/admin/change-password`,
      {
        password: values?.password,
        request_id: token,
      }
    )(setLoading);

    if (success) {
      toast.success(
        "Passord tilbakestilt. Du vil nå bli sendt til innloggingssiden hvor du kan logge inn med ditt nye passord.",
        { autoClose: 3000 }
      );
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    }
  };
  return (
    <Formik
      initialValues={formVal}
      onSubmit={submitStep}
      enableReinitialize
      encType="multipart/form-data"
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className=" mb-10">
            {/* begin::Title */}

            <div className=" mb-10 d-flex " style={{ alignItems: "center" }}>
              <img
                src={toAbsoluteUrl("/media/logos/S-logo-full-dark.png")}
                alt="logo"
                className="svg-icon-cufs mb-14"
                style={{ maxHeight: "100px" }}
              />
              {/* <h2 className='text-dark mb-14 mx-2'>HmHy</h2> */}
            </div>

            <h1 className="authtext">Tilbakestill passord</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className="text-gray-400">
              Skriv inn ditt nye password og bekreft passordet for å fortsette.
            </div>
            {/* end::Link */}
          </div>
          <div className="fv-row mb-4">
            <label className={clsx("col-lg-4 col-form-label fw-bold fs-6")}>
              Nytt passord
            </label>
            <Field
              style={{ borderRadius: "8px", width: "81%" }}
              type={fieldPass ? "text" : "password"}
              name="password"
              className="form-control form-control-lg form-control-solid"
              placeholder="Nytt passord"
              onChange={(e: any) => {
                setFieldValue("password", e.target.value);
                if (e.target.value !== values.confirmPassword) {
                  // set validation scheme and only update the confirmPassword field
                  setValidationSchema(
                    Yup.object().shape({
                      ...validationSchema?.fields,
                      confirmPassword: Yup.string()
                        .required(
                          "Vennligst bekreft passordet ditt for å fortsette."
                        )
                        .oneOf(
                          [Yup.ref("password"), ""],
                          "Begge passordene må være like."
                        ),
                    })
                  );
                } else {
                  setValidationSchema(
                    Yup.object().shape({
                      ...validationSchema?.fields,
                      confirmPassword: Yup.string().notRequired(),
                    })
                  );
                }
              }}
            />
            <div className="text-danger">
              <ErrorMessage name="password" />
            </div>
            <span
              className="btn btn-sm btn-icon  end-0 me-n2"
              onClick={() => setfieldPass(!fieldPass)}
              style={{ position: "absolute", left: "71%", top: "268px" }}
            >
              <i className={`fa fa-eye${fieldPass ? "" : "-slash"}`} />
            </span>
          </div>
          <div className="fv-row mb-4">
            <label
              className={clsx("col-lg-4 col-form-label fw-bold fs-6", {
                required:
                  validationSchema?.fields?.confirmPassword?.exclusiveTests
                    ?.required,
              })}
            >
              Bekreft passord
            </label>
            <Field
              style={{ borderRadius: "8px", width: "81%" }}
              type={fieldPass ? "text" : "password"}
              name="confirmPassword"
              className="form-control form-control-lg form-control-solid"
              placeholder="Bekreft passord"
              onChange={(e: any) => {
                setFieldValue("confirmPassword", e.target.value);
                if (e.target.value !== values.password) {
                  // set validation scheme and only update the confirmPassword field
                  setValidationSchema(
                    Yup.object().shape({
                      ...validationSchema?.fields,
                      password: Yup.string().required(
                        "Skriv inn ditt nye passord."
                      ),
                    })
                  );
                } else {
                  setValidationSchema(
                    Yup.object().shape({
                      ...validationSchema?.fields,
                      password: Yup.string().notRequired(),
                    })
                  );
                }
              }}
            />
            <div className="text-danger">
              <ErrorMessage name="confirmPassword" />
            </div>
            <span
              className="btn btn-sm btn-icon  end-0 me-n2"
              onClick={() => setfieldPass(!fieldPass)}
              style={{ position: "absolute", left: "71%", top: "369px" }}
            >
              <i className={`fa fa-eye${fieldPass ? "" : "-slash"}`} />
            </span>
          </div>
          <div className="row" style={{ marginBottom: "140px" }}>
            <div className="col-md-4">
              <Link to="/auth/login">
                <button
                  type="button"
                  id="kt_login_password_reset_form_cancel_button"
                  className="btn btn-light me-3"
                >
                  Avbryt
                </button>
              </Link>{" "}
            </div>
            <div className="col-md-8">
              <button
                style={{ width: "212px", marginLeft: "3.3rem" }}
                type="submit"
                id="kt_password_reset_submit"
                className="btn btn-lg btn-primary authbgcolor mb-5"
              >
                <span className="indicator-progress">
                  Lagre nytt passord
                  {loading && (
                    <span className="spinner-border spinner-border-sm align-middle ms-2" />
                  )}
                </span>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
