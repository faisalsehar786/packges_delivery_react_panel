import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import LoadingContext from "../../../_metronic/layout/core/Loading";
import { handleGetRequest } from "../../services";

interface IProps {
  selectedGoal: any;
  selectedUser: any;
}

const TransactionsDrawer: FC<IProps> = ({ selectedGoal, selectedUser }) => {
  const { setLoading } = useContext(LoadingContext);
  const [transactions, setTransactions] = useState<any>([]);
  const [expandedParentIndices, setExpandedParentIndices] = useState<number[]>(
    []
  );

  const getLogo = (organisation: {
    organisation_logo: any;
    organisation_logo_base64: string;
  }): string | undefined => {
    if (organisation?.organisation_logo) {
      return organisation?.organisation_logo;
    }
    if (organisation?.organisation_logo_base64) {
      return `data:image/png;base64,${organisation?.organisation_logo_base64}`;
    }
  };

  const getTransactions = async (year: string) => {
    const res = await handleGetRequest(
      `/admin/transactions_admin_by_goal/${selectedGoal?.goal_id}/${selectedUser}/${year}`
    )(setLoading);
    setTransactions(res);
  };

  const onChange = async (e: any) => {
    const { value } = e.target;
    await getTransactions(value);
  };

  useEffect(() => {
    if (selectedGoal)
      setTimeout(() => {
        getTransactions("2024");
      }, 500);
  }, [selectedGoal, selectedUser]);

  // kt_transaction_close  reset the states
  useEffect(() => {
    const close = document.getElementById("kt_transaction_close");
    if (close) {
      close.addEventListener("click", () => {
        // setTransactions([])
        setExpandedParentIndices([]);
      });
    }
  }, []);

  return (
    <div
      id="kt_transaction"
      data-kt-drawer="true"
      data-kt-drawer-name="notification"
      data-kt-drawer-activate="true"
      data-kt-drawer-overlay="true"
      data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
      data-kt-drawer-direction="end"
      data-kt-drawer-toggle="#kt_transaction_toggle"
      data-kt-drawer-close="#kt_transaction_close"
      className="transaction-drawer"
    >
      <div className="card shadow-none rounded-0 border-none transactions-area">
        <div
          className="card-header  border-0 bg-white"
          id="kt_transaction_header"
          style={{
            flexWrap: "nowrap",
          }}
        >
          <div className="menu-content d-flex align-items-center">
            <div className="symbol symbol-50px me-5">
              <img
                className="card"
                style={{
                  borderRadius: "8px",
                  height: "50px",
                  width: "50px",
                }}
                alt="Logo"
                src={getLogo(selectedGoal)}
              />
            </div>

            <div className="d-flex flex-column">
              <div
                className="fw-bolder d-flex align-items-center fs-5 uppercase
              "
              >
                {selectedGoal?.goal_title.toString().length > 20
                  ? `${selectedGoal?.goal_title.substring(0, 23)}...`
                  : selectedGoal?.goal_title}
                {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
              </div>
              <div
                className="fs-8 text-muted fw-bold mt-0 float-end"
                style={{
                  textTransform: "capitalize",
                }}
              >
                Oppstart:{" "}
                {moment(selectedGoal?.created_at).format("DD.MM.YYYY")}
              </div>

              <a
                href="/"
                className="fw-bold text-muted text-hover-primary fs-7"
              >
                {/* {currentUser ? currentUser?.user?.email : ""} */}
              </a>
            </div>
          </div>

          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-active-light-primary  min-w-auto"
              id="kt_transaction_close"
            >
              <i className="fa-duotone fa-rectangle-xmark svg-icon svg-icon-2 fs-2" />
              {/* <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' /> */}
            </button>
          </div>
        </div>
        <div
          className="top-section position-relative pt-1 "
          id="kt_activities_body"
        >
          <div className="pt-3">
            <div className="separator" />
            <div className=" align-items-center  min-w-350px  py-3 ">
              <div className="">
                <div className="transactions-top ">
                  <div className="blue-card d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <div className="rectangle ">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="38"
                            height="38"
                            rx="7"
                            stroke="#F1F2F9"
                            strokeWidth="2"
                          />
                          <path
                            d="M25.7099 12.2902C25.1109 12.0892 24.4809 12.0002 23.8499 12.0002C22.4599 11.9902 21.1109 12.4502 19.9999 13.2991C19.9099 13.2301 19.7999 13.1691 19.6999 13.1101C19.5999 13.0491 19.4199 12.9002 19.2699 12.8202L18.8899 12.6502C18.6899 12.5402 18.4809 12.4602 18.2599 12.3892C18.2399 12.3702 18.2099 12.3492 18.1699 12.3302H18.1109C17.5199 12.1292 16.9099 12.0192 16.28 12.0002H16.17C15.89 12.0002 15.611 12.0192 15.33 12.0602H15.21C14.91 12.0992 14.611 12.1692 14.321 12.2692C10.59 13.4901 9.26002 17.5401 10.39 21.0801C11.03 22.889 12.061 24.53 13.401 25.879C15.35 27.759 17.4809 29.419 19.7699 30.839L19.7816 30.8462C19.934 30.9406 20.1265 30.9417 20.2799 30.849C22.5609 29.419 24.6799 27.759 26.6108 25.889C27.9598 24.54 28.9898 22.889 29.6198 21.0801C30.7308 17.5401 29.4008 13.4901 25.7099 12.2902Z"
                            fill="#FF4C4C"
                          />
                        </svg>
                      </div>
                      <div className="desc">
                        <div className=" d-flex flex-column justify-content-center">
                          <h5 className="mb-0">Din HYHM:</h5>
                          <span>Gitt hittil via Vipps</span>
                        </div>
                      </div>
                    </div>
                    <div className="amount">{transactions?.received} kr</div>
                  </div>
                  {transactions?.reserved ? (
                    <div className="blue-card d-flex align-items-center justify-content-between mt-4">
                      <div className="d-flex align-items-center">
                        <div className="rectangle-png ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            width="40px"
                            height="40px"
                            viewBox="0 0 300 221"
                            enableBackground="new 0 0 300 221"
                          >
                            {" "}
                            <image
                              id="image0"
                              width="300"
                              height="221"
                              x="0"
                              y="0"
                              href="data:image/png;base64,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 6q4AAAAASUVORK5CYII="
                            />
                          </svg>
                        </div>
                        <div className="desc">
                          <div className=" d-flex flex-column justify-content-center">
                            <h5 className="mb-0">Vipps trekk:</h5>
                            <span>Ikke trukket enda</span>
                          </div>
                        </div>
                      </div>
                      <div className="amount">{transactions?.reserved} kr</div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="blue-card d-flex align-items-center justify-content-between mt-4">
                    <div className="d-flex align-items-center">
                      <div className="rectangle ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="38"
                            height="38"
                            rx="7"
                            stroke="#F1F2F9"
                            strokeWidth="2"
                          />
                          <path
                            d="M16 12C17.5367 12 18.9385 12.5777 20 13.5278C21.0615 12.5777 22.4633 12 24 12C27.3137 12 30 14.6865 30 18.0002C30 24.6815 23.0249 28.5727 20.7255 29.674C20.2624 29.8958 19.7377 29.8958 19.2745 29.674C16.9751 28.5727 10 24.6814 10 18C10 14.6863 12.6863 12 16 12Z"
                            fill="#00B9F2"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15.9723 16.0004C16.3409 15.9902 16.6853 16.1837 16.8682 16.5039L19.9923 21.9709C20.0623 22.0935 20.2339 22.1069 20.3221 21.9966L23.2191 18.3753C23.3968 18.1532 23.6607 18.0173 23.9447 18.0015C24.2287 17.9858 24.506 18.0918 24.7071 18.2929L26.2678 19.8536C26.3615 19.9473 26.4887 20 26.6213 20H30C30.5523 20 31 20.4477 31 21C31 21.5523 30.5523 22 30 22H26C25.7348 22 25.4804 21.8946 25.2929 21.7071L24.2409 20.6551C24.1566 20.5709 24.0178 20.5785 23.9433 20.6716L20.7809 24.6247C20.574 24.8833 20.2525 25.0227 19.9223 24.997C19.5921 24.9712 19.2961 24.7837 19.1318 24.4961L16.2442 19.4429C16.165 19.3042 15.9631 19.3098 15.8917 19.4527L14.8944 21.4472C14.725 21.786 14.3788 22 14 22H10C9.44772 22 9 21.5523 9 21C9 20.4477 9.44772 20 10 20H13.0729C13.2623 20 13.4355 19.893 13.5202 19.7236L15.1056 16.5528C15.2705 16.2229 15.6036 16.0106 15.9723 16.0004Z"
                            fill="#202C38"
                          />
                        </svg>
                      </div>
                      <div className="desc">
                        <div className=" d-flex flex-column justify-content-center">
                          <h5 className="mb-0">Så langt denne uken:</h5>
                          <span>Vippses mandag</span>
                        </div>
                      </div>
                    </div>
                    <div className="amount">{transactions?.pending} kr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-section">
          <div className="filter-area ">
            <div className="desc">
              <h6 className="mb-0">Mine transaksjoner</h6>
              <span>Velg år og uke for å se detaljer </span>
            </div>
            <div className="filter">
              <select
                title="years"
                className="form-select form-select-sm form-select-white w-80px"
                onChange={onChange}
              >
                <option value="2023">2023</option>
                <option value="2024" selected>
                  2024
                </option>
              </select>
            </div>
          </div>

          {transactions?.data?.map((item: any, pIndex: number) => (
            <div className="transactions mb-2" key={item?._id}>
              <div className="transaction-parent">
                <div
                  className={`transaction-card parent  d-flex align-items-center justify-content-between mt-4 ${
                    expandedParentIndices.includes(pIndex) ? "active" : ""
                  }
                        `}
                  // onClick={() => toggleChildTransactions(pIndex)}
                >
                  <div className="d-flex align-items-center">
                    <div className="date-area">
                      <div className="date">Uke</div>
                      <div className="month">{item?.week}</div>
                    </div>

                    <div className="desc">
                      <div>
                        <h5 className="mb-0">
                          {item?.total_transactions} transaksjoner
                        </h5>
                        <span>
                          {/* {item?.goal_title.toString().length > 20
                            ? item?.goal_title.substring(0, 23) + '...'
                            : item?.goal_title} */}

                          {`HYHMbeløp: ${
                            item?.transactions_list?.length > 0
                              ? item?.transactions_list[0]?.support_amount
                              : 0
                          } kr`}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="amount">{item?.week_total_amount} kr</div>
                </div>
              </div>
              {/* {expandedParentIndices.includes(pIndex) &&
                item?.transactions_list.map((transaction: any, childIndex: number) => (
                  <div
                    className={`transaction-child ${
                      childIndex === item?.transactions_list.length - 1 ? 'mb-8' : ''
                    }`}
                    key={transaction?._id}
                  >
                    <div className='transaction-card child d-flex align-items-center justify-content-between mt-2'>
                      <div className='d-flex align-items-center'>
                        <div className='date-area'>
                          <div className='date'>
                            {
                              //only month
                              moment(transaction?.transaction_fetch_date).format('MMM')
                            }
                          </div>
                          <div className='month'>
                            {' '}
                            {
                              //only day
                              moment.utc(transaction?.transaction_fetch_date).format('D')
                            }
                          </div>
                        </div>

                        <div className='desc'>
                          <div>
                            <h5 className='mb-0'>
                              {transaction?.no_of_transactions} transaksjoner
                            </h5>
                            <span>HYHMbelop: {transaction?.support_amount} kr</span>
                          </div>
                        </div>
                      </div>
                      <div className='amount'>{transaction?.amount} kr</div>
                    </div>
                  </div>
                ))} */}
            </div>
          ))}
        </div>
      </div>

      {/* <div className='col-md-12  d-flex justify-content-between p-8'>
          <button type='button' className='btn btn-sm btn-light' id='kt_transaction_close'>
            Avbryt
          </button>

          <button
            disabled={!selectedImage}
            onClick={onUpdate}
            type='submit'
            className='btn btn-sm btn-primary'
          >
            <span className='indicator-label'>Oppdater Jobber</span>
          </button>
        </div> */}
    </div>
  );
};

export { TransactionsDrawer };
