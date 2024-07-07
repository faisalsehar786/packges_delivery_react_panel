import clsx from "clsx";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import BreadcrumbsContext from "../../../../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { handlePostRequest } from "../../../services";

export const initialValues = {
  first_name: "",
  last_name: "",
  email: "",
  mobile_number: "",
  company: "",
  contactPhone: "",
  companySite: "",
  currency: "",
  // communication: 'email',
  role: "",
  password: "",
  confirm_password: "",
};

const profileDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string().email("Wrong email format").required("Email is required"),
  mobile_number: Yup.string().required("Contact phone is required"),
});

const ProfileDetails: React.FC = () => {
  const [picture, setpicture] = useState<any>(null);
  const { loading, setLoading } = useContext(LoadingContext);
  const navigation = useNavigate();
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);

  const formik = useFormik<any>({
    initialValues,
    validationSchema: profileDetailsSchema,
    onSubmit: async (values) => {
      const formData = new FormData();

      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("mobile_number", values.mobile_number);
      formData.append("user_type", "admin");
      formData.append("password", "hmhy@!4321");
      formData.append("picture", picture);

      const { data } = await handlePostRequest(
        `/admin/signup`,
        formData,
        {}
      )(setLoading);
      if (data) return navigation("/user-mangement/user-overview");
    },
  });

  const ChangeProfilePic = async (e: any) => {
    //  png, jpeg, jpg og gif.
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(e.target.value)) {
      toast.error(`
      Kun tillatt filtyper er: png, jpeg, jpg og gif.')
      `);
      e.target.value = "";
      return false;
    }
    setpicture(e.target.files[0]);
  };

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
        path: "/user-mangement/user-overview",
        title: "Brukere",
      },
      {
        isActive: true,
        isSeparator: true,
        path: `/user-mangement/add-new-user`,
        title: " Opprett ny bruker",
      },
    ]);
  }, []);

  return (
    <div className="card mb-5 mb-xl-10">
      <div
        className="card-header border-0 "
        data-bs-toggle="collapse"
        data-bs-target="#kt_account_profile_details"
        aria-expanded="true"
        aria-controls="kt_account_profile_details"
      >
        <div className="card-title m-0">
          <h3 className="fw-bolder m-0">Brukerinnstillinger</h3>
        </div>
      </div>

      <div id="kt_account_profile_details" className="collapse show">
        <form onSubmit={formik.handleSubmit} noValidate className="form">
          <div className="card-body border-top p-9">
            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Profilbilde
              </label>
              <div className="col-lg-8">
                <div
                  className="image-input image-input-outline  w-125px h-125px d-flex 
                align-items-center justify-content-center
                "
                  data-kt-image-input="true"
                >
                  {picture ? (
                    <img
                      className="image-input-wrapper w-125px h-125px p-1"
                      src={URL.createObjectURL(picture)}
                      alt="avatar"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <i
                      className="fa-duotone fa-user-astronaut  fs-90px
                    
                    "
                    />
                  )}

                  <label
                    className="btn-active-color-primary bg-body shadow h-5 w-5"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    aria-label="Change avatar"
                    data-bs-original-title="Change avatar"
                    data-kt-initialized={1}
                    style={{
                      borderRadius: "8px",
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  >
                    <i
                      className="bi bi-pencil-fill fs-7"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                    <input
                      type="file"
                      name="picture"
                      accept=".png, .jpg, .jpeg , .gif .ogg"
                      onChange={(e) => ChangeProfilePic(e)}
                    />
                  </label>
                </div>
                <div>
                  <div className="form-text">
                    Tillatt filtype: jpg, jpeg, png.
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                {" "}
                Navn:{" "}
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-6 fv-row">
                    <input
                      type="text"
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.first_name &&
                            formik.errors.first_name,
                        }
                      )}
                      placeholder="Fornavn"
                      {...formik.getFieldProps("first_name")}
                    />
                  </div>

                  <div className="col-lg-6 fv-row">
                    <input
                      type="text"
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        {
                          "is-invalid":
                            formik.touched.last_name && formik.errors.last_name,
                        }
                      )}
                      placeholder="Etternavn"
                      {...formik.getFieldProps("last_name")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email */}

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                E-post
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  type="email"
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    {
                      "is-invalid": formik.touched.email && formik.errors.email,
                    }
                  )}
                  placeholder="E-post"
                  {...formik.getFieldProps("email")}
                />
              </div>
            </div>

            <div className="row mb-6">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                <span className="">Telefon</span>
              </label>

              <div className="col-lg-8 fv-row">
                <input
                  type="tel"
                  className={clsx(
                    "form-control form-control-lg form-control-solid",
                    {
                      "is-invalid":
                        formik.touched.mobile_number &&
                        formik.errors.mobile_number,
                    }
                  )}
                  placeholder="Telefon"
                  {...formik.getFieldProps("mobile_number")}
                />
              </div>
            </div>

            {/* Roles */}

            <div className="row mb-6">
              <div className="col-lg-8 fv-row" />
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end py-6 px-9">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {!loading && "Fullfør"}
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
        </form>
      </div>
    </div>
  );
};

export { ProfileDetails };
