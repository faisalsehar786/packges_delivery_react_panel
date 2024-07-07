import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CustomPagination from "../../../../../../CustomPagination";
import { KTCardBody } from "../../../../../../_metronic/helpers";
import LoadingContext from "../../../../../../_metronic/layout/core/Loading";
import { handleDeleteRequest, handleGetRequest } from "../../../../../services";
import { useAuth } from "../../../../auth";

interface UserList {
  communication: string;
  company: string;
  created_at: string;
  deleted: boolean;
  dob: string;
  email: string;
  first_name: string;
  image: string;
  last_login: string;
  last_name: string;
  mobile_number: string;
  password: string;
  status: string;
  two_step: string;
  updated_at: string;
  user_type: string;
  _id: string;
}

interface UserListResponse {
  data: UserList[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    totalRecords: number;
  };
}

let userId = "";

const UsersTable = () => {
  const [limit] = useState(10);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<UserListResponse>();
  const { setLoading } = useContext(LoadingContext);
  const { currentUser } = useAuth();

  const getUsers = async () => {
    const resp: {
      data: any;
      pagination: any;
    } = await handleGetRequest(`/admin/get_all`, {
      params: { page, limit },
    })(setLoading);

    setUsers(resp);
  };

  const checkBeforeDelete = async (uId: any) => {
    if (currentUser?.user?._id === uId) {
      toast.error("Du kan ikke slette din egen bruker");
    } else {
      userId = uId;
      setShowModalConfirm(true);
    }
  };
  const handleDelete = async () => {
    setShowModalConfirm(false);
    await handleDeleteRequest(`/admin/${userId}`)(setLoading);
    getUsers();
  };
  const getInitials = (firstName = "", lastName = "") => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  useEffect(() => {
    getUsers();
  }, [page, limit]);

  return (
    <KTCardBody>
      <div className="table-responsive">
        <table
          id="kt_table_users"
          className="table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer"
        >
          <thead>
            <tr className="text-start text-muted fw-bolder fs-7 text-uppercase gs-0">
              {/* <th colSpan={1} role='columnheader' className='w-10px ps-4 rounded-start'>
                <div className='form-check form-check-sm form-check-custom form-check-solid me-3'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    data-kt-check='false'
                    data-kt-check-target='#kt_table_users .form-check-input'
                  />
                </div>
              </th> */}
              <th
                colSpan={1}
                role="columnheader"
                className="min-w-125px  ps-4 rounded-start"
              >
                NAVN
              </th>
              <th colSpan={1} role="columnheader" className="min-w-125px">
                ROLLE
              </th>
              <th colSpan={1} role="columnheader" className="min-w-125px">
                SIST INNLOGGING
              </th>

              <th colSpan={1} role="columnheader" className="min-w-125px">
                OPPRETTET
              </th>
              <th
                colSpan={1}
                role="columnheader"
                className=" text-end rounded-end px-4"
              >
                HANDLINGER
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 fw-bold">
            {users?.data.map((user) => (
              <tr role="row" key={user?._id}>
                <td className="">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-50px me-5">
                      <Link
                        to={`/user-mangement/user-overview/update-user/${user?._id}`}
                      >
                        <div
                          className="symbol symbol-50px me-5"
                          style={{ backgroundColor: "white" }}
                        >
                          {user?.image ? (
                            <img
                              src={user?.image}
                              alt="Emma Smith"
                              className="align-self-end border imgBorder"
                            />
                          ) : (
                            <div
                              className="btn btn-icon btn-active-light-primary btn-custom border"
                              style={{ width: "50px", height: "50px" }}
                            >
                              {getInitials(user?.first_name, user?.last_name)}
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                    <div className="d-flex flex-column">
                      <Link
                        to={`/user-mangement/user-overview/update-user/${user?._id}`}
                        className="text-gray-800 text-hover-primary mb-1"
                      >
                        {user?.first_name} {user?.last_name}
                      </Link>
                      <span>{user?.email}</span>
                    </div>
                  </div>
                </td>
                <td className="">{user?.user_type}</td>
                <td className="">
                  <div className="">
                    {moment(user?.last_login).format("DD.MM.YYYY hh:mm")}
                  </div>
                </td>

                <td className="">
                  {moment(user?.created_at).format("DD.MM.YYYY")}
                </td>
                <td
                  className="text-end "
                  style={{ position: "relative", float: "right" }}
                >
                  {/* <div
                    className='btn btn-light btn-active-light-primary btn-sm 
                    '
                    onClick={() => showDropdown(index)}
                  >
                    Actions
                    <span className='svg-icon svg-icon-5 m-0'>
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                        className='mh-50px'
                      >
                        <path
                          d='M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z'
                          fill='currentColor'
                        ></path>
                      </svg>
                    </span>
                  </div>
                  <div
                    className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                    id={`kt_menu_user_${index}`}
                  >
                    <div className='menu-item px-3'>
                      <Link
                        to={`/user-mangement/user-overview/update-user/${user?._id}`}
                        className='menu-link px-3'
                      >
                        Edit
                      </Link>
                    </div>
                    <div className='menu-item px-3'>
                      <a className='menu-link px-3' data-kt-users-table-filter='delete_row'>
                        Delete
                      </a>
                    </div>
                  </div> */}
                  <div className="d-flex flex-shrink-0">
                    <Link
                      to={`/user-mangement/user-overview/update-user/${user?._id}`}
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 min-w-auto"
                    >
                      <i className="fa-duotone fa-pencil" />
                    </Link>
                    <span
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm min-w-auto"
                      data-kt-users-table-filter="delete_row"
                      onClick={() => {
                        checkBeforeDelete(user?._id);
                      }}
                    >
                      <i className="fa-duotone fa-trash" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row">
          <div className="col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start" />
          <div className="col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end">
            <CustomPagination
              className="pagination-bar justify-content-md-end"
              currentPage={page}
              totalCount={users ? users?.pagination?.totalRecords : 0}
              pageSize={limit}
              onPageChange={(page: any) => setPage(page)}
            />
          </div>
        </div>
      </div>
      {/* <UsersListPagination /> */}
      <Modal
        show={showModalConfirm}
        onHide={() => setShowModalConfirm(false)}
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="modal-title">Slett bruker</h5>
          </Modal.Title>
        </Modal.Header>
        <div className="modal-body">
          Er du sikker på at du vil slette denne brukeren? Denne handlingen kan
          ikke reverseres.
          <br />
          <br />
          <br />
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              setShowModalConfirm(false);
            }}
          >
            Avbryt
          </button>
          <button
            type="button"
            style={{ float: "right" }}
            onClick={() => {
              handleDelete();
            }}
            className="btn btn-primary"
          >
            Ja, slett
          </button>
        </div>
      </Modal>
    </KTCardBody>
  );
};

export { UsersTable };
