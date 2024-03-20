/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from "clsx";
import { useFormik } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { usePageData } from "../../../_metronic/layout/core";
import BreadcrumbsContext from "../../../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../../../_metronic/layout/core/Loading";
import { handlePostRequest } from "../../services";
import PushCustomerSearch from "./PushCustomerSearch";

const formSchema = Yup.object().shape({
  subject: Yup.string().required("Emne er påkrevd"),
  message: Yup.string().required("Melding er påkrevd"),
  noti_type: Yup.string().required("Melding er påkrevd"),
  send_to: Yup.string().required("Melding er påkrevd"),
});

const SendPushNotification: React.FC = () => {
  const { setPageTitle } = usePageData();
  const { loading, setLoading } = useContext(LoadingContext);
  const [pushToken, setpushToken] = useState("");
  const [sendToUser, setsendToUser] = useState(false);
  const [submit, setsubmit] = useState(false);
  const [initialValues] = useState({
    subject: "",
    message: "",
    send_to: "all",
    noti_type: "other",
  });
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (values?.send_to === "single" && !pushToken) {
        toast.error(`vennligst velg en bruker`);
        return;
      }

      const body = {
        title: values.subject,
        description: values.message,
        type: values.noti_type,
        send_to: values.send_to,
        send_to_array: [pushToken],
      };

      const { data } = await handlePostRequest(
        "/notification/send_one_signal_notifications",
        body,
        {}
      )(setLoading);
      if (data) {
        // setpushToken('')
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
      formik.values.subject = "";
      formik.values.message = "";
      setsubmit(!submit);
    }
  }, [formik.values.send_to, submit, setsubmit]);

  useEffect(() => {
    setBreadcrumbs([
      {
        isActive: false,
        isSeparator: false,
        path: "home/oversikt",
        title: "Home",
      },
      {
        isActive: false,
        isSeparator: false,
        path: "home/pushnotification",
        title: "HmHy",
      },
      {
        isActive: true,
        isSeparator: false,
        path: "home/pushnotification",
        title: "Push varsel",
      },
    ]);
    setPageTitle("HmHy");
  }, []);
  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Send push varsel</h3>

        <div className="d-flex my-2">
          {/*  <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a> */}

          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            <div className="menu-item px-3">
              <a className="menu-link px-3">30 Days</a>
            </div>

            <div className="menu-item px-3">
              <a className="menu-link px-3">90 Days</a>
            </div>
          </div>
        </div>
      </div>
      {/*  <ActivitySection /> */}
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
              <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
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

              <div className="card p-3 mb-5">
                <label className="form-check form-check-custom form-check-solid mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="all"
                    name="send_to"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.send_to === "all"}
                  />
                  <span className="form-check-label">All</span>
                </label>

                <label className="form-check form-check-custom form-check-solid">
                  <input
                    className="form-check-input"
                    type="radio"
                    value="single"
                    name="send_to"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.send_to === "single"}
                  />
                  <span className="form-check-label">Single</span>
                </label>
              </div>

              {sendToUser ? (
                <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container ">
                  <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                    <span className="">Customer</span>
                  </label>
                  <PushCustomerSearch pushTokenProp={setpushToken} />
                  <div className="fv-plugins-message-container invalid-feedback" />
                </div>
              ) : (
                ""
              )}

              <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                  <span className="">Type</span>
                </label>
                <select
                  {...formik.getFieldProps("noti_type")}
                  className={clsx("form-control form-control-lg", {
                    "is-invalid":
                      formik.touched.noti_type && formik.errors.noti_type,
                  })}
                >
                  <option value="consent">consent</option>
                  <option value="other">other</option>
                </select>
                <div className="fv-plugins-message-container invalid-feedback" />
              </div>

              <div
                className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container"
                style={{ marginBottom: "1rem" }}
              >
                <label className="fs-6 fw-bold mb-2">Beskrivelse</label>
                <textarea
                  rows={6}
                  placeholder="Skriv en kort setning som forklarer varselet..."
                  {...formik.getFieldProps("message")}
                  className={clsx("form-control form-control-lg", {
                    "is-invalid":
                      formik.touched.message && formik.errors.message,
                  })}
                />
                <div className="fv-plugins-message-container invalid-feedback" />
              </div>

              <div>
                <div className=" d-flex justify-content-between">
                  {/* <button type='reset' id='kt_activities_close' className='btn btn-light me-3'>
                    Avbryt
                  </button> */}

                  <button
                    type="submit"
                    id="kt_modal_new_ticket_submit"
                    className="btn btn-lg btn-primary   authbgcolor"
                    disabled={loading}
                  >
                    {!loading && "Send"}
                    {loading && (
                      <span
                        className="indicator-progress"
                        style={{ display: "block" }}
                      >
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2" />
                      </span>
                    )}
                  </button>
                </div>
                {/* {successMessage && (
                  <div>
                    <div className='text-success text-center mt-4' role='alert'>
                      {successMessage}
                    </div>
                  </div>
                )} */}
              </div>

              <div />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendPushNotification;
