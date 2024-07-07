/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import BreadcrumbsContext from "../../../../_metronic/layout/core/Breadcrumbs";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { MixedWidget13 } from "../../../../_metronic/partials/widgets/mixed/MixedWidget13";
import { handleGetRequest } from "../../../services";

export default function OversiktMain() {
  const [stats, setStats] = useState<any>();
  const [statsApp, setStatsApp] = useState<any>();
  const { setLoading } = useContext(LoadingContext);
  const { setBreadcrumbs } = useContext(BreadcrumbsContext);

  const getAppStats = async () => {
    const { data } = await handleGetRequest("/admin/get_app_users_stats")(
      setLoading
    );
    setStatsApp(data);
  };
  const getStats = async () => {
    const { data } = await handleGetRequest("/admin/get_admin_stats")(
      setLoading
    );

    setStats(data);
  };

  useEffect(() => {
    getStats();
    getAppStats();
    setBreadcrumbs([
      {
        isActive: false,
        isSeparator: false,
        path: "/home/oversikt",
        title: "Home",
      },
      {
        isActive: false,
        isSeparator: false,
        path: "/home/oversikt",
        title: "HmHy",
      },
      {
        isActive: true,
        isSeparator: false,
        path: "/home/oversikt",
        title: "Oversikt",
      },
    ]);
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap flex-stack mb-6 ">
        <h3 className="fw-bolder my-2">Oversikt</h3>
      </div>

      <div className="row overview gap-2">
        {/* First row */}
        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Antall app brukere"
          // description='Fra alle customer'
          numbertext={statsApp?.totalUsers}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Antall sjåfører"
          // description='Til alle organisasjoner'
          numbertext={statsApp?.totalUsersDriver}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Antall sluttbrukere"
          // description='Fra alle customer'
          numbertext={statsApp?.totalUsersCustomer}
        />
      </div>
      <div className="row overview gap-2 mt-4">
        {/* First row */}

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Totalt betalt av kunde"
          // description='Til alle organisasjoner'
          numbertext={stats?.customer_total_payment_paid}
        />
        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Sum utestående betalinger fra kunde"
          // description='Til alle organisasjoner'
          numbertext={stats?.customer_total_payment_unpaid}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Sjåfør Inntjening "
          // description='Til HmHy'
          numbertext={stats?.driver_total_earning}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="HMHY Inntjening"
          // description='Til HmHy'
          numbertext={stats?.platform_total_earning}
        />
      </div>
      <div className="row overview gap-2 mt-4">
        {/* First row */}
        <div className="col-lg-5">
          <MixedWidget13
            className="card-xl-stretch  card_borderC col"
            backGroundColor="#ffff"
            chartHeight="60px"
            title="Antall sendinger"
            // description='Til HmHy'
            numbertext={stats?.total}
          />
        </div>

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title=" Betalte sendinger"
          // description='Til alle organisasjoner'
          numbertext={stats?.customer_order_payment_done}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Sendinger klare for betaling "
          // description='Til HmHy'
          numbertext={stats?.customer_order_awaiting_for_payment}
        />
      </div>
      <div className="row overview gap-2 mt-4">
        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Aktive sendinger"
          // description='Til HmHy'
          numbertext={stats?.customer_order_processing}
        />

        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Venter på godkjenning sendinger"
          // description='Til HmHy'
          numbertext={stats?.customer_awaiting_for_approval}
        />
        <MixedWidget13
          className="card-xl-stretch  card_borderC col"
          backGroundColor="#ffff"
          chartHeight="60px"
          title="Fullførte sendinger"
          // description='Til HmHy'
          numbertext={stats?.customer_order_completed}
        />
      </div>
    </>
  );
}
