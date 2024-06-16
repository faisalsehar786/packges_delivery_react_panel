import classNames from "classnames";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CustomPagination from "../../../../CustomPagination";
import { numberSpacing, toAbsoluteUrl } from "../../../../_metronic/helpers";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { handleGetRequest } from "../../../services";

const TableRow: React.FC<any> = ({ goal, logo }) => {
  const navigation = useNavigate();

  const getLogo = (): string => {
    if (goal?.files?.length > 0) {
      return goal?.files[0]?.path;
    }

    return logo || toAbsoluteUrl("/media/misc/logo-missing.jpeg");
  };

  return (
    <tr key={goal?._id}>
      <td>
        <div className="d-flex align-items-center">
          <div
            className="img-wrapper me-5 pointer"
            onClick={() => navigation(`/home/published_job/${goal?._id}`)}
          >
            {getLogo() ? (
              <img
                style={{
                  objectFit: "contain",
                }}
                src={getLogo()}
                className="max- align-self-end"
                alt=""
              />
            ) : (
              <i
                className="fa-duotone fa-user-astronaut"
                style={{
                  fontSize: "34px",
                }}
              />
            )}
          </div>
          <div className="d-flex justify-content-start flex-column">
            <Link
              to={`/home/published_job/${goal?._id}`}
              className="text-dark fw-bold text-hover-primary mb-1 fs-6"
            >
              {goal?.title}
            </Link>
            <span className="text-muted fw-semibold d-block">
              {goal?.order?.order_no}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {moment(goal?.pickup_date).format("DD.MM.YYYY")}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {moment(goal?.delivery_date).format("DD.MM.YYYY")}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {goal?.customer_id?.first_name} {goal?.customer_id?.last_name}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {goal?.driver_id?.first_name} {goal?.driver_id?.last_name}
        </span>
      </td>
      <td>
        <span className="text-dark fw-bold d-block mb-1 fs-6">
          {numberSpacing(Number(goal?.total_price))}
        </span>
      </td>
      <td className="text-end">
        <span
          onClick={() => navigation(`/home/published_job/${goal?._id}`)}
          className={classNames("btn btn-sm", {
            "btn-light-primary":
              goal?.order?.order_status === "awaiting_for_payment",
            "btn-light-success": goal?.order?.order_status === "completed",
            "btn-light-dark": goal?.order?.order_status === "payment_done",
            "btn-light-danger": goal?.order?.order_status === "cancel",
            "btn-light-waring": goal?.order?.order_status === "processing",
          })}
        >
          {goal?.order?.order_status === "awaiting_for_payment" &&
            "Ikke betalt"}
          {goal?.order?.order_status === "completed" && "Fullførte"}
          {goal?.order?.order_status === "payment_done" && "Betalte"}
          {goal?.order?.order_status === "cancel" && "Avbrutt"}
          {goal?.order?.order_status === "processing" && "Aktive"}
        </span>
      </td>
    </tr>
  );
};

const TenderTable: React.FC<any> = ({ status, search, hide, logo }) => {
  const [page, setPage] = useState(1);
  const [fetchData, setFetchData] = useState<any>();
  const [limit, setlimit] = useState<any>(10);
  const [sortBy, setsortBy] = useState("created_at");
  const [order, setorder] = useState("DESC");

  const { setLoading } = useContext(LoadingContext);

  const orderStatusCheck = [
    { label: "Betalt", val: "payment_done" },
    { label: "Ikke betalt", val: "awaiting_for_payment" },
    { label: "Aktive", val: "processing" },
    { label: "Fullførte", val: "completed" },
    { label: "Kansellerte", val: "cancel" },
  ];

  const statusCheck = [
    { label: "Aksepterte", val: "accepted" },
    { label: "published", val: "Publiserte" },
  ];
  const findStatus = (object: any, statusKey: any) => {
    return object?.find((it: any) => it?.val == statusKey);
  };
  const handleSort = useCallback(
    (key: string) => {
      if (key === sortBy) {
        setorder((prevOrder) => (prevOrder === "ASC" ? "DESC" : "ASC"));
        setPage(1); // Reset page to 1 upon sorting
      } else {
        setsortBy(key);
        setorder("ASC");
        setPage(1); // Reset page to 1 upon sorting
      }
    },
    [sortBy]
  );

  useEffect(() => {
    const getfetchData = async () => {
      const params = {
        page,
        search,
        sortBy,
        order,
        order_status: status
          ? findStatus(orderStatusCheck, status)
            ? findStatus(orderStatusCheck, status)?.val
            : "all"
          : "all",
        status: status
          ? findStatus(statusCheck, status)
            ? findStatus(statusCheck, status)?.val
            : "all"
          : "all",
      };

      try {
        const endpoint = "/tender/admin_get_all?check_cond=true";
        const resp: { data: any; pagination: any } = await handleGetRequest(
          endpoint,
          {
            params,
          }
        )(setLoading);

        setFetchData(resp);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getfetchData();
  }, [page, search, status, sortBy, order, setLoading]);

  return (
    <div className="table-responsive scroll-x">
      <table className="table align-middle gs-0 gy-4 hoverTable">
        <thead>
          <tr className="fw-bold text-muted bg-light">
            <th
              className="pointer ps-6 rounded-start"
              style={{ width: "30%" }}
              onClick={() => handleSort("title")}
            >
              Navn/sporingsnr
              {sortBy === "title" && (
                <>
                  {order === "ASC" ? (
                    <FaSortUp className="ms-2" />
                  ) : (
                    <FaSortDown className="ms-2" />
                  )}
                </>
              )}
              {sortBy !== "title" && <FaSort className="ms-2" />}
            </th>

            {/* OPPSTART */}
            <th
              className="pointer"
              style={{ width: "10%" }}
              onClick={() => handleSort("pickup_date")}
            >
              Hentedato
              {sortBy === "pickup_date" && (
                <>
                  {order === "ASC" ? (
                    <FaSortUp className="ms-2" />
                  ) : (
                    <FaSortDown className="ms-2" />
                  )}
                </>
              )}
              {sortBy !== "pickup_date" && <FaSort className="ms-2" />}
            </th>

            <th
              className="pointer"
              style={{ width: "12%" }}
              onClick={() => handleSort("delivery_date")}
            >
              leveringsdato
              {sortBy === "delivery_date" && (
                <>
                  {order === "ASC" ? (
                    <FaSortUp className="ms-2" />
                  ) : (
                    <FaSortDown className="ms-2" />
                  )}
                </>
              )}
              {sortBy !== "delivery_date" && <FaSort className="ms-2" />}
            </th>

            <th style={{ width: "12%" }}>Kunde</th>

            <th style={{ width: "12%" }}>Sjåfør</th>
            <th
              className="pointer "
              style={{ width: "10%" }}
              onClick={() => handleSort("total_price")}
            >
              Pris
              {sortBy === "total_price" && (
                <>
                  {order === "ASC" ? (
                    <FaSortUp className="ms-2" />
                  ) : (
                    <FaSortDown className="ms-2" />
                  )}
                </>
              )}
              {sortBy !== "total_price" && <FaSort className="ms-2" />}
            </th>
            <th
              className="pointer text-end rounded-end pe-6"
              style={{ width: "20%" }}
            >
              STATUS
            </th>
          </tr>
        </thead>
        <tbody>
          {fetchData?.data?.map((goal: any) => (
            <TableRow
              key={goal?._id}
              goal={goal}
              hideOrg={hide?.includes("org")}
              logo={logo}
            />
          ))}
        </tbody>
      </table>

      <div className="row">
        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start" />
        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
          <CustomPagination
            className="pagination-bar justify-content-md-end"
            currentPage={page}
            totalCount={
              fetchData?.pagination?.totalRecords
                ? fetchData?.pagination?.totalRecords
                : 0
            }
            pageSize={limit}
            onPageChange={(page: any) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TenderTable);
