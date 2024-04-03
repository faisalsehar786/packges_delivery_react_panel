/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useContext } from "react";
import { handleGetRequest } from "../../../services";
import LoadingContext from "../../../../_metronic/layout/core/Loading";

import { MixedWidget13 } from "../../../../_metronic/partials/widgets/mixed/MixedWidget13";
import AppUserTable from "./AppUserTable";
import AppUserSearch from "./AppUserSearch";
import { Link } from "react-router-dom";

export default function AppUserMain() {
  const [stats, setStats] = useState<any>();
  const [role, setRole] = useState<any>("all");
  const [statsuser, setStatsUser] = useState<any>();
  const { setLoading } = useContext(LoadingContext);

  const getStatsUserApp = async () => {
    const { data } = await handleGetRequest("/admin/get_app_users_stats")(
      setLoading
    );
    setStatsUser(data);
  };

  const getStats = async () => {
    const { data } = await handleGetRequest("/admin/get_admin_stats")(
      setLoading
    );
    setStats(data);
  };

  useEffect(() => {
    getStats();
    getStatsUserApp();

    return () => {
      setLoading(false);
      setStats(undefined);
    };
  }, []);

  const statusData = [
    { label: "All", val: "all" },
    { label: "driver", val: "driver" },
    { label: "customer", val: "customer" },
  ];

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Key figures</h3>

        <div className="d-flex flex-wrap my-2">
          <div className="">
            <Link to="/home/app-users/create" className="btn btn-primary">
              <i className="bi bi-person-plus-fill iconbtnStylecx  me-2" />
              Oversikt brukere
            </Link>
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
          <div
            className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4"
            data-kt-menu="true"
          >
            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <a className="menu-link px-3">30 Days</a>
            </div>
            {/* end::Menu item */}

            {/* begin::Menu item */}
            <div className="menu-item px-3">
              <a className="menu-link px-3">90 Days</a>
            </div>
            {/* end::Menu item */}
          </div>
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
              title="Total App Users "
              // description='totalt på HYHM plattformen'
              numbertext={statsuser?.total}
            />
          </div>
          {/* Aktive antall organisasjoner */}
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Total Drivers"
              // description='totalt på HYHM plattformen'
              numbertext={statsuser?.user_type_driver_count}
            />
          </div>

          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Total Customer"
              // description='totalt fra alle organisasjoner'
              numbertext={statsuser?.user_type_customer_count}
            />
          </div>
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Drivers Accepted Jobs"
              // description='Fra alle customer'
              numbertext={stats?.driver_order_accepted}
            />
          </div>
        </div>

        <div className="card mb-5 mb-xl-8">
          {/* begin::Header */}
          <div className="card-header border-0  py-5 d-flex align-items-center">
            <h3 className="card-title align-items-start flex-column ">
              <span className="card-label fw-bold fs-3 mb-1">Sluttbrukere</span>
            </h3>

            <div className="d-flex">
              <div className="w-550px">
                <AppUserSearch />
              </div>
              <select
                value={role}
                className="form-control selectpicker w-250px card_borderC "
                onChange={(e) => setRole(e.target.value)}
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
            <AppUserTable role={role} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  );
}
