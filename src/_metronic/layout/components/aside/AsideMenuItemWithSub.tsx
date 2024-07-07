import React, { useState } from "react";
import clsx from "clsx";
import { useLocation } from "react-router";
import { checkIsActive, KTSVG } from "../../../helpers";
import { useLayout } from "../../core";

type Props = {
  to: string;
  title?: string;
  icon?: string;
  fontIcon?: string;
  hasBullet?: boolean;
};

const AsideMenuItemWithSub: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to);
  const { config } = useLayout();
  const { aside } = config;
  const [isActiveAccordOn, setisActiveAccordOn] = useState(false);

  return (
    <div
      className={clsx(
        "menu-item mt-5",
        { "here show": isActive },
        "menu-accordion",
        isActiveAccordOn ? "show" : "show"
      )}
      data-kt-menu-sub="accordion"
      data-kt-menu-trigger="click"
      onClick={() => setisActiveAccordOn(!isActiveAccordOn)}
    >
      {/* <span className='menu-link' style={{cursor: 'auto'}}> */}
      {/* {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && aside.menuIcon === 'svg' && (
          <span className='menu-icon px-2'>
            <KTSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && aside.menuIcon === 'font' && (
          <i className={clsx('px-2 bi fs-3', isActiveAccordOn ? 'text-primary' : '', fontIcon)}></i>
        )}
        <span className='menu-title text-gray-600'>{title}</span> */}
      {/* <span className='menu-arrow'></span> */}
      {/* </span> */}
      <div
        className={clsx("menu-sub menu-sub-accordion", {
          "menu-active-bg": isActive,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { AsideMenuItemWithSub };
