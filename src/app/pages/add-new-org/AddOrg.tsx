/* eslint-disable @typescript-eslint/no-unused-vars */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import LoadingContext from '../../../_metronic/layout/core/Loading'
import { useAuth } from '../../modules/auth'
import { handleGetRequest, handlePatchRequest, handlePostRequest } from '../../services'
// import UploadModal from './UploadModal'

const AddOrg: React.FC = () => {
  const { currentUser } = useAuth()
  const { loading, setLoading } = useContext(LoadingContext)
  const [showModal, setShowModal] = useState(false)
  const [filetype, setfiletype] = useState('png')
  const [inputs, setInputs] = useState<any>({})
  const [profilePic, setProfilePic] = useState<any>()
  const [orgDetails, setOrgDetails] = useState<any>(null)
  const [desc, setDesc] = useState<any>(null)
  const [buttonEnable, setbuttonEnable] = useState(false)
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

  const handleChange = (event: any) => {
    const { name } = event.target
    const { value } = event.target
    setInputs((values: any) => ({ ...values, [name]: value }))
  }

  useEffect(() => {
    // These fields are required
    if (inputs?.org_name && inputs?.organisation_number && inputs?.email && inputs?.org_type) {
      setbuttonEnable(true)
    } else {
      setbuttonEnable(false)
    }
  }, [inputs])

  const handleClick = async () => {
    const formData = new FormData()
    // These fields are required and we check if specific filed have exist and its value
    if (profilePic) {
      formData.append('logo', profilePic)
    }
    if (desc) {
      formData.append('description', desc)
    } else {
      formData.append('description', '')
    }
    if (inputs?.org_name) {
      formData.append('org_name', inputs?.org_name)
    }
    if (inputs?.organisation_number) {
      formData.append('organisation_number', inputs?.organisation_number)
      formData.append('org_id', inputs?.organisation_number)
      formData.append('reference_id', inputs?.organisation_number)
    }
    if (inputs?.email) {
      formData.append('email', inputs?.email)
    }
    if (inputs?.org_type) {
      formData.append('org_type', inputs?.org_type)
    }
    if (inputs?.members) {
      formData.append('members', inputs?.members)
    }
    if (inputs?.mobile_phone) {
      formData.append('mobile_phone', inputs?.mobile_phone)
    }
    if (inputs?.address_line1) {
      formData.append('address_line1', inputs?.address_line1)
    }
    if (inputs?.home_page) {
      formData.append('home_page', inputs?.home_page)
    }
    if (inputs?.city) {
      formData.append('city', inputs?.city)
    }

    formData.append('country', 'Norge')
    formData.append('country_id', '1500152')
    formData.append('post_code', '1769')

    if (buttonEnable) {
      const { success } = await handlePostRequest(`/organisation/create`, formData)(setLoading)
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0 cursor-pointer '>
        <div className='card-title m-0 '>Org Informasjon </div>
        <div className='card-title m-0 float-right' />
      </div>

      <div id='kt_account_profile_details' className='collapse show'>
        <form noValidate className='form'>
          <div className='card-body border-top p-9'>
            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-semibold fs-6'>Logo</label>
              <div className='col-lg-9'>
                <div
                  className='image-input image-input-outline image-input-placeholder'
                  data-kt-image-input='true'
                >
                  <div
                    className='image-input-wrapper w-125px h-125px p-1 d-flex align-items-center'
                    style={{ border: '1px solid #c6e0ec' }}
                  >
                    <img
                      src={
                        profilePic
                          ? URL.createObjectURL(profilePic)
                          : orgDetails?.logo
                            ? orgDetails?.logo
                            : orgDetails?.org_logo_base64
                              ? `data:image/png;base64, ${orgDetails?.org_logo_base64}`
                              : 'https://via.placeholder.com/150'
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
                      className='btn-active-color-primary bg-body shadow h-5 w-5'
                      data-kt-image-input-action='change'
                      data-bs-toggle='tooltip'
                      aria-label='Change avatar'
                      data-bs-original-title='Change avatar'
                      data-kt-initialized={1}
                      style={{
                        borderRadius: '8px',
                        width: '2.5rem',
                        height: '2.5rem',
                      }}
                    >
                      <i
                        className='bi bi-pencil-fill fs-7'
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                      <input
                        type='file'
                        name='picture'
                        accept='.png, .jpg, .jpeg'
                        onChange={(e) => ChangeProfilePic(e)}
                      />
                    </label>
                  </>
                </div>
                <div className='form-text'>Tillatt filtype: jpg, jpeg, png.</div>
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                Navn på organisasjonen:{' '}
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  type='text'
                  name='org_name'
                  onChange={handleChange}
                  className='form-control form-control-lg form-control-solid'
                  placeholder=''
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Org. nummer:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  onChange={handleChange}
                  name='organisation_number'
                  type='tel'
                  className='form-control form-control-lg form-control-solid'
                  placeholder=''
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Type:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                {/* <div className='d-flex align-items-center mt-3'> */}
                <select
                  className='form-control form-control-lg form-control-solid'
                  onChange={handleChange}
                  name='org_type'
                >
                  <option value=''>Velg Org Type</option>
                  <option value='Sport'>Idrett</option>
                  <option value='Charity'>Veldedighet</option>
                  <option value='Band'>Korps</option>
                  <option value='Scouts'>Speider</option>
                  <option value='Other'>Annet</option>
                </select>
                {/* </div> */}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Org. beskrivelse:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <CKEditor
                  editor={ClassicEditor}
                  data={desc || ''}
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
                  onChange={(event, editor) => {
                    const data: any = editor.getData()
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
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Medlemmer:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  name='members'
                  onChange={handleChange}
                  type='number'
                  min={0}
                  placeholder='0'
                  className='form-control form-control-lg form-control-solid'
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>E-post daglig leder:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  name='email'
                  onChange={handleChange}
                  type='email'
                  className='form-control form-control-lg form-control-solid'
                  placeholder=''
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Mobil daglig leder:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  name='mobile_phone'
                  type='text'
                  onChange={handleChange}
                  className='form-control form-control-lg form-control-solid'
                  placeholder=''
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Webside:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  type='text'
                  name='home_page'
                  onChange={handleChange}
                  className='form-control form-control-lg form-control-solid'
                  placeholder=''
                />
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>Adresse:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  type='text'
                  name='address_line1'
                  onChange={handleChange}
                  className='form-control form-control-lg form-control-solid'
                />
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-3 col-form-label fw-bold fs-6'>
                <span className=''>By:</span>
              </label>

              <div className='col-lg-9 fv-row'>
                <input
                  style={{ borderRadius: '8px' }}
                  type='text'
                  name='city'
                  onChange={handleChange}
                  className='form-control form-control-lg form-control-solid'
                />
              </div>
            </div>
          </div>

          {currentUser?.user?.user_type !== 'manager' && (
            <div
              className='card-footer d-flex justify-content-end py-6 px-9'
              style={{ borderTop: 'none', marginTop: '-4%' }}
            >
              <button
                type='button'
                className='btn btn-lg btn-primary authbgcolor'
                disabled={!buttonEnable}
                onClick={handleClick}
              >
                {!loading && 'Lag ny organisasjonen'}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddOrg
