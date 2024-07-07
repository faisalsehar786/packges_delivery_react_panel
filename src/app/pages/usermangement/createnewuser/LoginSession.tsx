import React from "react";
import { Link } from "react-router-dom";

const LoginSession: React.FC = () => {
  return (
    <div className="card mb-5 mb-lg-10">
      <div className="card-header">
        <div className="card-title">
          <h3>Login Sessions</h3>
        </div>
        <div className="card-toolbar">
          <div className="my-1 me-4">
            <select
              className="form-select form-select-sm form-select-solid w-125px select2-hidden-accessible"
              data-control="select2"
              data-placeholder="Select Hours"
              data-hide-search="true"
              data-select2-id="select2-data-7-yzp6"
              tabIndex={-1}
              aria-hidden="true"
            >
              <option value={1} data-select2-id="select2-data-9-jc5s">
                1 Hours
              </option>
              <option value={2} data-select2-id="select2-data-119-89pd">
                6 Hours
              </option>
              <option value={3} data-select2-id="select2-data-120-184x">
                12 Hours
              </option>
              <option value={4} data-select2-id="select2-data-121-g5ry">
                24 Hours
              </option>
            </select>
          </div>
          <Link to="#" className="btn btn-sm btn-primary my-1">
            View All
          </Link>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-flush align-middle table-row-bordered table-row-solid gy-4 gs-9">
            <thead className="border-gray-200 fs-5 fw-bold bg-lighten">
              <tr>
                <th className="min-w-250px">Location</th>
                <th className="min-w-100px">Status</th>
                <th className="min-w-150px">Device</th>
                <th className="min-w-150px">IP Address</th>
              </tr>
            </thead>
            <tbody className="fw-6 fw-bold text-gray-600">
              <tr>
                <td>
                  <Link to="#" className="text-hover-primary text-gray-600">
                    USA(5)
                  </Link>
                </td>
                <td>
                  <span className="badge badge-light-success fs-7 fw-bolder">
                    OK
                  </span>
                </td>
                <td>Chrome - Windows</td>
                <td>236.125.56.78</td>
              </tr>
              <tr>
                <td>
                  <Link to="#" className="text-hover-primary text-gray-600">
                    United Kingdom(10)
                  </Link>
                </td>
                <td>
                  <span className="badge badge-light-success fs-7 fw-bolder">
                    OK
                  </span>
                </td>
                <td>Safari - Mac OS</td>
                <td>236.125.56.78</td>
              </tr>
              <tr>
                <td>
                  <Link to="#" className="text-hover-primary text-gray-600">
                    Norway(-)
                  </Link>
                </td>
                <td>
                  <span className="badge badge-light-danger fs-7 fw-bolder">
                    ERR
                  </span>
                </td>
                <td>Firefox - Windows</td>
                <td>236.125.56.10</td>
              </tr>
              <tr>
                <td>
                  <Link to="#" className="text-hover-primary text-gray-600">
                    Japan(112)
                  </Link>
                </td>
                <td>
                  <span className="badge badge-light-success fs-7 fw-bolder">
                    OK
                  </span>
                </td>
                <td>iOS - iPhone Pro</td>
                <td>236.125.56.54</td>
              </tr>
              <tr>
                <td>
                  <Link to="#" className="text-hover-primary text-gray-600">
                    Italy(5)
                  </Link>
                </td>
                <td>
                  <span className="badge badge-light-warning fs-7 fw-bolder">
                    WRN
                  </span>
                </td>
                <td>Samsung Noted 5- Android</td>
                <td>236.100.56.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export { LoginSession };
