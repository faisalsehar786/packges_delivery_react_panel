import React from "react";
import moment from "moment";
export default function Tenderdetails1(props: any) {
  const { fhData, title } = props;
  const dataFilter = [
    { label: "Se alle", val: "all" },
    { label: "Betaling gjennomført", val: "payment_done" },
    { label: "Venter på betaling", val: "awaiting_for_payment" },
    { label: "Behandling", val: "processing" },
    { label: "Fullført", val: "completed" },
    { label: "venter på godkjenning", val: "awaiting_for_approval" },
    { label: "Avbryt", val: "cancel" },
    { label: "Aktiv", val: "accepted" },
    { label: "publisert", val: "published" },
    { label: "utkast", val: "draft" },
    { label: "stigende", val: "asc" },
    { label: "synkende", val: "desc" },
  ];
  return (
    <div className="card mb-5 mb-xl-10" id="kt_profile_details_view">
      {/*begin::Card header*/}
      <div className="card-header cursor-pointer">
        {/*begin::Card title*/}
        <div className="card-title m-0">
          <h3 className="fw-bold m-0">{title}</h3>
        </div>
        {/*end::Card title*/}
        {/*begin::Action*/}

        {/*end::Action*/}
      </div>
      {/*begin::Card header*/}
      {/*begin::Card body*/}
      <div className="card-body p-9">
        {/*begin::Row*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Navn</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-bold fs-6 text-gray-800">{fhData?.title}</span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Row*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Sendes innen
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <span className="fw-semibold text-gray-800 fs-6">
              {moment(fhData?.pickup_date).format("DD.MM.YYYY hh:mm")}
            </span>
          </div>
          {/*end::Col*/}
        </div>
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Leveres innen{" "}
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <span className="fw-semibold text-gray-800 fs-6">
              {moment(fhData?.delivery_date).format("DD.MM.YYYY hh:mm")}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Avsender adresse{" "}
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <span className="fw-semibold text-gray-800 fs-6">
              {fhData?.location_from?.address}
            </span>
            <div style={{ width: 400, height: 300 }}>
              <iframe
                src={`https://maps.google.com/maps?q=${fhData?.location_from?.coordinates
                  ?.reverse()
                  .toString()}&z=15&output=embed`}
                width={360}
                height={270}
                style={{ border: 0 }}
              />
            </div>
          </div>
          {/*end::Col*/}
        </div>

        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Mottaker adresse{" "}
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 fv-row">
            <span className="fw-semibold text-gray-800 fs-6">
              {fhData?.location_to?.address}
            </span>
            <div style={{ width: 400, height: 300 }}>
              <iframe
                src={`https://maps.google.com/maps?q=${fhData?.location_to?.coordinates
                  ?.reverse()
                  .toString()}&z=15&output=embed`}
                width={360}
                height={270}
                style={{ border: 0 }}
              />
            </div>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Sporings ID
            <span
              className="ms-1"
              data-bs-toggle="tooltip"
              aria-label="Phone number must be active"
              data-bs-original-title="Phone number must be active"
              data-kt-initialized={1}
            >
              <i className="ki-duotone ki-information fs-7">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>{" "}
            </span>
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 d-flex align-items-center">
            <span className="fw-bold fs-6 text-success me-2">
              {fhData?.order?.order_no}
            </span>
            <span className="badge badge-success">Verifisert</span>
          </div>
          {/*end::Col*/}
        </div>

        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Nåværende plassering
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-semibold text-danger fs-6">
              {fhData?.order?.order_current_location?.order_address}
            </span>
            <div style={{ width: 400, height: 300 }}>
              <iframe
                src={`https://maps.google.com/maps?q=${fhData?.order?.order_current_location?.coordinates
                  ?.reverse()
                  .toString()}&z=15&output=embed`}
                width={360}
                height={270}
                style={{ border: 0 }}
              />
            </div>
          </div>
          {/*end::Col*/}
        </div>

        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Frakt pris</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-semibold text-gray-800 fs-6">
              {fhData?.total_price}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Mottaker detaljer
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-semibold text-gray-800 fs-6">
              {fhData?.deliver_to_details}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">Beskrivelse</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8">
            <span className="fw-semibold text-gray-800 fs-6">
              {fhData?.description}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        {/* <div className="row mb-7">
       
          <label className="col-lg-4 fw-semibold text-muted">
            Status
            <span
              className="ms-1"
              data-bs-toggle="tooltip"
              aria-label="Phone number must be active"
              data-bs-original-title="Phone number must be active"
              data-kt-initialized={1}
            >
              <i className="ki-duotone ki-information fs-7">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>
            </span>
          </label>
      
          <div className="col-lg-8 d-flex align-items-center">
            <span className="badge badge-success">
          
              {fhData?.tender_status}
            </span>
          </div>
         
        </div> */}
        <div className="row mb-7">
          {/*begin::Label*/}
          <label className="col-lg-4 fw-semibold text-muted">
            Status
            <span
              className="ms-1"
              data-bs-toggle="tooltip"
              aria-label="Phone number must be active"
              data-bs-original-title="Phone number must be active"
              data-kt-initialized={1}
            >
              <i className="ki-duotone ki-information fs-7">
                <span className="path1" />
                <span className="path2" />
                <span className="path3" />
              </i>{" "}
            </span>
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className="col-lg-8 d-flex align-items-center">
            <span className="badge badge-success">
              {" "}
              {
                dataFilter.find(
                  (item) => item.val === fhData?.order?.order_status
                )?.label
              }
            </span>
          </div>
          {/*end::Col*/}
        </div>
      </div>
      {/*end::Card body*/}
    </div>
  );
}
