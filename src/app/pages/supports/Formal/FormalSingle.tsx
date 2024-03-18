/* eslint-disable jsx-a11y/anchor-is-valid */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import moment from 'moment'
import {useContext, useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {numberSpacing, toAbsoluteUrl} from '../../../../_metronic/helpers'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {Modal} from 'react-bootstrap'
import {
  handleDeleteRequest,
  handleGetRequest,
  handleGetRequestWithoutRefresh,
} from '../../../services'
import FormalStottespillereSearch from './FormalStottespillereSearch'
import FormalStottespillereTable from './FormalStottespillereTable'
import {useAuth} from '../../../modules/auth'

export default function FormalSingle() {
  const {setLoading} = useContext(LoadingContext)
  const {currentUser} = useAuth()
  const [organisation, setOrganisation] = useState<any>()
  const [formal, setFormal] = useState<any>()
  const [statsData, setStatsData] = useState<any>()
  const [bannerImage, setBannerImage] = useState<any>()
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false)
  const {id} = useParams()
  const {setBreadcrumbs} = useContext(BreadcrumbsContext)
  const navigation = useNavigate()

  const getOrgDetails = async (organisation_id: string) => {
    const {data} = await handleGetRequest(`/organisation/${organisation_id}`)(setLoading)
    setOrganisation(data)
    getLogo()
  }

  const getGoalDetails = async () => {
    const {data} = await handleGetRequestWithoutRefresh(`/goal/get_goal_admin/${id}`)(setLoading)
    getStats(data?.organisation_id)
    setBannerImage(data?.banner_image)
    getOrgDetails(data?.organisation_id)
    setFormal(data)

    setBreadcrumbs([
      {isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home'},
      {
        isActive: false,
        isSeparator: false,
        path: '/home/formal',
        title: 'Støtte',
      },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/formal',
        title: 'Formål',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/formal',
        title: data?.title,
      },
    ])
  }

  const getStats = async (organisation_id: string) => {
    const {data} = await handleGetRequestWithoutRefresh(
      `/organisation/stats_admin/${organisation_id}`
    )(setLoading)
    setStatsData(data)
  }

  const handleDelete = async () => {
    const {success} = await handleDeleteRequest(`/goal/delete_goal_admin/${id}`)(setLoading)
    if (success) navigation('/home/formal')
  }

  const getDates = () => {
    if (formal) {
      const {start_date, due_date} = formal
      //if date is 3024-01-01T00:00:00.000+00:00 then don't return anything else start_date and due_date
      if (due_date === '3024-01-01T00:00:00.000Z' || due_date == null || due_date == '') {
        return moment(start_date).format('DD.MM.YYYY')
      } else {
        return `${moment(start_date).format('DD.MM.YYYY')} - ${moment(due_date).format(
          'DD.MM.YYYY'
        )}`
      }
    }
  }

  const getTargetAmount = () => {
    if (formal?.target_amount) {
      const amount = numberSpacing(formal?.target_amount)
      return `${amount}`
    }
    return 0
  }

  // const getLogo = (): void => {
  //   if (organisation?.logo) {
  //     setLogo(organisation?.logo)
  //   }
  //   if (organisation?.org_logo_base64) {
  //     setLogo(`data:image/png;base64,${organisation?.org_logo_base64}`)
  //   }
  // }

  const getLogo = (): string => {
    if (organisation?.logo) {
      return organisation?.logo
    }
    if (organisation?.org_logo_base64) {
      return 'data:image/png;base64,' + organisation?.org_logo_base64
    }
    return toAbsoluteUrl('/media/misc/logo-missing.jpeg')
  }

  const getHeaderImage = (): string => {
    return `url(${bannerImage || toAbsoluteUrl('/media/misc/Header-1.jpg')})`
  }

  useEffect(() => {
    getGoalDetails()
  }, [])
  const url = 'https://org.stotte.no/parker/' + organisation?.organisation_number + '/' + id
  const shareURL = () => {
    window.open(url, '_blank')
  }

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Formål detaljer</h3>

        <div className='d-flex flex-wrap my-2'>
          <Link to={`/home/formal`} className='btn btn-primary btn-md me-4'>
            Formål oversikt
          </Link>
          <button
            type='button'
            className='btn btn-md btn-primary me-4'
            style={{height: '46px', borderRadius: '8px'}}
            onClick={() => navigation(`/home/formalEdit/${id} `)}
          >
            Rediger formål
          </button>
          {formal?.total_supporter_player < 1 && formal?.general_stotte == false && (
            <button
              className='btn btn btn-md slett '
              onClick={() => {
                setShowModalConfirm(true)
              }}
            >
              Slett
            </button>
          )}

          {/* <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a> */}
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
      <>
        <div className={`card mb-5 mb-xl-8`}>
          <div className='modal-content'>
            <div className='modal-body px-10 py-8'>
              <div
                className={`card card-xl-stretch mb-xl-10 card_borderC`}
                style={{
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: getHeaderImage(),
                  borderRadius: '8px',
                }}
              >
                {/* begin::Body */}
                <div className='p-5 d-flex flex-column'>
                  {/* begin::Wrapper */}
                  <div
                    className='d-flex flex-column flex-grow-1'
                    style={{height: 100, minHeight: 100, width: '100%'}}
                  ></div>

                  <div className='pt-5'>
                    <div className='d-flex ' style={{alignItems: 'center'}}>
                      <div
                        className='card bg-white me-3 p-2'
                        style={{border: '2px solid #F1F2F9', borderRadius: '8px'}}
                      >
                        <img
                          src={toAbsoluteUrl('/media/logos/slogo.jpg')}
                          alt='logo'
                          className=' h-60px logo svg-icon-cufs '
                          style={{width: '60px', objectFit: 'contain'}}
                        />
                      </div>

                      <div
                        className='card bg-white me-3 p-2'
                        style={{border: '2px solid #F1F2F9', borderRadius: '8px'}}
                      >
                        <img
                          src={getLogo()}
                          alt='logo'
                          className=' h-60px logo svg-icon-cufs '
                          style={{width: '60px', objectFit: 'contain'}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex g-0 gap-0 mb-4 bottom-4' style={{marginBottom: '3rem'}}>
                <div className='col-2'>
                  <div className='d-flex '>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone  fa-bullseye fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-24 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Innsamlingsmål
                      </div>
                      <div
                        className='fs-24  fw-bold'
                        style={{color: '#000000', marginTop: '5px', fontSize: '14px'}}
                      >
                        {getTargetAmount()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='d-flex'>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone  fa-wallet fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-24 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Innsamlet
                      </div>
                      <div
                        className='fs-23  fw-bold'
                        style={{color: '#000000', marginTop: '5px', fontSize: '14px'}}
                      >
                        {formal?.support_total_amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='d-flex'>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone fa-credit-card fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-23 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Utestående trekk
                      </div>
                      <div
                        className='fs-23  fw-bold'
                        style={{color: '#000000', marginTop: '5px', fontSize: '14px'}}
                      >
                        {formal?.support_total_pending_amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='d-flex'>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone fa-circle-exclamation-check fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-23 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Reserverte trekk
                      </div>
                      <div
                        className='fs-23  fw-bold'
                        style={{color: '#000000', marginTop: '5px', fontSize: '14px'}}
                      >
                        {formal?.support_total_reserved_amount}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='d-flex '>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone  fa-users fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-24 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Støttespillere
                      </div>
                      <div
                        className='fs-24  fw-bold'
                        style={{color: '#000000', marginTop: '5px', fontSize: '14px'}}
                      >
                        {formal?.total_active_supporter_player}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='col-2'>
                  <div className='d-flex'>
                    <div className='symbol symbol-40px me-3'>
                      <div className='d-flex align-items-center bg-white bg-opacity-50'>
                        <i className='fa-duotone  fa-calendar-check fs-2'></i>
                      </div>
                    </div>

                    <div>
                      <div
                        className='fs-24 text-dark fw-bolder lh-1'
                        style={{color: '#000000', fontSize: '14px'}}
                      >
                        Varighet
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
                        {getDates()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row gy-5 g-xl-10'>
                <div className='col-xl-8'>
                  <h3
                    className='fw-bolder my-2'
                    style={{marginBottom: '0.9rem', marginTop: '2rem'}}
                  >
                    {formal?.organisation_sport_name
                      ? formal?.organisation_sport_name + ': ' + formal?.title
                      : ''}
                  </h3>

                  <div
                    className=' fontsizechfslogtime d-flex align-items-center text-gray-600  me-5 my-2 presentation '
                    // dangerouslySetInnerHTML={{__html: formal?.short_description}}
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      data={formal?.short_description ? formal.short_description : ''}
                      id='displayEditor'
                      disabled={true}
                      config={{toolbar: []}}
                      onReady={(editor) => {
                        console.log('ss', editor)
                      }}

                      // set height for editor
                    />
                  </div>
                  {/* 
                  <div className='d-flex mt-20 app-logos'>
                   

                    <img
                      src={toAbsoluteUrl('/media/misc/Play store logo.png')}
                      alt='logo'
                      className='logo svg-icon-cufs'
                      style={{
                        height: '38px',
                        width: '100%',
                      }}
                    />

                    <img
                      src={toAbsoluteUrl('/media/misc/App store logo.png')}
                      alt='logo'
                      className=' logo svg-icon-cufs ms-1'
                      style={{
                        height: '38px',
                        width: '100%',
                      }}
                    />
                  </div> */}
                </div>
                <div className='col-xl-4'>
                  <div className='col-lg-12 bg-light rounded-4 p-6 '>
                    <div className='d-flex align-items-center'>
                      <div
                        className='card svg-icon-1 svg-icon-dark me-4 rounded-3 border border-1 border-gray-300 d-flex justify-content-center align-items-center '
                        style={{
                          border: '2px solid #F1F2F9',
                          borderRadius: '12px',
                          height: '55px',
                          width: '55px',
                        }}
                      >
                        <img
                          src={getLogo()}
                          className=' logo svg-icon-cufs '
                          style={{
                            height: '40px',
                            width: '40px',
                            objectFit: 'contain',
                          }}
                          alt=''
                        />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark fw-bolder  mb-1 fs-6'>
                          {organisation?.org_name}

                          {/* - {formal?.organisation_sport_name} */}
                        </span>
                        <span className='text-muted fw-bold text-muted d-block fs-7'>
                          Org nr : {organisation?.organisation_number}
                        </span>
                      </div>
                    </div>
                    <div
                      className=' fontsizechfslogtime d-flex align-items-center text-gray-400 pt-5 
                     presentation'
                    >
                      <CKEditor
                        editor={ClassicEditor}
                        data={organisation?.description ? organisation.description : ''}
                        id='displayEditor'
                        disabled={true}
                        config={{toolbar: []}}
                        onReady={(editor) => {
                          console.log('ss', editor)
                        }}
                        // set height for editor
                      />

                      {/* {organisation?.description} */}
                    </div>
                    <h6 className='fw-bolder mt-8 mb-4'>Litt om oss</h6>
                    <div className='d-flex align-items-center  my-5'>
                      {/*begin::Symbol*/}
                      <div className='symbol symbol-40px '>
                        <div className='symbol-label  w-100 h-100 '>
                          <div
                            // src={toAbsoluteUrl('/media/misc/group.png')}
                            className='card svg-icon-1 svg-icon-dark me-4 rounded-3 border border-1 border-gray-300
                            d-flex justify-content-center align-items-center
                            '
                            // alt=''
                            style={{
                              width: '55px',
                              height: '55px',
                            }}
                          >
                            <i className='fa-duotone fa-bullseye fs-2'></i>
                          </div>
                        </div>
                      </div>
                      {/*end::Symbol*/}

                      {/*begin::Title*/}
                      <div>
                        <div className='fs-22 text-dark fw-bolder lh-1'>Tilgjengelige formål</div>
                        <h4 className='fs-20 text-gray-800 fw-bold'>
                          {statsData?.total_active_goals}
                        </h4>
                      </div>
                      {/*end::Title*/}
                    </div>

                    <div className='d-flex align-items-center my-3'>
                      {/*begin::Symbol*/}
                      <div className='symbol symbol-40px '>
                        <div className='symbol-label   w-100 h-100  '>
                          <div
                            // src={toAbsoluteUrl('/media/misc/group.png')}
                            className='card svg-icon-1 svg-icon-dark me-4 rounded-3 border border-1 border-gray-300
                            d-flex justify-content-center align-items-center
                            '
                            // alt=''
                            style={{
                              width: '55px',
                              height: '55px',
                            }}
                          >
                            <i className='fa-duotone fa-users fs-2'></i>
                          </div>
                        </div>
                      </div>
                      {/*end::Symbol*/}

                      {/*begin::Title*/}
                      <div>
                        <div className='fs-22 text-dark fw-bolder lh-1'>Støttespillere totalt</div>
                        <h4 className='fs-20 text-gray-800 fw-bold'>
                          {statsData?.total_active_supporters}
                        </h4>
                      </div>
                      {/*end::Title*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='modal-footer footericons'>
              <div className='row footericonsrow'>
                <div className='col-md-5'>
                  <ul className='icons-ul'>
                    <li>
                      <a href='https://apps.apple.com/no/app/stotte/id6467891480' target='_blank'>
                        <i
                          className='fa-brands fa-apple'
                          style={{color: 'black', fontSize: '20px'}}
                        ></i>{' '}
                        Last for iOS
                      </a>
                    </li>
                    <li>
                      <a
                        className='item-2'
                        href='https://play.google.com/store/apps/details?id=com.stotte'
                        target='_blank'
                      >
                        <i
                          className='fa-brands fa-google-play'
                          style={{color: 'black', fontSize: '20px'}}
                        ></i>{' '}
                        Last for Android{' '}
                      </a>
                    </li>
                  </ul>
                  {/* <div className='d-flex app-logos'>
                <img
                  src={toAbsoluteUrl('/media/misc/Play store logo.png')}
                  alt='logo'
                  className='  logo svg-icon-cufs '
                  style={{width: '153px', height: '43px', objectFit : 'cover'}}
                />

                <img
                  src={toAbsoluteUrl('/media/misc/App store logo.png')}
                  alt='logo'
                  className=' logo svg-icon-cufs '
                  style={{width: '153px', height: '43px',objectFit : 'cover'}}
                />
              </div> */}
                </div>
                <div className='col-md-5'></div>
                <div className='col-md-2'>
                  <ul className='icons-ul' style={{float: 'right'}}>
                    <li>
                      <a className='item-2' href='javascript:;' onClick={() => shareURL()}>
                        <i
                          className='fa-regular fa-share-nodes'
                          style={{color: 'black', fontSize: '20px'}}
                        ></i>{' '}
                        Del formål{' '}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`card mb-5 mb-xl-8`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5 d-flex'>
            <h3 className='card-title align-items-start flex-column '>
              <span className='card-label fw-bold fs-3 mb-1'>Støttespillere</span>
              <span className='text-muted mt-1 fw-bold fs-7'>
                Oversikt over alle registrerte støttespillere for denne organisasjonen
              </span>
            </h3>

            <div className='col-md-6'> {/* <FormalStottespillereSearch /> */}</div>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body py-3'>
            {/* begin::Table container */}
            <FormalStottespillereTable goalId={id} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>

        <Modal
          show={showModalConfirm}
          onHide={() => setShowModalConfirm(false)}
          size='lg'
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h5 className='modal-title'>Slett formål</h5>
            </Modal.Title>
          </Modal.Header>
          <div className='modal-body'>
            Er du sikker på at du vil slette dette formålet? Denne handlingen kan ikke angres.
            <br />
            <br />
            <br />
            <button
              type='button'
              className='btn  avbryt me-3'
              onClick={() => {
                setShowModalConfirm(false)
              }}
            >
              Avbryt
            </button>
            <button
              type='button'
              style={{float: 'right'}}
              onClick={() => {
                handleDelete()
              }}
              className='btn slett '
            >
              Ja, slett
            </button>
          </div>
        </Modal>
      </>
    </>
  )
}
