import { useState } from "react";
import NotificationTable from "../packages/Notifications/NotificationTable";
import { KTSVG } from "../../../_metronic/helpers";
import { useAuth } from "../../modules/auth";

const NotificationDrawerMain = () => {
  const { refreshNotification } = useAuth();
  console.log(refreshNotification);

  const [status, setstatus] = useState<any>("all");

  const statusData = [
    { label: "All", val: "all" },
    { label: "Deliveries", val: "tender" },
    { label: "Payments", val: "payment" },
    { label: "App Support", val: "app_support" },
    { label: "Admin", val: "admin" },
    { label: "Other", val: "other" },
  ];

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
              <KTSVG
                path="/media/icons/duotune/general/gen007.svg"
                className="svg-icon-dark svg-icon-1"
              />
            </div>

            <div className="ms-4">
              <h3 className="fs-5 fw-bolder text-gray-900 mb-0">Varsler</h3>
              <span className="fw-bold fs-7 text-gray-400">
                Siste varslinger
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
                    <div className=" align-items-center  min-w-700px   ">
                      <div className="mb-2">
                        <div className="d-flex justify-content-end">
                          <select
                            value={status}
                            className="form-control selectpicker w-250px card_borderC "
                            onChange={(e) => setstatus(e.target.value)}
                          >
                            {statusData?.map((item: any) => (
                              <option value={item?.val}>{item?.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <NotificationTable
                        status={status}
                        refreshDataToggle={refreshNotification}
                      />
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

export { NotificationDrawerMain };
