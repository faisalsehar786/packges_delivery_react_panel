import moment from 'moment'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import CustomPagination from '../../../../CustomPagination'
import { numberSpacing } from '../../../../_metronic/helpers'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { handleGetRequest } from '../../../services'

interface Supporters {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  mobile_number: string
  image: string
  status: string
  deleted: boolean
  bank_connection_list: any[]
  created_at: string
  updated_at: string
  __v: number
  user_id: string
  total_goal_support_count: number
  active_goal_support_count: number
  user_total_support_amount: number
  support_start_date: string
}

interface SupporterResponse {
  data: Supporters[]
  pagination: {
    totalRecords: number
  }
}

const FormalStottespillereTable = (props: any) => {
  const [supports, setSupports] = useState<SupporterResponse>()
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('support_start_date')
  const [sortOrder, setSortOrder] = useState('ASC')
  const { setLoading } = useContext(LoadingContext)

  const getSupports = async () => {
    const resp = await handleGetRequest('/goal_support/get_support_players_by_goal', {
      params: { page, limit, goalId: props?.goalId, sortKey, sortOrder },
    })(setLoading)

    setSupports(resp)
  }

  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }

  function numberSpacingBetweenTwodDigits(value: number | string) {
    // add a space between every 3 digits in a number from right to left
    if (value) return value.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ' ')
    return value
  }
  const handleSort = useCallback(
    (key: string) => {
      if (key === sortKey) {
        setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'))
      } else {
        setSortKey(key)
        setSortOrder('ASC')
      }
    },
    [sortKey]
  )

  useEffect(() => {
    getSupports()
  }, [page, limit, sortKey, sortOrder])

  return (
    <div className='table-responsive'>
      {/* begin::Table */}
      <table className='table align-middle gs-0 gy-4'>
        {/* begin::Table head */}
        <thead>
          <tr className='fw-bold text-muted bg-light'>
            <th
              className='pointer ps-4 rounded-start'
              style={{ width: '30%' }}
              onClick={() => handleSort('first_name')}
            >
              Støttespiller
              {sortKey === 'first_name' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'first_name' && <FaSort className='ms-2' />}
            </th>

            <th
              className='pointer'
              style={{ width: '25%' }}
              onClick={() => handleSort('support_start_date')}
            >
              Oppstart dato
              {sortKey === 'support_start_date' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'support_start_date' && <FaSort className='ms-2' />}
            </th>

            <th className='' style={{ width: '20%' }} onClick={() => handleSort('mobile_number')}>
              Kontakt
              {sortKey === 'mobile_number' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'mobile_number' && <FaSort className='ms-2' />}
            </th>

            <th
              className='pointer text-end rounded-end px-4'
              style={{ width: '30%' }}
              onClick={() => handleSort('user_total_support_amount')}
            >
              Støtte mottatt
              {sortKey === 'user_total_support_amount' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'user_total_support_amount' && <FaSort className='ms-2' />}
            </th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {supports?.data?.map((support: Supporters) => (
            <tr key={support?._id}>
              <td>
                <div className='d-flex align-items-center'>
                  <div className=' symbol symbol-50px me-5'>
                    <span className='symbol-label bg-light'>
                      <div className='img-wrapper p-0'>
                        {getInitials(support?.first_name, support?.last_name)}
                      </div>
                    </span>
                  </div>
                  <div className='d-flex justify-content-start flex-column'>
                    <Link
                      to={`/home/stottespillereSingle/${support?._id}`}
                      className='text-dark fw-bold text-hover-primary mb-1 fs-6'
                    >
                      {support?.first_name} {support?.last_name}
                    </Link>
                  </div>
                </div>
              </td>
              <td>
                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                  {moment.utc(support?.support_start_date).format('DD.MM.YYYY')}
                </span>
              </td>

              <td>
                <span className='text-dark fw-bold d-block mb-1 fs-6'>
                  +{numberSpacingBetweenTwodDigits(support?.mobile_number)}
                </span>
              </td>

              <td className='text-end pe-4'>
                <span className='text-dark fw-bold d-block mb-1 fs-6"'>
                  {numberSpacing(support?.user_total_support_amount)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}

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

export default FormalStottespillereTable
