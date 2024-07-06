/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { checkIsActive, KTSVG } from "../../../helpers";
import { useLayout } from "../../core";
import MasterlayoutContext from "../../../../context/Masterlayout/layoutContext";

type Props = {
  to: string;
  title: string;
  icon?: string;
  fontIcon?: string;
  className?: string;
  hasBullet?: boolean;
  bsTitle?: string;
  outside?: boolean;
  hasparent?: boolean;
  showaside?: boolean;
  main?: string;
  svgIconSizeClass?: string;
  displayMenuCondition?: string;
};

const AsideMenuItem: React.FC<Props> = ({
  children,
  to,
  title,
  icon,
  fontIcon,
  className,
  bsTitle,
  outside = false,
  hasBullet = false,
  showaside = false,
  hasparent,
  svgIconSizeClass,
  displayMenuCondition,
  main,
}) => {
  const { pathname } = useLocation();
  const isActive = checkIsActive(pathname, to, main);
  const { config } = useLayout();
  const { aside } = config;

  const masterlayoutContextRecive = useContext(MasterlayoutContext);
  const { subMenueClickReciver } = masterlayoutContextRecive;

  return (
    <>
      {!hasparent ? (
        <div
          onClick={() =>
            subMenueClickReciver(bsTitle, true, displayMenuCondition)
          }
          className={clsx("menu-item", isActive && "here show", className)}
        >
          {outside ? (
            <a
              href={to}
              target="_blank"
              className={clsx(
                "menu-link menu-center",
                { active: isActive },
                hasparent ? "haveparent" : "notparent"
              )}
            >
              {fontIcon && aside.menuIcon === "font" && (
                <span className="menu-icon me-0">
                  <i className={clsx("", fontIcon)}></i>
                </span>
              )}
            </a>
          ) : (
            <>
              <Link
                className={clsx(
                  "menu-link menu-center",
                  { active: isActive },
                  hasparent ? "haveparent" : "notparent"
                )}
                to={to}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-dismiss="click"
                data-bs-placement="right"
                data-bs-original-title={bsTitle}
              >
                {hasBullet && (
                  <span className="menu-bullet">
                    <span className="bullet bullet-dot"></span>
                  </span>
                )}
                {icon && (
                  <span className="menu-icon">
                    <KTSVG
                      path={icon}
                      className={clsx(
                        svgIconSizeClass ? "" : "svg-icon-cufs",
                        svgIconSizeClass
                      )}
                    />
                  </span>
                )}
                {fontIcon ? (
                  <>
                    <span className="menu-icon">
                      <i className={clsx("", fontIcon)}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                  </>
                ) : (
                  <span className="menu-title">{title}</span>
                )}
              </Link>
              {children}
            </>
          )}
        </div>
      ) : (
        <div
          onClick={() =>
            subMenueClickReciver(bsTitle, true, displayMenuCondition)
          }
          className={clsx("menu-item", isActive && "here show", className)}
        >
          {outside ? (
            <a
              href={to}
              target="_blank"
              className={clsx(
                "menu-link menu-center",
                { active: isActive },
                hasparent ? "haveparent" : "notparent"
              )}
            >
              {fontIcon && aside.menuIcon === "font" && (
                <span className="menu-icon me-0">
                  <i className={clsx("", fontIcon)}></i>
                </span>
              )}
            </a>
          ) : (
            <>
              <Link
                className={clsx(
                  "menu-link menu-center",
                  { active: isActive },
                  hasparent ? "haveparent" : "notparent"
                )}
                to={to}
                data-bs-toggle="tooltip"
                data-bs-trigger="hover"
                data-bs-dismiss="click"
                data-bs-placement="right"
                data-bs-original-title={bsTitle}
              >
                {hasBullet && (
                  <span className="menu-bullet">
                    <span className="bullet bullet-dot"></span>
                  </span>
                )}
                {icon && (
                  <span className="menu-icon">
                    <KTSVG
                      path={icon}
                      className={clsx(
                        svgIconSizeClass ? "" : "svg-icon-cufs",
                        svgIconSizeClass
                      )}
                    />
                  </span>
                )}
                {fontIcon ? (
                  <>
                    <span className="menu-icon">
                      <i className={clsx("", fontIcon)}></i>
                    </span>
                    <span className="menu-title">{title}</span>
                  </>
                ) : (
                  <span className="menu-title">{title}</span>
                )}
              </Link>
              {children}
            </>
          )}
        </div>
      )}
    </>
  );
};

export { AsideMenuItem };
