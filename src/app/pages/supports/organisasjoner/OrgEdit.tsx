/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import {handleGetRequest, handlePatchRequest} from '../../../services'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import {toast} from 'react-toastify'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import moment from 'moment'
import UploadModal from './UploadModal'
export default function OrgEdit() {
  const {id} = useParams<{id: string}>()
  const {loading, setLoading} = useContext(LoadingContext)
  const [fetchData, setFetchData] = useState<any>({})
  const [profilePic, setProfilePic] = useState<any>(null)
  const {setBreadcrumbs} = useContext(BreadcrumbsContext)
  const [showModal, setShowModal] = useState(false)
  const [filetype, setfiletype] = useState('png')
  const navigate = useNavigate()
  
  const ChangeProfilePic = (e: any) => {
    const fileExtensions = ['png', 'jpg', 'jpeg']
    const fileName = e.target.files[0].name
    const fileExtension = fileName.split('.').pop()
    const fileSize = e.target.files[0].size
    const maxFileSize = 2 * 1024 * 1024 // 2MB in bytes

    if (!fileExtensions.includes(fileExtension)) {
      toast.error('Tillatt filtype: jpg, jpeg, png.')
      return
    }
    setfiletype(fileExtension)

    if (fileSize > maxFileSize) {
      toast.error('Filstørrelsen må være mindre enn 2MB.')
      return
    }

    setProfilePic(e.target.files[0])
    setShowModal(true)
  }
   
  const setCroppedImage = (image: string) => {
    if (!image) {
      setShowModal(false)
      setProfilePic(null)
      return
    }
    setShowModal(false)
    fetch(image)
      .then((response) => response.blob())
      .then((blob) => {
        const file = new File([blob], profilePic.name, {type: profilePic.type})
        setProfilePic(file)
      })
      .catch((error) => console.error(error))
  }

  const getOrgDetails = async () => {
    const {data} = await handleGetRequest(`/organisation/${id}`)(setLoading)
    if (data) {
      setFetchData(data)
      setBreadcrumbs([
        {isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home'},
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
    } else {
      setLoading(false)
    }
  }

  const handleClick = async () => {
    const formData = new FormData()
    if (profilePic) formData.append('logo', profilePic)
    if (desc) {
      formData.append('description', desc)
    } else {
      formData.append('description', '')
    }

    // if (formData.has('logo') || formData.has('description')) {
    const {success} = await handlePatchRequest(`/organisation/${id}`, formData, {
      'Content-Type': 'multipart/form-data',
    })(setLoading)
    if (success) {
      getOrgDetails()
      // navigate('/home/organisasjoner')
    } else {
      setLoading(false)
    }
    //}
  }

  const delProfilePic = async () => {
    try {
      const formData = new FormData()
      formData.append('logo', '')
      const {success} = await handlePatchRequest(`/organisation/${id}`, formData, {
        'Content-Type': 'multipart/form-data',
      })(setLoading)
      if (success) {
        getOrgDetails()
      }
    } catch (error: any) {
      toast.error(JSON.stringify(error?.response?.data))
      setLoading(false)
    }
  }

  const [desc, setDesc] = useState<any>(null)

  useEffect(() => {
    getOrgDetails()
  }, [])

  useEffect(() => {
    setDesc(fetchData?.description)
  }, [fetchData?.description])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <div>
          <h3 className='fw-bolder my-2'>Org. detaljer</h3>
          <div className=' fontsizechfslogtime d-flex align-items-center text-gray-400  me-5 '>
            En oversikt over alle styrene du er medlem av og alt som trenger din oppmerksomhet.
          </div>
        </div>

        {profilePic && showModal && (
          <UploadModal
            setImage={setCroppedImage}
            imagetype={filetype}
            image={URL.createObjectURL(profilePic)}
          />
        )}

        <div className='d-flex flex-wrap my-2'>
          <div className='me-4'></div>
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
        <div className='card mb-5 mb-xl-10'>
          <div className='card-header border-0 cursor-pointer '>
            <div className='card-title m-0 '>Org. information</div>
            <div className='card-title m-0 float-right'></div>
          </div>

          <div id='kt_account_profile_details' className='collapse show'>
            <form noValidate className='form'>
              <div className='card-body border-top p-9'>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-semibold fs-6'>Logo</label>
                  <div className='col-lg-8'>
                    <div
                      className='image-input image-input-outline image-input-placeholder'
                      data-kt-image-input='true'
                    >
                      <div className='image-input-wrapper w-125px h-125px p-1 d-flex align-items-center'>
                        <img
                          src={
                            profilePic
                              ? URL.createObjectURL(profilePic)
                              : fetchData?.logo
                              ? fetchData?.logo
                              : (fetchData?.org_logo_base64 &&
                                  `data:image/png;base64, ` + fetchData?.org_logo_base64) ||
                                'https://image.kpopmap.com/2019/08/jhope.jpg'
                          }
                          alt='Profile pic'
                          style={{
                            width: '100%',  
                            height: '9rem',
                            objectFit: 'contain',
                          }}
                        />
                      </div>

                      <>
                        <label
                          className='  btn-active-color-primary
                       w-25px h-25px bg-body shadow'
                          data-kt-image-input-action='change'
                          data-bs-toggle='tooltip'
                          aria-label='Change avatar'
                          data-bs-original-title='Change avatar'
                          data-kt-initialized={1}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '15px',
                            borderRadius: '8px',
                          }}
                        >
                          <i className='bi bi-pencil-fill fs-7' />
                          <input
                            type='file'
                            name='picture'
                            accept='.png, .jpg, .jpeg'
                            onChange={(e) => ChangeProfilePic(e)}
                          />
                        </label>
                        <label
                          className=' btn-active-color-primary w-25px h-25px bg-body shadow'
                          style={{
                            position: 'absolute',
                            top: 104,
                            left: 112,
                            display: 'inline-flex',
                            cursor: 'pointer',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '15px',
                            borderRadius: '8px',
                          }}
                          onClick={() => delProfilePic()}
                        >
                          <i className='bi bi-x-lg fs-7' />
                        </label>
                      </>
                    </div>
                    <div className='form-text'>Tillatt filtype: png, jpg, jpeg</div>
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>
                    Org. Navn:{' '}
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      type='text'
                      value={fetchData?.org_name}
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className='required'>Org. nummer:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      value={fetchData?.organisation_number}
                      type='tel'
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className='required'>Org. beskrivelse:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <CKEditor
                      id='displayEditor'
                      editor={ClassicEditor}
                      config={{
                        toolbar: [
                          'heading',
                          '|',
                          'bold',
                          'italic',
                          'blockQuote',
                          'numberedList',
                          'bulletedList',
                          '|',
                          'undo',
                          'redo',
                        ],
                      }}
                      data={desc || ''}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setDesc(data)
                      }}
                    /> 
                     <span>
                  Informasjonen du legger ut her vil bli vist på alle formål sider og i
                  støtte-appen.
                </span>
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className='required'>Konto nummer:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      value={fetchData?.account_no}
                      type='tel'
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className='required'>E-post daglig leder:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      value={fetchData?.email}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className='required'>Mobil daglig leder:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      value={fetchData?.mobile_phone}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className=''>Webside:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      disabled={true}
                      value={fetchData?.home_page}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder=''
                    />
                  </div>
                </div>
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className=''>Adresse:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      style={{borderRadius: '8px'}}
                      disabled={true}
                      value={fetchData?.address_line1}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                    />
                    <input
                      style={{borderRadius: '8px', marginTop: '16px'}}
                      disabled={true}
                      value={fetchData?.post_code || ' ' + '  ' + fetchData?.city || ''}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                    />
                  </div>
                </div>

                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    <span className=''>VIPPS onboarding:</span>
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <input
                      style={{borderRadius: '8px'}}
                      disabled={true}
                      value={`${fetchData?.msn_status} - ${moment
                        .utc(fetchData?.msn_date)
                        .format('DD.MM.YYYY')}`}
                      type='text'
                      className='form-control form-control-lg form-control-solid'
                      placeholder='
                 '
                    />
                  </div>
                </div>

                {/* <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label fw-bold fs-6'>
                    Varlser og kommunikasjon{' '}
                  </label>

                  <div className='col-lg-8 fv-row'>
                    <div className='d-flex align-items-center mt-3'>
                      <label className='form-check form-check-inline form-check-solid me-5'>
                        <input
                          disabled={true}
                          className='form-check-input'
                          name='communication[]'
                          type='checkbox'
                        />
                        <span className='fw-bold ps-2 fs-6'>E-post</span>
                      </label>

                      <label className='form-check form-check-inline form-check-solid'>
                        <input
                          disabled={true}
                          className='form-check-input'
                          name='communication[]'
                          type='checkbox'
                        />
                        <span className='fw-bold ps-2 fs-6'>Mobil</span>
                      </label>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='button'
                  className='btn btn-primary'
                  disabled={loading}
                  onClick={handleClick}
                >
                  {!loading && 'Lagre endringer'}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </>
  )
}