import ApexCharts, { ApexOptions } from "apexcharts";
import React, { ReactNode, useEffect, useRef } from "react";
import { getCSSVariableValue } from "../../../assets/ts/_utils";
import { numberSpacing } from "../../../helpers";

type Props = {
  className: string;
  chartHeight: string;
  backGroundColor: string;
  title?: ReactNode;
  description?: ReactNode;
  numbertext?: string;
  hideChart?: boolean;
};

const MixedWidget13: React.FC<Props> = ({
  className,
  backGroundColor,
  chartHeight,
  title,
  description,
  numbertext,
  hideChart = false,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight));
    if (chart) {
      chart.render();
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef]);

  return (
    <div
      className={`card ${className}`}
      style={{ backgroundColor: "rgb(130 94 246 / 42%)" }}
    >
      {/* begin::Body */}
      <div className="card-body d-flex flex-column">
        {/* begin::Wrapper */}
        <div className="d-flex flex-column flex-grow-1">
          {/* begin::Title                    */}
          <span className="text-dark  fw-bolder fs-3">{title}</span>
          <p className="text-muted mt-1 fw-bold fs-6">{description}</p>
          {/* end::Title */}
          {!hideChart && (
            <div
              ref={chartRef}
              className="mixed-widget-13-chart"
              style={{
                height: chartHeight,
                minHeight: chartHeight,
                width: "100%",
              }}
            ></div>
          )}
        </div>
        {/* end::Wrapper */}

        {/* begin::Stats */}
        <div className="pt-5">
          {/* begin::Symbol */}
          {/* <span className='text-dark fw-bolder fs-2x lh-0'>$</span> */}
          {/* end::Symbol */}

          {/* begin::Number */}
          <span className="text-dark fw-bolder fs-3x me-2 lh-0">
            {numberSpacing(numbertext)}
          </span>
          {/* end::Number */}

          {/* begin::Text */}
          {/* <span className='text-dark fw-bolder fs-6 lh-0'>+ 28% this week</span> */}
          {/* end::Text */}
        </div>
        {/* end::Stats */}
      </div>
    </div>
  );
};

const chartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const strokeColor = getCSSVariableValue("--bs-gray-300") as string;

  return {
    series: [
      {
        name: "SR1",
        data: [15, 25, 15, 40, 20, 50],
      },
    ],
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    chart: {
      fontFamily: "inherit",
      type: "area",
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    // showTooltips: false,
    // hover: {mode: null},
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [20, 120, 120, 120],
      },
    },
    stroke: {
      curve: "smooth",
      show: true,
      width: 3,
      colors: ["#181C32"],
    },
    xaxis: {
      categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
      crosshairs: {
        show: false,
        position: "front",
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      min: 0,
      max: 60,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    // states: {
    //   normal: {
    //     filter: {
    //       type: 'none',
    //       value: 0,
    //     },
    //   },
    //   hover: {
    //     filter: {
    //       type: 'none',
    //       value: 0,
    //     },
    //   },
    //   active: {
    //     allowMultipleDataPointsSelection: false,
    //     filter: {
    //       type: 'none',
    //       value: 0,
    //     },
    //   },
    // },
    // tooltip: {
    //   show: false
    // },
    colors: ["#ffffff"],
    markers: {
      colors: [labelColor],
      // strokeColor: [strokeColor],
      strokeWidth: 3,
    },
  };
};

export { MixedWidget13 };
