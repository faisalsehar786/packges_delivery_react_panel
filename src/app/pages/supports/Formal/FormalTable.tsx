import classNames from 'classnames'
import moment from 'moment'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import CustomPagination from '../../../../CustomPagination'
import { numberSpacing, toAbsoluteUrl } from '../../../../_metronic/helpers'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { handleGetRequest } from '../../../services'

interface Props {
  org_id?: string
  search?: string
  hide?: any[]
  logo?: any
}

interface Goal {
  _id: string
  organisation_sports_category_id: string
  image: string
  title: string
  short_description: string
  target_amount: number
  start_date: string
  due_date: string
  created_at: string
  updated_at: string
  status: string
  support_total_amount: number
  total_supporter_player: number
  organisation_name: string
  organisation_org_no: number
  organisation_sport_name: string
  organisation_logo: string
  organisation_logo_base64: string
}

interface GoalsResponse {
  data: Goal[]
  pagination: {
    totalRecords: number
  }
}

interface TableRowProps {
  goal: Goal
  hideOrg?: boolean
  logo?: string
}

const TableRow: React.FC<TableRowProps> = ({ goal, hideOrg, logo }) => {
  const navigation = useNavigate()

  const getLogo = (): string => {
    if (goal?.organisation_logo) {
      return goal?.organisation_logo
    }
    if (goal?.organisation_logo_base64) {
      return `data:image/png;base64,${goal?.organisation_logo_base64}`
    }
    return logo || toAbsoluteUrl('/media/misc/logo-missing.jpeg')
  }

  return (
    <tr
      key={goal?._id}
      className='pointer'
      onClick={() => navigation(`/home/formalSingle/${goal?._id}`)}
    >
      <td>
        <div
          className='d-flex align-items-center'
          onClick={() => navigation(`/home/formalSingle/${goal?._id}`)}
        >
          <div className='img-wrapper me-5'>
            <img
              src={getLogo()}
              alt=''
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <Link
              to={`/home/formalSingle/${goal?._id}`}
              className='text-dark fw-bold text-hover-primary mb-1 fs-6'
            >
              {goal?.title}
            </Link>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-6'>
          {moment(goal?.start_date).format('DD.MM.YYYY')}
        </span>
      </td>
      {!hideOrg && (
        <td>
          <span className='text-dark fw-bold d-block mb-1 fs-6'>{goal?.organisation_name}</span>
          <span className='text-muted fw-semibold d-block'>{goal?.organisation_sport_name}</span>
        </td>
      )}
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-6'>
          {numberSpacing(Number(goal?.total_supporter_player ?? 0))}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold d-block mb-1 fs-6'>
          {numberSpacing(Number(goal?.support_total_amount))}
        </span>
      </td>
      <td className='text-end'>
        <span
          className={classNames('btn btn-sm', {
            'btn-light-primary': goal?.status === 'paused',
            'btn-light-success': goal?.status === 'active',
            'btn-light-info': goal?.status === 'completed',
            'btn-light-danger': goal?.status === 'canceled',
          })}
        >
          {goal?.status === 'paused' && 'Pauset'}
          {goal?.status === 'active' && 'Aktiv'}
          {goal?.status === 'completed' && 'Fullført'}
          {goal?.status === 'canceled' && 'Avbrutt'}
        </span>
      </td>
    </tr>
  )
}

const FormalTable: React.FC<Props> = ({ org_id, search, hide, logo }) => {
  const [page, setPage] = useState(1)
  const [goals, setGoals] = useState<GoalsResponse>()
  const [sortKey, setSortKey] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('DESC')
  const { setLoading } = useContext(LoadingContext)

  const handleSort = useCallback(
    (key: string) => {
      if (key === sortKey) {
        setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'))
        setPage(1) // Reset page to 1 upon sorting
      } else {
        setSortKey(key)
        setSortOrder('ASC')
        setPage(1) // Reset page to 1 upon sorting
      }
    },
    [sortKey]
  )

  useEffect(() => {
    const getGoals = async () => {
      const params = {
        page,
        search,
        sortKey,
        sortOrder,
      }

      try {
        const endpoint = org_id
          ? `/goal/all_organisation?organisationId=${org_id}`
          : '/goal/all_list'
        const resp: GoalsResponse = await handleGetRequest(endpoint, { params })(setLoading)
        setGoals(resp)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }

    getGoals()
  }, [page, org_id, search, sortKey, sortOrder, setLoading])

  return (
    <div className='table-responsive scroll-x'>
      <table className='table align-middle gs-0 gy-4 hoverTable'>
        <thead>
          <tr className='fw-bold text-muted bg-light'>
            <th
              className='pointer ps-6 rounded-start'
              style={{ width: '30%' }}
              onClick={() => handleSort('title')}
            >
              FORMÅL
              {sortKey === 'title' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'title' && <FaSort className='ms-2' />}
            </th>

            {/* OPPSTART */}
            <th
              className='pointer'
              style={{ width: '10%' }}
              onClick={() => handleSort('start_date')}
            >
              OPPSTART
              {sortKey === 'start_date' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'start_date' && <FaSort className='ms-2' />}
            </th>

            {!hide?.includes('org') && (
              <th
                className='pointer'
                style={{ width: '25%' }}
                onClick={() => handleSort('organisation_name')}
              >
                ORG.
                {sortKey === 'organisation_name' && (
                  <>
                    {sortOrder === 'ASC' ? (
                      <FaSortUp className='ms-2' />
                    ) : (
                      <FaSortDown className='ms-2' />
                    )}
                  </>
                )}
                {sortKey !== 'organisation_name' && <FaSort className='ms-2' />}
              </th>
            )}
            <th
              className='pointer '
              style={{ width: '12%' }}
              onClick={() => handleSort('total_supporter_player')}
            >
              STØTTESPILLERE
              {sortKey === 'total_supporter_player' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'total_supporter_player' && <FaSort className='ms-2' />}
            </th>
            <th
              className='pointer '
              style={{ width: '10%' }}
              onClick={() => handleSort('support_total_amount')}
            >
              INNSAMLET
              {sortKey === 'support_total_amount' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'support_total_amount' && <FaSort className='ms-2' />}
            </th>
            <th
              className='pointer text-end rounded-end pe-6'
              style={{ width: '20%' }}
              onClick={() => handleSort('status')}
            >
              STATUS
              {sortKey === 'status' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'status' && <FaSort className='ms-2' />}
            </th>
          </tr>
        </thead>
        <tbody>
          {goals?.data?.map((goal) => (
            <TableRow key={goal?._id} goal={goal} hideOrg={hide?.includes('org')} logo={logo} />
          ))}
        </tbody>
      </table>

      <div className='row'>
        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start' />
        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
          <CustomPagination
            className='pagination-bar justify-content-md-end'
            currentPage={page}
            totalCount={goals?.pagination?.totalRecords ?? 0}
            pageSize={10}
            onPageChange={(page: any) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(FormalTable)
