import clsx from "clsx";
import { useFormik } from "formik";
import { FC, useContext } from "react";
import * as Yup from "yup";
import LoadingContext from "../../../_metronic/layout/core/Loading";
import { handlePostRequest } from "../../services";

const formSchema = Yup.object().shape({
  subject: Yup.string().required("Emne er påkrevd"),
  message: Yup.string().required("Melding er påkrevd"),
});

const initialValues = {
  subject: "",
  message: "",
};

const ActivityDrawerMain: FC = () => {
  const { loading, setLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: formSchema,
    onSubmit: async (values, { resetForm }) => {
      const body = {
        subject: values.subject,
        body: values.message,
      };
      const { data } = await handlePostRequest(
        "/zendesk/admin_create_ticket",
        body,
        {}
      )(setLoading);
      if (data) resetForm();
    },
  });

  // const onSubmit = async (event: any) => {
  //   event.preventDefault()
  //   console.log('Zendesk API called')
  //   const data = {
  //     subject: subject,
  //     body: message,
  //   }
  //   try {
  //     const response = await axios.post(
  //       'https://api.HYHM.no/api/v1/zendesk/admin_create_ticket',
  //       data
  //     )
  //     setSuccessMessage(
  //       'Din hendvendelse er nå registrert. Vi tar kontakt på epost så snart som mulig.'
  //     )
  //     setMessage('')
  //     setSubject('')
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div
      id="kt_activities"
      className="bg-white"
      data-kt-drawer="true"
      data-kt-drawer-name="activities"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '764px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_activities_toggle"
      data-kt-drawer-close="#kt_activities_close"
    >
      <div className="card shadow-none rounded-0 border-none">
        <div className="card-header" id="kt_activities_header">
          <div className=" d-flex align-items-center">
            <div
              className="btn btn-icon btn-active-light-primary btn-custom border min-w-auto
            "
            >
              <i
                style={{
                  borderRadius: "8px",
                }}
                className="fa-headset fs-2 fa-duotone
              "
              />
            </div>

            <div className="ms-4">
              <h3 className="fs-5 fw-bolder text-gray-900 mb-0">
                Kontakt Support
              </h3>
              <span className="fw-bold fs-7 text-gray-400">
                eller meld inn feil
              </span>
            </div>
          </div>

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary min-w-auto"
              id="kt_activities_close"
            >
              <i className="fa-duotone fa-rectangle-xmark fs-2" />
            </button>
          </div>
        </div>

        <div className="card-body position-relative" id="kt_activities_body">
          <div
            id="kt_activities_scroll"
            className=""
            data-kt-scroll="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-wrappers="#kt_activities_body"
            data-kt-scroll-dependencies="#kt_activities_header, #kt_activities_footer"
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
                        <div className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container">
                          <label className="d-flex align-items-center fs-6 fw-bold mb-2">
                            <span className="">Tema</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Skriv inn et relevant tema..."
                            {...formik.getFieldProps("subject")}
                            className={clsx("form-control form-control-lg", {
                              "is-invalid":
                                formik.touched.subject && formik.errors.subject,
                            })}
                          />
                          <div className="fv-plugins-message-container invalid-feedback" />
                        </div>

                        <div
                          className="d-flex flex-column mb-8 fv-row fv-plugins-icon-container"
                          style={{ marginBottom: "1rem" }}
                        >
                          <label className="fs-6 fw-bold mb-2">
                            Beskrivelse
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Beskriv problemstillingen du opplever..."
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
                            <button
                              type="reset"
                              id="kt_activities_close"
                              className="btn btn-light me-3"
                            >
                              Avbryt
                            </button>
                            <button
                              type="submit"
                              id="kt_modal_new_ticket_submit"
                              className="btn btn-lg btn-primary   authbgcolor"
                            >
                              <span className="indicator-progress">
                                Send
                                {loading && (
                                  <span className="spinner-border spinner-border-sm align-middle ms-2" />
                                )}
                              </span>
                            </button>
                          </div>
                          {/* {successMessageSupport && (
                            <div>
                              <div className='text-success text-center mt-4' role='alert'>
                                {successMessageSupport}
                              </div>
                            </div>
                          )} */}
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

export { ActivityDrawerMain };
