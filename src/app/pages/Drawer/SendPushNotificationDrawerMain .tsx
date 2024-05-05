import clsx from "clsx";
import { useFormik } from "formik";
import { FC, useContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LoadingContext from "../../../_metronic/layout/core/Loading";
import { handlePostRequest } from "../../services";
import PushCustomerSearch from "./PushCustomerSearch";

const formSchema = Yup.object().shape({
  subject: Yup.string().required("Emne er påkrevd"),
  message: Yup.string().required("Melding er påkrevd"),
  noti_type: Yup.string().required("Melding er påkrevd"),
  send_to: Yup.string().required("Melding er påkrevd"),
});

const SendPushNotificationDrawerMain: FC = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [pushToken, setpushToken] = useState("");
  const [sendToUser, setsendToUser] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [initialValues] = useState({
    subject: "",
    message: "",
    send_to: "all",
    noti_type: "",
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      if (values?.send_to === "single" && !pushToken) {
        toast.error(`vennligst velg en bruker`);
        return;
      }

      const body = {
        title: values.subject,
        message: values.message,
        noti_type: values.noti_type,
        send_to: values.send_to,
        noti_for: "for_app",
        send_to_array: [pushToken],
      };

      const { data } = await handlePostRequest(
        "/notification/send_one_signal_notifications",
        body,
        {}
      )(setLoading);
      if (data) {
        resetForm();
        setsubmit(true);
      }
    },
  });

  useMemo(() => {
    if (formik.values.send_to === "single") {
      setsendToUser(true);
    } else {
      setsendToUser(false);
    }
    if (submit) {
      setsendToUser(false);
      setpushToken("");
      setsubmit(!submit);
    }
  }, [formik?.values, submit, setsubmit, setsendToUser]);

  return (
    <div
      id="kt_pushnotification"
      className="bg-white"
      data-kt-drawer="true"
      data-kt-drawer-name="pushnotification"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '764px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_pushnotification_toggle"
      data-kt-drawer-close="#kt_pushnotification_close"
    >
      <div className="card shadow-none rounded-0 border-none">
        <div className="card-header" id="kt_pushnotification_header">
          <div className=" d-flex align-items-center">
            <div
              className="btn btn-icon btn-active-light-primary btn-custom border min-w-auto
            "
            >
              <i
                style={{
                  borderRadius: "8px",
                }}
                className="fa-duotone fa-bell fs-2"
              />
            </div>

            <div className="ms-4">
              <h3 className="fs-5 fw-bolder text-gray-900 mb-0">
                Send push varsel
              </h3>
              <span className="fw-bold fs-7 text-gray-400">
                Til en eller alle customer
              </span>
            </div>
          </div>

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary min-w-auto"
              id="kt_pushnotification_close"
            >
              <i className="fa-duotone fa-rectangle-xmark fs-2" />
            </button>
          </div>
        </div>

        <div
          className="card-body position-relative"
          id="kt_pushnotification_body"
        >
          <div
            id="kt_pushnotification_scroll"
            className=""
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_pushnotification_body"
            data-kt-scroll-dependencies="#kt_pushnotification_header, #kt_pushnotification_footer"
            data-kt-scroll-offset="5px"
          >
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-line w-40px" />

                <div className="timeline-content mb-10 mt-n1">
                  <div className="overflow-auto pb-5">
                    <div className=" align-items-center  min-w-700px  py-3 ">
                      <form
                        onSubmit={formik.handleSubmit}
                        noValidate
                        id="kt_modal_new_ticket_form"
                        className="form fv-plugins-bootstrap5 fv-plugins-framework"
                        action="#"
                      >
                        <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container">
                          <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                            <span className="">Tittel</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Skriv en tittel for varselen..."
                            {...formik.getFieldProps("subject")}
                            className={clsx("form-control form-control-lg", {
                              "is-invalid":
                                formik.touched.subject && formik.errors.subject,
                            })}
                          />
                          <div className="fv-plugins-message-container invalid-feedback" />
                        </div>

                        <div className=" d-flex  align-items-center mb-7">
                          <div className="col-lg-7">
                            <select
                              {...formik.getFieldProps("noti_type")}
                              className={clsx(
                                "form-control form-select form-select-lg  form-control-lg",
                                {
                                  "is-invalid":
                                    formik.touched.noti_type &&
                                    formik.errors.noti_type,
                                }
                              )}
                            >
                              <option value="">Velg varsel type</option>
                              {[
                                { label: "Deliveries", val: "tender" },
                                { label: "Payments", val: "payment" },
                                { label: "App Support", val: "app_support" },
                                { label: "Admin", val: "admin" },
                                { label: "Other", val: "other" },
                              ].map((item) => (
                                <option value={item?.val}>{item?.label}</option>
                              ))}
                            </select>
                          </div>

                          <div className="col-lg-3">
                            <label
                              className="form-check form-check-custom form-check-solid "
                              style={{ marginLeft: "2rem" }}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                value="all"
                                name="send_to"
                                onChange={formik.handleChange}
                                checked={formik.values.send_to === "all"}
                              />
                              <span className="form-check-label">
                                Send til alle
                              </span>
                            </label>
                          </div>
                          <div className="col-lg-2">
                            <label
                              className="form-check form-check-custom form-check-solid"
                              style={{ float: "right" }}
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                value="single"
                                name="send_to"
                                onChange={formik.handleChange}
                                checked={formik.values.send_to === "single"}
                              />
                              <span className="form-check-label">
                                Send til en
                              </span>
                            </label>
                          </div>
                        </div>

                        {sendToUser ? (
                          <div className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container ">
                            <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                              <span className="">Customer</span>
                            </label>
                            <PushCustomerSearch
                              submit={submit}
                              pushTokenProp={setpushToken}
                            />
                            <div className="fv-plugins-message-container invalid-feedback" />
                          </div>
                        ) : (
                          ""
                        )}

                        <div
                          className="d-flex flex-column mb-7 fv-row fv-plugins-icon-container"
                          style={{ marginBottom: "1rem" }}
                        >
                          <label className="fs-6 fw-bold mb-2">
                            Beskrivelse
                          </label>
                          <textarea
                            rows={10}
                            placeholder="Skriv varselet du ønsker å sende her. Det er anbefalt å holde varselet så kort som mulig."
                            {...formik.getFieldProps("message")}
                            className={clsx(
                              "form-control form-control-lg textareapushnoti",
                              {
                                "is-invalid":
                                  formik.touched.message &&
                                  formik.errors.message,
                              }
                            )}
                          />
                          <div className="fv-plugins-message-container invalid-feedback" />
                        </div>

                        <div>
                          <div className=" d-flex justify-content-between">
                            <button
                              type="reset"
                              id="kt_pushnotification_close"
                              className="btn btn-light me-3"
                            >
                              Avbryt
                            </button>
                            <button
                              style={{ width: 155 }}
                              type="submit"
                              id="kt_modal_new_ticket_submit"
                              className="btn btn-lg btn-primary   authbgcolor"
                            >
                              <span className="indicator-progress">
                                Send varsel
                                {loading && (
                                  <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                )}
                              </span>
                            </button>
                          </div>
                        </div>

                        <div />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SendPushNotificationDrawerMain };
