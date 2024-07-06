import React from "react";
export default function TenderVariations(props: any) {
  const { fhData, title } = props;
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
        <div className="row g-6 g-xl-9 mb-6 mb-xl-9">
          {/*begin::Col*/}

          {fhData?.map((item: any) => (
            <div className="col-md-12 col-lg-12 col-xl-12" key={item?._id}>
              {/*begin::Card*/}
              <div className="card p-3">
                <label className="fw-bold fs-6">
                  {" "}
                  Detalj: {item?.text ? item?.text : ""}{" "}
                </label>
                <label className="fw-bold fs-6">vekt: {item?.weight} kg</label>
                <label className="fw-bold fs-6">
                  {" "}
                  bredde: {item?.width} cm
                </label>
                <label className="fw-bold fs-6">
                  {" "}
                  høyde: {item?.height} cm
                </label>
              </div>
              {/*end::Card*/}
            </div>
          ))}

          {/*end::Col*/}
        </div>
      </div>
      {/*end::Card body*/}
    </div>
  );
}
