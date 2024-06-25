/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useLayout } from "../../core";
import { toAbsoluteUrl } from "../../../helpers";
import { AsideMenu } from "./AsideMenu";
import { AsideSecondary } from "./AsideSecondary";
import { useAuth } from "../../../../app/modules/auth";
import MasterlayoutContext from "../../../../context/Masterlayout/layoutContext";
import { AsideMenuItem } from "./AsideMenuItem";

const AsideDefault: FC = () => {
  const { classes } = useLayout();
  const { currentUser } = useAuth();
  const { logout } = useAuth();
  const masterlayoutContextRecive = useContext(MasterlayoutContext);
  const { subMenueClickReciver } = masterlayoutContextRecive;

  const url = useLocation().pathname;

  useEffect(() => {
    if (url.includes("home")) subMenueClickReciver("Support", true, "support");
    else if (url.includes("user-mangement"))
      subMenueClickReciver("User Management", true, "user-mangement");
  }, [url]);

  return (
    <>
      <div
        id="kt_aside"
        className={clsx("aside bg-white", classes.aside.join(" "))}
        data-kt-drawer="true"
        data-kt-drawer-name="aside"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="auto"
        data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_aside_toggle"
      >
        {/* begin::Logo */}
        <div
          className="aside-logo d-none d-lg-flex flex-column align-items-center flex-column-auto py-4 logo-bottom-boarder"
          id="kt_aside_logo"
        >
          <Link to="/dashboard">
            <img
              src={toAbsoluteUrl("/media/logos/Logo.png")}
              alt="logo"
              className="svg-icon-cufs"
              style={{ width: "36px" }}
            />
          </Link>
        </div>
        {/* end::Logo */}

        {/* begin::Nav */}
        <div
          className="asaside-nav d-flex flex-column align-lg-center flex-column-fluid w-100 pt-5"
          id="kt_aside_nav"
        >
          <AsideMenu asideMenuCSSClasses={classes.asideMenu} />
        </div>
        {/* end::Nav */}

        {/* begin::Footer */}
        <div className="logo-bottom-boarder mb-3"></div>
        <div
          id="kt_aside_menu"
          className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6 "
          data-kt-menu="true"
        >
          {currentUser?.user?.user_type === "admin" && (
            <div
              onClick={() =>
                subMenueClickReciver("user mangement", true, "user-mangement")
              }
            >
              <AsideMenuItem
                fontIcon="fa-duotone fa-users fs-2"
                to="user-mangement/user-overview"
                title=""
                hasparent={false}
                showaside={true}
                displayMenuCondition="user-mangement"
                main="user-mangement"
              />
            </div>
          )}
        </div>
        <div
          className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6 "
          id="kt_aside_footer"
        >
          {/* begin::Menu */}
          <div>
            <div className="mb-2">
              {/* <Link
              to='/user-mangement/user-overview'
              className='btn btm-sm btn-icon btn-color-dark btn-active-color-info btn-active-light customVistedHoverButton'
              // data-kt-menu-trigger='click'
              // data-kt-menu-overflow='true'
              // data-kt-menu-placement='top-start'
              // data-bs-toggle='tooltip'
              // data-bs-placement='right'
              // data-bs-dismiss='click'

              title='User Mangement'
              onClick={() => subMenueClickReciver('user mangement', true, 'user-mangement')}
            >
              <KTSVG
                path='/media/icons/duotune/communication/com006.svg'
                className='svg-icon-cufs'
              />
            </Link> */}
              {/* <Link to='/settings/golbal-settings' 
           onClick={()=>subMenueClickReciver('System settings',true,"settings")}
            type='button'
            className='btn btm-sm btn-icon btn-color-dark btn-active-color-info btn-active-light customVistedHoverButton'
           
            title='System Settings'
          
   
          >
            <KTSVG
              path='/media/icons/duotune/coding/cod001.svg'
              className='svg-icon-cufs'
            />
          </Link> */}
              <div onClick={logout} className="mt-1">
                <AsideMenuItem
                  fontIcon="fa-duotone fa-lock-keyhole fs-2"
                  to=""
                  title=""
                  hasparent={false}
                  showaside={false}
                />
              </div>
            </div>
            {/* end::Menu */}
          </div>
          {/* end::Footer */}
        </div>
        <AsideSecondary></AsideSecondary>
      </div>
    </>
  );
};

export { AsideDefault };
