/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import NotificationTable from "./NotificationTable";

export default function NotificationsMain() {
  const [status, setstatus] = useState<any>("accepted");

  const statusData = [
    { label: "All", val: "all" },
    { label: "Deliveries", val: "tender" },
    { label: "Payments", val: "payment" },
    { label: "App Support", val: "app_support" },
    { label: "Admin", val: "admin" },
    { label: "Other", val: "other" },
  ];

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Nøkkeltall</h3>
      </div>
      <>
        <div className="card mb-5 mb-xl-8">
          {/* begin::Header */}
          <div className="card-header border-0  py-5 d-flex align-items-center">
            <h3 className="card-title align-items-start flex-column ">
              <span className="card-label fw-bold fs-3 mb-1">
                Notifications
              </span>
            </h3>
            <div className="d-flex">
              <div className="w-550px"></div>
              <select
                value={status}
                className="form-control selectpicker w-250px card_borderC "
                onChange={(e) => setstatus(e.target.value)}
                style={{ marginLeft: 12 }}
              >
                {statusData?.map((item: any) => (
                  <option value={item?.val}>{item?.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* end::Header */}
          {/* begin::Body */}
          <div className="card-body pt-0 pb-3">
            {/* begin::Table container */}
            <NotificationTable status={status} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  );
}
