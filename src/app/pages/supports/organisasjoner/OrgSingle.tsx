/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/anchor-is-valid */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { numberSpacing } from '../../../../_metronic/helpers'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {
  handleGetRequest,
  handleGetRequestWithoutRefresh,
  handleGetRequestWithoutRefreshAndMessage,
} from '../../../services'
import { ErrorMessageDrawer } from '../../Drawer/ErrorMessageDrawer'
import OrgFormalTable from './OrgFormalTable'
import OrgStottespillereTable from './OrgStottespillereTable'

interface OrgStats {
  net_received_supports: number
  published_goals: number
  total_active_goals: number
  total_active_supporters: number
  total_active_supports: number
  total_charged_amount: number
  total_pending_supports: number
  total_received_supports: number
  total_supporters: number
  total_reserved_amount: number
}

export default function OrganisasjonerSingle() {
  const { id } = useParams<{ id: string }>()
  const [organisation, setOrganisation] = useState<any>()
  const [orgStats, setOrgStats] = useState<OrgStats>()
  const [branches, setBranches] = useState<any>()
  const [selectedUser, setSelectedUser] = useState<any>()
  const [memberData, setMemberData] = useState<any>()
  const { setLoading } = useContext(LoadingContext)
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
  function numberSpacingBetweenTwodDigits(value: number | string) {
    // add a space between every 3 digits in a number from right to left
    if (value) return value.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ' ')
    return value
  }
  const getOrgDetails = async () => {
    const { data } = await handleGetRequest(`/organisation/${id}`)(setLoading)
    setOrganisation(data)
    getLeader(data?.org_id)
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/organisasjoner',
        title: 'Støtte',
      },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/organisasjoner',
        title: 'Organisasjoner',
      },
      {
        isActive: false,
        isSeparator: true,
        path: '/home/organisasjoner',
        title: data?.org_name,
      },
    ])
  }

  const getOrgUsers = async () => {
    const params = {
      limit: 50,
      page: 1,
    }
    const { data } = await handleGetRequest(`/organisation_user/by_org_admin/${id}`, { params })(
      setLoading
    )
    if (data) {
      setMemberData({
        data,
      })
    }
  }
  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }

  const getOrgStats = async () => {
    const { data } = await handleGetRequestWithoutRefresh(`/organisation/stats_admin/${id}`)(
      setLoading
    )
    setOrgStats(data)
  }

  const getLeader = async (org_id: string) => {
    const { data } = await handleGetRequestWithoutRefreshAndMessage(
      `/organisation/get_leader/${org_id}`
    )(setLoading)
    setOrganisation((prev: any) => ({
      ...prev,
      leader: `${data?.firstName} ${data?.lastName}`,
    }))
  }

  const getLogo = (organisation: { logo: any; org_logo_base64: string }): string => {
    if (organisation?.logo) {
      return organisation?.logo
    }
    if (organisation?.org_logo_base64) {
      return `data:image/png;base64,${organisation?.org_logo_base64}`
    }
    return ''
  }

  const getBranches = async () => {
    const { data } = await handleGetRequestWithoutRefresh(
      `/organisation/get_org_sport?organisationId=${id}`
    )(setLoading)
    setBranches(data)
  }

  useEffect(() => {
    getOrgDetails()
    getOrgStats()
    getBranches()
    getOrgUsers()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <div>
          <h3 className='fw-bolder my-2'>Org. detaljer</h3>
          <div className=' fontsizechfslogtime d-flex align-items-center text-gray-400  me-5 '>
            Detaljert oversikt over valgt organisasjon
          </div>
        </div>

        <div className='d-flex flex-wrap my-2'>
          <div className='me-4' />
          <Link to='/home/organisasjoner' className='btn btn-primary'>
            Tilbake til org. oversikt
          </Link>
          {/* begin::Menu */}
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
            data-kt-menu='true'
          >
            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>30 Days</a>
            </div>
            {/* end::Menu item */}

            {/* begin::Menu item */}
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>90 Days</a>
            </div>
            {/* end::Menu item */}
          </div>
          {/* end::Menu */}
        </div>
      </div>

      <div className='card mb-5 mb-xl-8'>
        <div
          className='modal-content  box-shadow-none
        '
        >
          <div className='modal-body box-shadow-none'>
            <div className='d-flex  justify-content-between'>
              <div className='d-flex '>
                <div className='img-wrapper  org-details me-5'>
                  {getLogo(organisation) ? (
                    <img
                      src={getLogo(organisation)}
                      className='logo svg-icon-cufs '
                      style={{ maxWidth: '120px', objectFit: 'contain' }}
                      alt=''
                    />
                  ) : (
                    <i className=' fa-duotone fa-user-astronaut fs-65px' />
                  )}
                </div>
                <div className='d-flex justify-content-start flex-column mt-2'>
                  <a href='#' className='text-dark fw-bolder text-hover-primary org-name'>
                    {organisation?.org_name}
                  </a>
                  <span className='text-muted fw-bold text-muted d-block mb-1 fs-7 text-capitalize'>
                    Org no: {organisation?.organisation_number}- Vipps onboarding:{' '}
                    {organisation?.msn_status}{' '}
                    {moment.utc(organisation?.msn_date).format('DD.MM.YYYY')}
                  </span>
                  <span className='text-muted fw-bold text-muted d-block fs-7 me-5'>
                    <div
                      className=' fontsizechfslogtime  presentation no-margin'
                      // dangerouslySetInnerHTML={{__html: formal?.short_description}}
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={organisation?.description}
                        id='displayEditor'
                        disabled
                        config={{ toolbar: [] }}
                        onReady={() => {}}

                        // set height for editor
                      />
                    </div>
                  </span>
                </div>
              </div>
              <div>
                <Link
                  to={`/home/organisasjonerEdit/${organisation?._id}
              `}
                  className='btn btn-primary'
                  style={{ minWidth: '170px' }}
                >
                  Org. innstillinger
                </Link>
              </div>
            </div>

            <div className='separator my-5' />
            <div className='d-flex g-0 gap-0'>
              <div className='col-2'>
                <div className='d-flex '>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-wallet fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-24 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Innsamlet
                    </div>
                    <div
                      className='fs-24  fw-bold'
                      style={{ color: '#000000', marginTop: '5px', fontSize: '14px' }}
                    >
                      {numberSpacing(orgStats?.total_received_supports!)}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div className='d-flex'>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-bullseye fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-24 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Aktive formål
                    </div>
                    <div
                      className='fs-23  fw-bold'
                      style={{ color: '#000000', marginTop: '5px', fontSize: '14px' }}
                    >
                      {numberSpacing(orgStats?.total_active_goals!)}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div className='d-flex'>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-credit-card fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-23 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Utestående trekk
                    </div>
                    <div
                      className='fs-23  fw-bold'
                      style={{ color: '#000000', marginTop: '5px', fontSize: '14px' }}
                    >
                      {numberSpacing(orgStats?.total_pending_supports!)}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div className='d-flex'>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-circle-exclamation-check fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-23 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Reserverte trekk
                    </div>
                    <div
                      className='fs-23  fw-bold'
                      style={{ color: '#000000', marginTop: '5px', fontSize: '14px' }}
                    >
                      {numberSpacing(orgStats?.total_reserved_amount!)}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div className='d-flex '>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-chart-pie fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-24 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Netto Støtte
                    </div>
                    <div
                      className='fs-24  fw-bold'
                      style={{ color: '#000000', marginTop: '5px', fontSize: '14px' }}
                    >
                      {numberSpacing(orgStats?.net_received_supports!)}
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-2'>
                <div className='d-flex'>
                  <div className='symbol symbol-40px me-3'>
                    <div className='d-flex align-items-center bg-white bg-opacity-50'>
                      <i className='fa-duotone fa-users fs-1' />
                    </div>
                  </div>

                  <div>
                    <div
                      className='fs-24 text-dark fw-bolder lh-1'
                      style={{ color: '#000000', fontSize: '14px' }}
                    >
                      Støttespillere
                    </div>
                    <div
                      className='fw-bold mt-1'
                      style={{
                        whiteSpace: 'nowrap',
                        color: '#000000',
                        marginTop: '5px',
                        fontSize: '14px',
                      }}
                    >
                      {numberSpacing(orgStats?.total_active_supporters!)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  <div className='row gy-5 g-xl-10'>
            
              <div className='col-xl-12'>
                <div className='d-flex last-right'>
                  
                  <div className='me-12 max-content '>
                    <div className='d-flex '>
                     
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-wallet fs-1'></i>
                        </div>
                      </div>
                   
                      <div>
                        <div
                          className='fs-5 text-dark fw-bolder lh-1 nowrap 
                        '
                        >
                          Innsamlet
                        </div>
                        <h4 className='mt-1 font-weight-bolder'>
                          {numberSpacing(orgStats?.total_received_supports!)}
                        </h4>
                      </div>
                     
                    </div>
                  </div>
                 
                  <div className='me-12 max-content '>
                    <div className='d-flex '>
                     
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-bullseye fs-1'></i>
                        </div>
                      </div>
                     
                      <div>
                        <div className='fs-5 text-dark fw-bolder lh-1 nowrap'>Aktive formål</div>
                        <h4 className='mt-1 font-weight-bolder'>
                          {numberSpacing(orgStats?.total_active_goals!)}
                        </h4>
                      </div>
                     
                    </div>
                  </div>
                  
                  <div className='me-12 max-content '>
                    <div className='d-flex '>
                     
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-credit-card fs-1'></i>
                        </div>
                      </div>
                     
                      <div>
                        <div className='fs-5 text-dark fw-bolder lh-1 nowrap'>Utestående trekk</div>
                        <h4 className='mt-1 font-weight-bolder'>
                          {numberSpacing(orgStats?.total_pending_supports!)}
                        </h4>
                      </div>
                     
                    </div>
                  </div>
               
                  <div className='me-12 max-content '>
                    <div className='d-flex '>
                    
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-circle-exclamation-check fs-1'></i>
                        </div>
                      </div>
                    
                      <div>
                        <div className='fs-5 text-dark fw-bolder lh-1 nowrap'>Reserverte trekk</div>
                        <h4 className='mt-1 font-weight-bolder'>
                          {numberSpacing(orgStats?.total_reserved_amount!)}
                        </h4>
                      </div>
                      
                    </div>
                  </div>
                 
                  <div className='me-12 max-content '>
                    <div className='d-flex '>
                    
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-chart-pie fs-1'></i>
                        </div>
                      </div>
                    
                      <div>
                        <div className='fs-5 text-dark fw-bolder lh-1 nowrap'>Netto Støtte</div>
                        <h4
                          className='mt-1 font-weight-bolder
                        '
                        >
                          {numberSpacing(orgStats?.net_received_supports!)}
                        </h4>
                      </div>
                      
                    </div>
                  </div>
                  
                  <div className='max-content'>
                    <div className='d-flex justify-content-end'>
                    
                      <div className='symbol symbol-40px me-3'>
                        <div className='d-flex align-items-center bg-white bg-opacity-50'>
                          <i className='fa-duotone fa-users fs-1'></i>
                        </div>
                      </div>
                     
                      <div>
                        <div className='fs-5 text-dark fw-bolder lh-1 nowrap'>Støttespillere</div>
                        <h4 className='mt-1 font-weight-bolder'>
                          {numberSpacing(orgStats?.total_supporters!)}
                        </h4>
                      </div>
                     
                    </div>
                  </div>
                  
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className='d-flex flex-column flex-lg-row'>
        <div className='flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10'>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-body'>
              <div id='kt_user_view_details' className='collapse show'>
                <div className='pb-5 fs-6'>
                  <div className='fw-bold mt-5'>Klubb leder</div>

                  <div className='text-gray-600'>
                    {organisation?.leader?.includes('undefined undefined')
                      ? ''
                      : organisation?.leader}
                  </div>
                  <div className='fw-bold mt-5'>Email</div>
                  <div className='text-gray-600'>
                    <a href='#' className='text-gray-600 text-hover-primary'>
                      {organisation?.email}
                    </a>
                  </div>
                  <div className='fw-bold mt-5'>Address</div>
                  <div className='text-gray-600'>
                    {organisation?.address_line1} <br />
                    {organisation?.address_line2}
                  </div>

                  <div className='fw-bold mt-5'>Website</div>
                  <div className='text-gray-600'>{organisation?.home_page}</div>
                  <div className='fw-bold mt-5'>Telefon</div>
                  <div className='text-gray-600'>{organisation?.mobile_phone}</div>

                  <div className='fw-bold mt-5'>Gren</div>
                  <div className='text-gray-600'>
                    {branches?.map((branch: { sports_category_name: string }) => (
                      <span className=''>
                        {branch?.sports_category_name} <br />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-lg-row-fluid ms-lg-8'>
          <div className='card mb-5 mb-xl-8'>
            <div className='card-header border-0 pt-5 d-flex'>
              <h3 className='card-title align-items-start flex-column '>
                <span className='card-label fw-bold fs-3 mb-1'>Oversikt formål</span>
                <span className='text-muted mt-1 fw-bold fs-7'>
                  Her finner du alle for denne organisasjonen
                </span>
              </h3>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
              {/* begin::Table container */}
              <OrgFormalTable hide={['org']} logo={getLogo(organisation)} org_id={id} />
              {/* end::Table container */}
            </div>
            {/* begin::Body */}
          </div>
        </div>
      </div>

      <div className='card mb-5 mb-xl-8'>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5 d-flex'>
          <h3 className='card-title align-items-start flex-column '>
            <span className='card-label fw-bold fs-3 mb-1'>Støttespillere</span>
            <span className='text-muted mt-1 fw-bold fs-7'>
              Oversikt over alle registrerte støttespillere for denne organisasjonen
            </span>
          </h3>

          <div className='col-md-6'> {/* <OrgStottespillereSearch /> */}</div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <OrgStottespillereTable organisationId={id} />
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>

      <div className='flex-lg-row-fluid ms-lg-12'>
        <div className='card mb-5 mb-xl-12'>
          <div className='card-header border-0 pt-5 d-flex'>
            <h3 className='card-title align-items-start flex-column '>
              <span className='card-label fw-bold fs-3 mb-1'>Brukere org. panelet</span>
              <span className='text-muted mt-1 fw-bold fs-7'>
                Oversikt over alle registrere brukere i org. panelet for denne organisasjonen
              </span>
            </h3>
          </div>

          <div className='card-body py-3'>
            <table className='table align-middle gs-0 gy-4 hoverTable'>
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  <th className='pointer ps-6 rounded-start' style={{ width: '25%' }}>
                    BRUKER
                  </th>
                  <th className='pointer' style={{ width: '15%' }}>
                    ROLLE
                  </th>
                  <th className='pointer ' style={{ width: '15%' }}>
                    TILGANG
                  </th>
                  <th className='pointer ' style={{ width: '15%' }}>
                    MOBIL
                  </th>
                  <th className='pointer rounded-end pe-6' style={{ width: '15%' }}>
                    EPOST
                  </th>
                  <th className=' text-end rounded-end px-4' />
                </tr>
              </thead>
              <tbody>
                {memberData?.data?.map((tbData: any) => (
                  <tr key={tbData?._id}>
                    <td>
                      <div className='d-flex align-items-center'>
                        <div className=' position-relative'>
                          <div
                            className='symbol symbol-50px me-5'
                            style={{ backgroundColor: 'white' }}
                          >
                            {tbData?.image === '' ? (
                              <div
                                className='btn btn-icon btn-custom border'
                                style={{ width: '50px', height: '50px', cursor: 'default' }}
                              >
                                {getInitials(tbData?.first_name, tbData?.last_name)}
                              </div>
                            ) : (
                              <img
                                style={{
                                  borderRadius: '8px',
                                  width: '50px',
                                  height: '50px',
                                  border: '1px solid #eff2f5 !important',
                                  objectFit: 'contain',
                                }}
                                src={tbData?.image}
                                className='align-self-end border'
                                alt=''
                              />
                            )}
                          </div>
                        </div>
                        <div
                          className='d-flex flex-column justify-content-center'
                          style={{ cursor: 'pointer' }}
                        >
                          <div className='fs-6 fw-bold text-dark text-gray-800 fs-6'>
                            {tbData?.first_name} {tbData?.last_name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        onClick={() => {}}
                        className='text-dark text-gray-800 d-block mb-1 fs-6'
                        dangerouslySetInnerHTML={{ __html: tbData?.user_type }}
                      />
                    </td>
                    <td>
                      <a
                        onClick={() => {}}
                        className='text-dark text-gray-800 d-block mb-1 fs-6'
                        dangerouslySetInnerHTML={{
                          __html:
                            tbData?.user_type === 'admin'
                              ? 'Full'
                              : tbData?.sports_list
                                  .map((sport: any, index: number) => {
                                    return (
                                      <React.Fragment key={index}>
                                        {sport?.sports_category_name}
                                        {index !== tbData.sports_list.length - 1 && ', '}
                                      </React.Fragment>
                                    )
                                  })
                                  .join(''),
                        }}
                      />
                    </td>
                    <td>
                      <a
                        onClick={() => {}}
                        className='text-dark text-gray-800 d-block mb-1 fs-6'
                        dangerouslySetInnerHTML={{
                          __html: `+${numberSpacingBetweenTwodDigits(tbData?.mobile_number)}`,
                        }}
                      />
                    </td>
                    <td>
                      <a className='text-dark text-gray-800 d-block mb-1 fs-6'>{tbData?.email}</a>
                    </td>
                    <td style={{ float: 'right' }}>
                      <div className='d-flex flex-shrink-0'>
                        <span
                          id='kt_errormessage_toggle'
                          onClick={() => setSelectedUser(tbData)}
                          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm mx-2 min-w-auto'
                        >
                          <i className='fa-duotone fa-memo-circle-info' />
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ErrorMessageDrawer selectedUser={selectedUser} />
    </>
  )
}
