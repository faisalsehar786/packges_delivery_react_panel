import clsx from "clsx";
import { FC, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../../app/modules/auth";
import MasterlayoutContext from "../../../../context/Masterlayout/layoutContext";
import { KTSVG, toAbsoluteUrl } from "../../../helpers";
import { HeaderUserMenu } from "../../../partials";
import { useLayout } from "../../core";

import { handleGetRequest } from "../../../../app/services";

const itemClass = "ms-1 ms-lg-3",
  btnClass =
    "d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary w-30px h-30px w-md-40px h-md-40px border border-gray-300",
  userAvatarClass = "symbol-30px symbol-md-40px";
//  btnIconClass = 'svg-icon-1'

const Topbar: FC = () => {
  const { config } = useLayout();
  const masterlayoutContextRecive = useContext(MasterlayoutContext);
  const [notificationData, setnotificationData] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { successMessageSupport, setsuccessMessageSupport } =
    masterlayoutContextRecive;
  // const {currentUser, logout} = useAuth()
  const { currentUser, setrefreshNotification, refreshNotification } =
    useAuth();
  const getInitials = (firstName = "", lastName = "") => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };
  const fetchData = async () => {
    try {
      setIsFetching(true); // Set fetching status to true when request starts

      const { unread_notifications_count } = await handleGetRequest(
        `/notification//app/unread/count?noti_for=admin`
      )(() => {});

      setnotificationData(unread_notifications_count);
      setFailureCount(0); // Reset failure count on successful fetch
    } catch (error) {
      setError(error?.message);
      setFailureCount((prevCount) => prevCount + 1); // Increment failure count on error
    } finally {
      setIsFetching(false); // Set fetching status to false regardless of success or failure
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Check if not already fetching and failure count is less than 3 before making another request
      if (!isFetching && failureCount < 3) {
        if (currentUser) {
          fetchData();
        }
      } else {
        clearInterval(intervalId); // Stop further requests if conditions are not met
      }
    }, 20000); // Call API every 20 seconds

    // Clean up the interval to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [isFetching, failureCount]); // Dependency array includes isFetching and failureCount

  useEffect(() => {
    if (currentUser) {
      fetchData();
    }
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div className="d-flex align-items-stretch justify-self-end flex-shrink-0">
      {/* Search */}
      <div className={clsx("d-flex align-items-stretch", itemClass)}>
        {/* <Search /> */}
      </div>

      {/* NOTIFICATIONS */}
      <div className={clsx("d-flex align-items-center", itemClass)}>
        {/* begin::Menu- wrapper */}
        {/* <div
          className={clsx(
            "d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary position-relative ",
            btnClass
          )}
          id="kt_notification_toggle"
        >
          <KTSVG
            path="/media/icons/duotune/general/gen007.svg"
            className="svg-icon-dark svg-icon-1"
          />
        </div> */}
        {/* <HeaderNotificationsMenu /> */}
        {/* end::Menu wrapper */}
      </div>

      <div className={clsx("d-flex align-items-center mt-1", itemClass)}>
        <div className="align-items-center">
          <div
            className="fs-7 text-gray-800 text-hover-primary fw-bolder"
            style={{
              lineHeight: "8px",
              textAlign: "end",
              textTransform: "capitalize",
            }}
          >
            {" "}
            {currentUser?.user?.first_name} {currentUser?.user?.last_name}
          </div>
          <div
            className="fs-8 text-muted fw-bold mt-1 float-end"
            style={{
              textTransform: "capitalize",
            }}
          >
            {currentUser?.user?.user_type}
          </div>
        </div>
      </div>
      {/* begin::User */}
      <div
        className={clsx("d-flex align-items-center", itemClass)}
        id="kt_header_user_menu_toggle"
      >
        {/* begin::Toggle */}
        {/* <div className={clsx('cursor-pointer symbol', userAvatarClass)} id='kt_profileMain_toggle'> */}

        {/* <img
          className={clsx(
            'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom p-0',
            btnClass
          )}
          style={{
            borderRadius: '8px',
            height: '50px',
            width: '50px'
          }}
          id='kt_profileMain_toggle'
          src={currentUser?.user?.image || toAbsoluteUrl('/media/avatars/300-1.jpg')}
          alt='metronic'
        /> */}
        {currentUser?.user?.image ? (
          <img
            className="card"
            id="kt_profileMain_toggle"
            style={{
              borderRadius: "8px",
              height: "45px",
              width: "45px",
              marginLeft: "1px",
              marginTop: "-2px",
              cursor: "pointer",
            }}
            alt="Logo"
            src={
              currentUser?.user?.image ||
              toAbsoluteUrl("/media/avatars/300-1.jpg")
            }
          />
        ) : (
          <div
            className="btn btn-icon btn-active-light-primary btn-custom border min-w-auto "
            id="kt_profileMain_toggle"
            style={{ cursor: "pointer" }}
          >
            {getInitials(
              currentUser?.user?.first_name,
              currentUser?.user?.last_name
            )}
          </div>
        )}

        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* Activities */}
      <div className={clsx("d-flex align-items-center", itemClass)}>
        <div
          onClick={() => {
            setrefreshNotification(Math.random());
            // markNotificationsRead();
          }}
          className={clsx("cursor-pointer symbol", userAvatarClass)}
          id="kt_activities_toggle"
        >
          {/* begin::Drawer toggle */}
          <div
            className={clsx(
              "d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom",
              btnClass
            )}
            style={{
              borderRadius: "8px",
            }}
          >
            <i className="fa-duotone fa-bell fs-2"></i>
            {notificationData > 0 ? (
              <span
                className="bullet bullet-dot bg-danger h-10px w-10px position-absolute translate-middle start-50 "
                style={{ top: 5 }}
              ></span>
            ) : null}
          </div>
          {/* end::Drawer toggle */}
        </div>
      </div>
      {/* CHAT */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
      {/* begin::Menu wrapper */}
      {/* <div
          className={clsx(
            'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom position-relative',
            btnClass
          )}
          id='kt_drawer_chat_toggle'
        >
          <KTSVG path='/media/icons/duotune/communication/com012.svg' className={btnIconClass} />

          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div> */}
      {/* end::Menu wrapper */}
      {/* </div> */}

      {/* Quick links */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
      {/* begin::Menu wrapper */}
      {/* <div
          className={clsx('d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom', btnClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <KTSVG path='/media/icons/duotune/general/gen025.svg' className={btnIconClass} />
        </div>
        <QuickLinks /> */}
      {/* end::Menu wrapper */}
      {/* </div> */}

      {/* begin::Aside Toggler */}
      {config.header.left === "menu" && (
        <div
          className="d-flex align-items-center d-lg-none ms-2 me-n3"
          title="Show header menu"
        >
          <div
            className="d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary w-30px h-30px w-md-40px h-md-40px"
            id="kt_header_menu_mobile_toggle"
          >
            <KTSVG
              path="/media/icons/duotune/text/txt001.svg"
              className="svg-icon-1"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Topbar };
