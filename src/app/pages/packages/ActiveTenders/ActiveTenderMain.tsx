/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useContext } from "react";
import { handleGetRequest } from "../../../services";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { MixedWidget13 } from "../../../../_metronic/partials/widgets/mixed/MixedWidget13";
import ActiveTenderTable from "./ActiveTenderTable";
import ActiveTenderSearch from "./ActiveTenderSearch";
export default function ActiveTenderMain() {
  const [stats, setStats] = useState<any>();
  const { setLoading } = useContext(LoadingContext);
  const [status, setstatus] = useState<any>("accepted");
  const [search] = useState("");
  const getStats = async () => {
    const { data } = await handleGetRequest("/admin/get_admin_stats")(
      setLoading
    );
    setStats(data);
  };
  const statusData = [
    // { label: "All", val: "all" },
    { label: "Active", val: "accepted" },
    // { label: "Published", val: "Published" },
    // { label: "Payment done", val: "payment_done" },
    // { label: "Awaiting for payment", val: "awaiting_for_payment" },
    // { label: "Processing", val: "processing" },
    // { label: 'On the Way', val: 'on_the_way' },
    // { label: "Completed", val: "completed" },
    // { label: "Cancel", val: "cancel" },
  ];
  useEffect(() => {
    getStats();

    return () => {
      setLoading(false);
      setStats(undefined);
    };
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6">
        <h3 className="fw-bolder my-2">Nøkkeltall</h3>
      </div>
      <>
        <div className="row">
          {/* begin::Col */}
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Jobs Total"
              // description='totalt på HYHM plattformen'
              numbertext={stats?.total}
            />
          </div>
          {/* Aktive antall organisasjoner */}
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Jobs on processing"
              // description='totalt på HYHM plattformen'
              numbertext={stats?.order_processing}
            />
          </div>

          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Jobs awaiting for payment"
              // description='totalt fra alle organisasjoner'
              numbertext={stats?.order_awaiting_for_payment}
            />
          </div>
          <div className="col-xl-3 ">
            <MixedWidget13
              className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
              backGroundColor="#ffff"
              chartHeight="60px"
              title="Jobs Payments Done"
              // description='Fra alle customer'
              numbertext={stats?.order_payment_done}
            />
          </div>
        </div>

        <div className="card mb-5 mb-xl-8">
          {/* begin::Header */}
          <div className="card-header border-0  py-5 d-flex align-items-center">
            <h3 className="card-title align-items-start flex-column ">
              <span className="card-label fw-bold fs-3 mb-1">
                Aktive leveringer
              </span>
            </h3>
            <div className="d-flex">
              <div className="w-550px">
                <ActiveTenderSearch />
              </div>
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
            <ActiveTenderTable search={search} status={status} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  );
}
