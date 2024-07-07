/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import BreadcrumbsContext from "../../../../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { MixedWidget13 } from "../../../../_metronic/partials/widgets/mixed/MixedWidget13";
import { handleGetRequest } from "../../../services";
import TenderTable from "./TenderTable";
import TenderSearch from "./TenderSearch";
import moment from "moment";
export default function TenderMain() {
  const [stats, setStats] = useState<any>();
  const { setLoading } = useContext(LoadingContext);
  const [search] = useState("");
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);
  const [status, setstatus] = useState<any>("all");
  const [startDate, setStartDate] = useState(
    `${moment().format("YYYY-MM-DD")}`
  );

  const getStats = async () => {
    const { data } = await handleGetRequest("/admin/get_admin_stats")(
      setLoading
    );
    setStats(data);
  };

  useEffect(() => {
    getStats();
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
        path: "/home/formal",
        title: "HmHy",
      },
      {
        isActive: true,
        isSeparator: false,
        path: "/home/formal",
        title: "Jobber",
      },
    ]);
  }, []);

  const statusData = [
    { label: "Alle", val: "all" },
    { label: "Aksepterte", val: "accepted" },
    { label: "Publiserte", val: "Publiserte" },
    { label: "Betalt", val: "payment_done" },
    { label: "Ikke betalt", val: "awaiting_for_payment" },
    { label: "Aktive", val: "processing" },
    // { label: 'On the Way', val: 'on_the_way' },
    { label: "Fullførte", val: "completed" },
    { label: "Kansellerte", val: "cancel" },
  ];

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Nøkkeltall</h3>

        <div className="d-flex flex-wrap my-2">
          <div className="me-4">
            {/* <button className='btn btn-primary' disabled={true}>
              Oversikt Jobber
            </button> */}
          </div>
          {/* <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a> */}
          {/* begin::Menu */}
          {/* <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
            data-kt-menu='true'
          > */}
          {/* begin::Menu item */}
          {/* <div className='menu-item px-3'>
              <a className='menu-link px-3'>30 Days</a>
            </div> */}
          {/* end::Menu item */}

          {/* begin::Menu item */}
          {/* <div className='menu-item px-3'>
              <a className='menu-link px-3'>90 Days</a>
            </div> */}
          {/* end::Menu item */}
          {/* </div> */}
          {/* end::Menu */}
        </div>
      </div>
      <>
        <div className="row">
          {/* begin::Col */}
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Antall sendinger"
              // description='totalt fra alle organisasjoner'
              numbertext={stats?.total}
            />
          </div>

          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Sendinger klare for betaling"
              // description='totalt fra alle organisasjoner'
              numbertext={stats?.customer_order_awaiting_for_payment}
            />
          </div>
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Aktive sendinger"
              // description='Aktive sendinger'
              numbertext={stats?.customer_order_processing}
            />
          </div>
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="sendinger Fullførte"
              // description='sendinger Fullførte '
              numbertext={stats?.customer_order_completed}
            />
          </div>
        </div>

        <div className="card mb-5 mb-xl-8">
          {/* begin::Header */}
          <div className="card-header border-0 py-5 d-flex align-items-center">
            <h3 className="card-title align-items-start flex-column ">
              <span className="card-label fw-bold fs-3 mb-1">
                {" "}
                Oversikt sendinger
              </span>
            </h3>
            <div className="d-flex">
              <div className="w-550px ">
                <TenderSearch status={status} />
              </div>

              {/* <input
                type="date"
                className="form-control w-25"
                value={startDate}
                onChange={(e: any) => setStartDate(e.target.value)}
              ></input> */}

              <select
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
            <TenderTable search={search} status={status} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  );
}
