import moment from 'moment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CustomPagination from '../../../../CustomPagination'
import { numberSpacing } from '../../../../_metronic/helpers'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { handleDeleteRequest, handleGetRequest } from '../../../services'

let userId = ''

const AppUserTable = (props: any) => {
  const role = props?.role
  const [supports, setSupports] = useState<any>()
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortBy, setsortBy] = useState('created_at')
  const [order, setorder] = useState('DESC')
  const { setLoading } = useContext(LoadingContext)
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
  const [activeGoal_support, setactiveGoal_support] = useState(0)
  const [userUserName, setuserUserName] = useState('')
  const getSupports = async () => {
    const resp = await handleGetRequest('/user/get_all?check_cond=true', {
      params: { page, limit, sortBy, order, role },
    })(setLoading)

    setSupports(resp)
  }

  const handleDelete = async () => {
    setShowModalConfirm(false)
    await handleDeleteRequest(`/user/${userId}`)(setLoading)
    getSupports()
  }

  const checkBeforeDelete = async (delId: any, active_goal_support: any) => {
    if (delId) {
      userId = delId
      setShowModalConfirm(true)
      setactiveGoal_support(active_goal_support)
    } else {
      toast.error('Bruker er allerede slettet')
    }
  }

  function numberSpacingBetweenTwodDigits(value: number | string) {
    // add a space between every 3 digits in a number from right to left
    if (value) return value.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ' ')
    return value
  }
  const handleSort = useCallback(
    (key: string) => {
      if (key === sortBy) {
        setorder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'))
      } else {
        setsortBy(key)
        setorder('ASC')
      }
    },
    [sortBy]
  )
  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }

  useEffect(() => {
    getSupports()
  }, [page, limit, sortBy, order, role])

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table align-middle gs-0 gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='fw-bold text-muted bg-light'>
            <th className='pointer ps-4 rounded-start' onClick={() => handleSort('first_name')}>
              Støttespiller
              {sortBy === 'first_name' && (
                <>
                  {order === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortBy !== 'first_name' && <FaSort className='ms-2' />}
            </th>

            <th className='pointer'>Oppstart dato</th>

            <th className=''>Kontakt</th>

            <th className='pointer' onClick={() => handleSort('created_at')}>
              HmHy mottatt
              {sortBy === 'DESC' && (
                <>
                  {order === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortBy !== 'created_at' && <FaSort className='ms-2' />}
            </th>
            <th className=' text-end rounded-end px-4'>HANDLINGER</th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {supports?.data?.map((support: any) => (
            <tr key={support?._id}>
              <td>
                <div className='d-flex align-items-center'>
                  <div className='symbol symbol-50px me-5'>
                    <Link to={`/user-mangement/user-overview/update-user/${support?._id}`}>
                      <div className='symbol symbol-50px me-5' style={{ backgroundColor: 'white' }}>
                        {support?.image ? (
                          <img
                            src={support?.image}
                            alt='Emma Smith'
                            className='align-self-end border imgBorder'
                          />
                        ) : (
                          <div
                            className='btn btn-icon btn-active-light-primary btn-custom border'
                            style={{ width: '50px', height: '50px' }}
                          >
                            {getInitials(support?.first_name, support?.last_name)}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                  <div className='d-flex flex-column'>
                    <Link
                      to={`/user-mangement/user-overview/update-user/${support?._id}`}
                      className='text-gray-800 text-hover-primary mb-1'
                    >
                      {support?.first_name} {support?.last_name}
                    </Link>
                    <span>{support?.email}</span>
                  </div>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                  {support?.user_type?.find((o: any) => o.role == 'driver')?.role},{' '}
                  {support?.user_type?.find((o: any) => o.role == 'customer')?.role}
                </span>
              </td>

              <td>
                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                  +{numberSpacingBetweenTwodDigits(support?.mobile_number)}
                </span>
              </td>

              <td className=''>{moment(support?.created_at).format('DD.MM.YYYY')}</td>
              <td className='text-end '>
                <div className='d-flex flex-shrink-0 justify-content-end'>
                  <Link
                    to={`/user-mangement/user-overview/update-user/`}
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 min-w-auto'
                  >
                    <i className='fa-duotone fa-pencil' />
                  </Link>
                  <span
                    className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm min-w-auto'
                    data-kt-users-table-filter='delete_row'
                    onClick={() => {
                      setuserUserName(`${support?.first_name} ${support?.last_name}`)
                      checkBeforeDelete(support?._id, support?.active_goal_support_count)
                    }}
                  >
                    <i className='fa-duotone fa-trash' />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
      <Modal
        show={showModalConfirm}
        onHide={() => setShowModalConfirm(false)}
        size='lg'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className='modal-title'>Vil du slette {userUserName}?</h5>
          </Modal.Title>
        </Modal.Header>
        <div className='modal-body'>
          {activeGoal_support > 0
            ? 'Bruker kan ikke slettes før aktiv HmHy har blitt fjernet.'
            : 'Er du sikkert på at du vil slette brukeren? Denne handlingen kan ikke angres. '}

          <br />
          <br />
          <br />

          {activeGoal_support > 0 ? (
            ''
          ) : (
            <button
              type='button'
              style={{ float: 'right' }}
              onClick={() => {
                handleDelete()
              }}
              className='btn btn-primary'
            >
              Ja, slett
            </button>
          )}
          <button
            type='button'
            className='btn btn-light'
            onClick={() => {
              setShowModalConfirm(false)
            }}
          >
            Avbryt
          </button>
        </div>
      </Modal>

      <div className='row'>
        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start' />
        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
          <CustomPagination
            className='pagination-bar justify-content-md-end'
            currentPage={page}
            totalCount={supports ? supports?.pagination?.totalRecords : 0}
            pageSize={limit}
            onPageChange={(page: any) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default AppUserTable
