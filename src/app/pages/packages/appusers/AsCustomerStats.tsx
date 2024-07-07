import { useContext, useEffect, useState } from "react";
import { handleGetRequest } from "../../../services";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { MixedWidget13 } from "../../../../_metronic/partials/widgets";
export default function AsCustomerStats(props: any) {
  const { setLoading } = useContext(LoadingContext);
  const { id, title } = props;
  const [statsuser, setstatsuser] = useState<any>();
  const getOrgDetails = async () => {
    if (id) {
      const { data } = await handleGetRequest(
        `/admin/detail_profile?user_id=${id}`
      )(setLoading);

      if (data) setstatsuser(data?.stats);
    }
  };
  useEffect(() => {
    getOrgDetails();
  }, [id]);

  return (
    <>
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
          <div className="row">
            {/* begin::Col */}
            <div className="col-xl-12">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Totalt betalte betalinger"
                // description='Fra alle customer'
                numbertext={statsuser?.customer_total_payment_paid}
              />
            </div>
            <div className="col-xl-6 ">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Antall sendinger"
                // description='totalt på HYHM plattformen'
                numbertext={statsuser?.total}
              />
            </div>
            {/* Aktive antall organisasjoner */}
            <div className="col-xl-6 ">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Aktive"
                // description='totalt på HYHM plattformen'
                numbertext={statsuser?.customer_active_tender}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Venter betaling "
                // description='totalt fra alle organisasjoner'
                numbertext={statsuser?.customer_order_awaiting_for_payment}
              />
            </div>
            <div className="col-xl-6">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Betaling gjennomført
  "
                // description='Fra alle customer'
                numbertext={statsuser?.customer_order_payment_done}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Behandling "
                // description='Fra alle customer'
                numbertext={statsuser?.customer_order_processing}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <MixedWidget13
                className="card-xl-stretch mb-xl-10 card_borderC min-h-240px"
                backGroundColor="#ffff"
                chartHeight="60px"
                title="Kansellert "
                // description='Fra alle customer'
                numbertext={statsuser?.customer_order_completed}
              />
            </div>
          </div>
        </div>
        {/*end::Card body*/}
      </div>
    </>
  );
}
