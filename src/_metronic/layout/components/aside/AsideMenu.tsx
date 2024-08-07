import React, { useEffect } from "react";
import { useLocation } from "react-router";
import {
  DrawerComponent,
  ToggleComponent,
} from "../../../assets/ts/components";
import { AsideMenuMain } from "./AsideMenuMain";

type Props = {
  asideMenuCSSClasses: string[];
};

const AsideMenu: React.FC<Props> = ({ asideMenuCSSClasses }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(() => {
      DrawerComponent.reinitialization();
      ToggleComponent.reinitialization();
    }, 50);
  }, [pathname]);

  return (
    <div
      id="kt_aside_menu"
      className="menu menu-column menu-title-gray-600 menu-state-primary menu-state-icon-primary menu-state-bullet-primary menu-arrow-gray-500 fw-bold fs-6 "
      data-kt-menu="true"
    >
      <AsideMenuMain />
    </div>
  );
};

export { AsideMenu };
