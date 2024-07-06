import { FC, useContext, useEffect } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLayout } from "../../../core/LayoutProvider";
import { usePageData } from "../../../core/PageData";
import BreadcrumbsContext from "../../../core/Breadcrumbs";

const DefaultTitle: FC = () => {
  const { pageTitle, pageDescription, pageBreadcrumbs } = usePageData();
  const { breadcrumbs } = useContext(BreadcrumbsContext);
  const { config } = useLayout();

  useEffect(() => {
    let getTitleOfPage = "HmHy";
    breadcrumbs.map((item, index) => {
      if (!item.isSeparator && !item.isActive) {
        getTitleOfPage = item?.title;
      } else {
        getTitleOfPage = item?.title;
      }
    });

    document.title = `HmHy - ${getTitleOfPage}`;
  }, [breadcrumbs]);

  return (
    <div
      // data-kt-swapper='true'
      // data-kt-swapper-mode='prepend'
      // data-kt-swapper-parent="{default: '#kt_content_container', lg: '#kt_header_wrapper'}"
      className="page-title d-flex flex-column align-items-start justify-content-center flex-wrap me-lg-20 pb-2 pb-lg-0"
    >
      {/* begin::Heading */}
      {pageTitle && (
        <h1 className="text-dark fw-bolder my-1 fs-4 lh-1">
          {/* {pageTitle} */}
          HmHy
          {pageDescription &&
            config.pageTitle &&
            config.pageTitle.description && (
              <small className="text-muted fs-6 fw-normal ms-1">
                {pageDescription}
              </small>
            )}
        </h1>
      )}
      {/* end::Heading */}

      {breadcrumbs && breadcrumbs.length > 0 && (
        <ul className="breadcrumb breadcrumb-line fs-6 fw-bold">
          {Array.from(breadcrumbs).map((item, index) => (
            <>
              {!item.isSeparator && !item.isActive ? (
                <li
                  className={clsx("breadcrumb-item", {
                    "text-muted": !item.isSeparator && !item.isActive,
                  })}
                  key={`${item.path}${index}`}
                >
                  <Link className="text-muted" to={item.path}>
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li className="breadcrumb-item text-dark">{item.title}</li>
              )}
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export { DefaultTitle };
