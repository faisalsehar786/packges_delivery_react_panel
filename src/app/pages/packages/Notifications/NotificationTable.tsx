import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomPagination from "../../../../CustomPagination";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import LoadingContext from "../../../../_metronic/layout/core/Loading";
import { handleGetRequest } from "../../../services";
import moment from "moment";
const TableRow: React.FC<any> = ({ goal, logo }) => {
  const navigation = useNavigate();

  const getLogo = (): string => {
    if (goal?.files?.length > 0) {
      return goal?.files[0]?.path;
    }

    return logo || toAbsoluteUrl("/media/misc/logo-missing.jpeg");
  };

  return (
    <>
      <label
        className="form-check form-check-custom form-check-solid align-items-start p-4"
        style={{
          background: goal?.read ? "#4E5C6C" : "#825EF6",
          borderRadius: 12,
        }}
      >
        <div style={{ border: "2px solid white", padding: 5, borderRadius: 6 }}>
          <i
            className=" bi bi-bell-fill fs-1 mt-1 "
            style={{ color: "#42D3D8" }}
          ></i>
        </div>

        <span
          className="form-check-label d-flex flex-column align-items-start"
          style={{ width: "100%" }}
        >
          <span className="fw-bold fs-5 mb-0 text-white">{goal?.title}</span>
          <span className=" fs-6 " style={{ color: "#eff2f5 " }}>
            {goal?.message}
          </span>
        </span>
        <span className=" fs-6 " style={{ color: "#eff2f5 " }}>
          {moment(goal?.createdAt).format("DD.MM.YYYY")}
        </span>
        {/*end::Label*/}
      </label>

      <div className=" my-3" />
    </>
  );
};

const NotificationTable: React.FC<any> = ({ status, search, hide, logo }) => {
  const [page, setPage] = useState(1);
  const [goals, setGoals] = useState<any>();
  const { setLoading } = useContext(LoadingContext);

  const statusCheck = [
    { label: "All", val: "all" },

    { label: "Deliveries", val: "tender" },
    { label: "Payments", val: "payment" },
    { label: "App Support", val: "app_support" },
    { label: "Admin", val: "admin" },
    { label: "Other", val: "other" },
  ];
  const findStatus = (object: any, statusKey: any) => {
    return object?.find((it: any) => it?.val == statusKey);
  };

  useEffect(() => {
    const getGoals = async () => {
      const params = {
        page,
        limit: 10,
        order: "desc",
        check_cond: true,
        noti_for: "for_admin",
        noti_type: status
          ? findStatus(statusCheck, status)
            ? findStatus(statusCheck, status)?.val
            : "all"
          : "all",
      };

      try {
        const endpoint = "/notification/get_all";
        const { data } = await handleGetRequest(endpoint, { params })(
          setLoading
        );

        markNotificationsRead();

        setGoals(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    getGoals();
  }, [page, status]);

  const markNotificationsRead = async () => {
    try {
      await handleGetRequest(`/notification/markAsRead?noti_for=admin`)(
        setLoading
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="table-responsive scroll-x">
      {goals?.map((goal: any) => (
        <TableRow
          key={goal?._id}
          goal={goal}
          hideOrg={hide?.includes("org")}
          logo={logo}
        />
      ))}

      <div className="row">
        <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start" />
        <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
          <CustomPagination
            className="pagination-bar justify-content-md-end"
            currentPage={page}
            totalCount={goals?.pagination?.totalRecords}
            pageSize={10}
            onPageChange={(page: any) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotificationTable);
