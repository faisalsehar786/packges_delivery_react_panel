import moment from 'moment'
import {useState, useEffect, useContext, useCallback} from 'react'
import {Link} from 'react-router-dom'
import CustomPagination from '../../../../CustomPagination'
import {numberSpacing} from '../../../../_metronic/helpers'
import {handleGetRequest} from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {FaSort, FaSortDown, FaSortUp} from 'react-icons/fa'

interface Organization {
  _id: string
  org_id: number
  reference_id: string
  org_name: string
  abbreviation: string
  describing_name: string
  org_type_id: string
  organisation_number: string
  email: string
  home_page: string
  mobile_phone: string
  address_line1: string | null
  address_line2: string | null
  city: string
  country: string
  country_id: string
  post_code: string
  longitude: number
  latitude: number
  location: {
    type: string
    coordinates: [number, number]
  }
  org_logo_base64: string
  members: number
  account_created: boolean
  deleted: boolean
  created_at: string
  updated_at: string
  total_support_amount: number
  active_goal_count: number
  total_goal_count: number
  active_goal_support_count: number
  active_goal_support_user_count: number
  logo: string
  msn_date: string
  msn_status: string
}

interface OrganizationsResponse {
  data: Organization[]
  pagination: {
    totalRecords: number
  }
}

interface TableRowProps {
  org: Organization
  getLogo: (org: Organization) => string | undefined
  key: string
}

const TableRow: React.FC<TableRowProps> = ({org, getLogo}) => {
  const getStatus = (status: string) => {
    return status?.charAt(0)?.toUpperCase() + status?.slice(1)?.replace('_', ' ')
  }

  return (
    <tr key={org._id}>
      <td>
        <div className='d-flex align-items-center'>
          <div className='img-wrapper me-5'>
            {getLogo(org) ? (
              <img
                style={{
                  objectFit: 'contain',
                }}
                src={getLogo(org)}
                className='max- align-self-end'
                alt=''
              />
            ) : (
              <i
                className='fa-duotone fa-user-astronaut'
                style={{
                  fontSize: '34px',
                }}
              ></i>
            )}
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <Link
              to={`/home/organisasjonerSingle/${org?._id}`}
              className='text-dark fw-bold text-hover-primary mb-1 fs-6'
            >
              {org?.org_name}
            </Link>
            <span className='text-muted fw-semibold d-block'>
              {numberSpacing(org?.organisation_number)}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {org?.msn_date
            ? `
          ${getStatus(org?.msn_status)}
          ${moment.utc(org?.msn_date).format('DD.MM.YYYY')}`
            : getStatus(org?.msn_status)}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {numberSpacing(org?.active_goal_count)}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {numberSpacing(org?.active_goal_support_user_count)}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {numberSpacing(org?.active_goal_support_count)}
        </span>
      </td>

      <td className='text-end pe-4'>
        <span className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
          {numberSpacing(org?.total_support_amount)}
        </span>
      </td>
    </tr>
  )
}

const OrganizationsTable: React.FC = () => {
  const [organizations, setOrganizations] = useState<OrganizationsResponse>()
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [sortKey, setSortKey] = useState('msn_date')
  const [sortOrder, setSortOrder] = useState('DESC')

  const {setLoading} = useContext(LoadingContext)

  const handleSort = useCallback(
    (key: string) => {
      if (key === sortKey) {
        setSortOrder((prevOrder) => (prevOrder === 'ASC' ? 'DESC' : 'ASC'))
        setPage(1)
      } else {
        setSortKey(key)
        setSortOrder('ASC')
        setPage(1)
      }
    },
    [sortKey]
  )

  const getOrganizations = async () => {
    const resp: {
      data: any
      pagination: any
    } = await handleGetRequest('/organisation/get_top_10', {
      params: {page: page, limit: limit, sortKey: sortKey, sortOrder: sortOrder},
    })(setLoading)

    setOrganizations(resp.data)
  }
  const getLogo = (org: Organization): string | undefined => {
    if (org?.logo) return org?.logo
    if (org?.org_logo_base64) {
      return 'data:image/png;base64,' + org?.org_logo_base64
    }
    return
  }

  useEffect(() => {
    getOrganizations()

    // return () => {
    //   setLoading(false)
    //   setOrganizations(undefined)
    // }
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
              style={{width: '33%'}}
              onClick={() => handleSort('org_name')}
            >
              ORGANISASJONER
              {sortKey === 'org_name' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'org_name' && <FaSort className='ms-2' />}
            </th>

            <th className='pointer' style={{width: '15%'}} onClick={() => handleSort('msn_date')}>
              Onboarding
              {sortKey === 'msn_date' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'msn_date' && <FaSort className='ms-2' />}
            </th>

            <th
              className='pointer'
              style={{width: '10%'}}
              onClick={() => handleSort('active_goal_count')}
            >
              FORMÅL
              {sortKey === 'active_goal_count' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'active_goal_count' && <FaSort className='ms-2' />}
            </th>

            <th
              className='pointer '
              style={{width: '15%'}}
              onClick={() => handleSort('active_goal_support_user_count')}
            >
              STØTTESPILLERE
              {sortKey === 'active_goal_support_user_count' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'active_goal_support_user_count' && <FaSort className='ms-2' />}
            </th>
            <th
              className='pointer '
              style={{width: '10%'}}
              onClick={() => handleSort('active_goal_support_count')}
            >
              STØTTER
              {sortKey === 'active_goal_support_count' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'active_goal_support_count' && <FaSort className='ms-2' />}
            </th>
            <th
              className='pointer  text-end rounded-end px-4'
              style={{width: '12%'}}
              onClick={() => handleSort('total_support_amount')}
            >
              INNSAMLET
              {sortKey === 'total_support_amount' && (
                <>
                  {sortOrder === 'ASC' ? (
                    <FaSortUp className='ms-2' />
                  ) : (
                    <FaSortDown className='ms-2' />
                  )}
                </>
              )}
              {sortKey !== 'total_support_amount' && <FaSort className='ms-2' />}
            </th>
          </tr>
        </thead>
        {/* end::Table head */}
        {/* begin::Table body */}
        <tbody>
          {organizations?.data?.map((org: Organization) => (
            <TableRow key={org?._id} org={org} getLogo={getLogo} />
          ))}
        </tbody>
        {/* end::Table body */}
      </table>
      {/* end::Table */}
      <div className='row'>
        <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
        <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
          <CustomPagination
            className='pagination-bar justify-content-md-end'
            currentPage={page}
            totalCount={organizations ? organizations?.pagination?.totalRecords : 0}
            pageSize={limit}
            onPageChange={(page: any) => setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default OrganizationsTable
