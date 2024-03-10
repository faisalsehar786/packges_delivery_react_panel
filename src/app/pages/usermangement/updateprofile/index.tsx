/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import toastr from '../../../../toaster'
import { setAuth, useAuth } from '../../../modules/auth'
import { handleGetRequest, handlePatchRequest } from '../../../services'

export const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  company: '',
  contactPhone: '',
  companySite: '',
  currency: '',
  // communication: 'email',
  role: '',
  password: '',
  confirm_password: '',
}

const profileDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  // company: Yup.string().required('Company name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  mobile_number: Yup.string().required('Contact phone is required'),
  //   role: Yup.string().required('Role is required'),
  password: Yup.string().notRequired(),
  // communication: Yup.string().required('Communication is required'),
  confirm_password: Yup.string().when('password', {
    is: (password: any) => {
      return password && password.length > 0
    },
    then: Yup.string().oneOf([Yup.ref('password')], 'Password does not match'),
  }),
})

const UpdateProfileDetails: React.FC = () => {
  const [data, setData] = useState<any>(initialValues)
  const [picture, setPicture] = useState<any>(null)
  const { loading, setLoading } = useContext(LoadingContext)
  const [passread, setpassread] = useState(true)
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
  const { setCurrentUser, currentUser } = useAuth()

  const formik = useFormik<any>({
    initialValues: data,
    validationSchema: profileDetailsSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors }) => {
      const formData = new FormData()

      formData.append('first_name', values.first_name)
      formData.append('last_name', values.last_name)
      // formData.append('company', values.company)
      formData.append('email', values.email)
      formData.append('mobile_number', values.mobile_number)
      if (!values?.confirm_password && values?.password !== values?.confirm_password) {
        setErrors({ confirm_password: 'yes' })
        return
      }

      if (values?.password && !passread && values?.confirm_password)
        formData.append('password', values.password)
      formData.append('picture', picture)
      const { data } = await handlePatchRequest(
        `/admin/update_profile/${currentUser?.user?._id}`,
        formData,
        {}
      )(setLoading)
      if (data) {
        const cr = JSON.parse(JSON.stringify(currentUser))
        cr.user.image = data.image
        cr.user.first_name = data.first_name
        cr.user.last_name = data.last_name
        setCurrentUser(cr)
        setAuth(cr)
        localStorage.setItem('currentUser', JSON.stringify(cr))

        // return navigation('/user-mangement/user-overview')
      }
    },
  })

  const getPicture = () => {
    if (typeof picture === 'string' && picture.includes('http')) {
      return picture
    }
    if (picture instanceof File) {
      return URL.createObjectURL(picture)
    }
  }

  const ChangeProfilePic = async (e: any) => {
    //  png, jpeg, jpg og gif.

    const fileExtensions = ['png', 'jpg', 'jpeg']
    const fileName = e.target.files[0].name
    const fileExtension = fileName.split('.').pop()
    const fileSize = e.target.files[0].size
    const maxFileSize = 4 * 1024 * 1024 // 2MB in bytes

    if (!fileExtensions.includes(fileExtension)) {
      toast.error('Tillatt filtype: jpg, jpeg, png.', { autoClose: 4000 })
      e.target.value = ''
      return false
    }

    if (fileSize > maxFileSize) {
      toast.error(
        'Bildet du prøver å laste opp er for stort. Vennligst last opp et bilde som er mindre enn 4MB.',
        { autoClose: 4000 }
      )
      e.target.value = ''
      return false
    }
    setPicture(e.target.files[0])
  }

  const delProfilePic = async () => {
    try {
      const { data } = await handlePatchRequest(
        `/admin/update_profile/${currentUser?.user?._id}`,
        {
          image: '',
        },
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
        }
      )(setLoading)
      if (data) {
        setPicture('')
        const cr = currentUser
        cr.user.image = data.image
        cr.user.first_name = data.first_name
        cr.user.last_name = data.last_name
        setCurrentUser(cr)
        setAuth(cr)
        localStorage.setItem('currentUser', JSON.stringify(cr))

        // return navigation('/user-mangement/user-overview')
      }
    } catch (error: any) {
      setLoading(false)
      toastr.error(JSON.stringify(error?.response?.data))
    }
  }

  useEffect(() => {
    setData({
      ...data,
      ...{ password: passread ? '************' : '' },
      ...{ confirm_password: passread ? '************' : '' },
    })
  }, [passread])
  const getUser = async () => {
    const { data } = await handleGetRequest(`/admin`)(setLoading)
    setData({
      first_name: data.first_name,
      last_name: data.last_name,
      // company: data.company,
      email: data.email,
      mobile_number: data.mobile_number,
      role: data.user_type,
      password: '************',
      confirm_password: '************',
      // communication: data.communication,
    })
    setPicture(data.image)
    currentUser.user.image = data.image
    setCurrentUser(currentUser)
    setAuth(currentUser)
    localStorage.setItem('currentUser', JSON.stringify(currentUser))
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/user-mangement/user-overview',
        title: 'Brukere',
      },
      {
        isActive: true,
        isSeparator: true,
        path: `/user-mangement/user-overview/update-profile`,
        title: `${data?.first_name} ${data?.last_name}`,
      },
    ])
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Oppdatere bruker </h3>

        <div className='d-flex flex-wrap my-2'>
          <div className=''>
            <Link to='/user-mangement/user-overview' className='btn btn-primary'>
              <i className='bi bi-person-plus-fill iconbtnStylecx  me-2' />
              Oversikt brukere
            </Link>
          </div>
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
      <div className='card mb-5 mb-xl-10'>
        <div
          className='card-header border-0'
          data-bs-toggle='collapse'
          data-bs-target='#kt_account_profile_details'
          aria-expanded='true'
          aria-controls='kt_account_profile_details'
        >
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>Bruker innstillinger</h3>
          </div>
        </div>

        <div id='kt_account_profile_details' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='card-body border-top p-9'>
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>Profil bilde</label>
                <div className='col-lg-8'>
                  <div
                    className='image-input image-input-outline  w-125px h-125px d-flex 
                align-items-center justify-content-center
                '
                    data-kt-image-input='true'
                  >
                    {getPicture() ? (
                      <img
                        className='image-input-wrapper w-125px h-125px p-1'
                        src={getPicture()}
                        alt='avatar'
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <i
                        className='fa-duotone fa-user-astronaut  fs-90px
                    
                    '
                      />
                    )}
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
                    <label
                      className='btn-active-color-primary bg-body shadow h-5 w-5'
                      style={{
                        padding: '7px 10px',
                        position: 'absolute',
                        top: 99,
                        left: 110,
                        cursor: 'pointer',
                        borderRadius: 8,
                        width: '2.5rem',
                        height: '2.5rem',
                      }}
                      onClick={() => delProfilePic()}
                    >
                      <i className='bi bi-x-lg fs-7' />
                    </label>
                  </div>
                  <div>
                    <div className='form-text'>Tillatt filtype: jpg, jpeg, png.</div>
                    <div className='form-text'>Max størrelse: 4MB.</div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'> Fult navn: </label>

                <div className='col-lg-8'>
                  <div className='row'>
                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className={clsx(
                          'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                          {
                            'is-invalid': formik.touched.first_name && formik.errors.first_name,
                          }
                        )}
                        placeholder='Fornavn'
                        {...formik.getFieldProps('first_name')}
                      />
                    </div>

                    <div className='col-lg-6 fv-row'>
                      <input
                        type='text'
                        className={clsx('form-control form-control-lg form-control-solid', {
                          'is-invalid': formik.touched.last_name && formik.errors.last_name,
                        })}
                        placeholder='Etternavn'
                        {...formik.getFieldProps('last_name')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>E-post</label>

                <div className='col-lg-8 fv-row'>
                  <input
                    disabled
                    type='email'
                    className={clsx('form-control form-control-lg form-control-solid', {
                      'is-invalid': formik.touched.email && formik.errors.email,
                    })}
                    placeholder='E-post'
                    {...formik.getFieldProps('email')}
                  />
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Telefon</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='tel'
                    className={clsx('form-control form-control-lg form-control-solid', {
                      'is-invalid': formik.touched.mobile_number && formik.errors.mobile_number,
                    })}
                    placeholder='Telefon'
                    {...formik.getFieldProps('mobile_number')}
                  />
                </div>
              </div>

              {/* Roles */}

              {/* <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Rolle</span>
                </label>

                <div className='col-lg-8 fv-row'> */}
              {/* <div className='d-flex align-items-center mt-3'> */}
              {/* <select
                    className={clsx('form-control form-control-lg form-control-solid', {
                      'is-invalid': formik.touched.role && formik.errors.role,
                    })}
                    {...formik.getFieldProps('role')}
                    onChange={(e) => {
                      formik.setFieldValue('role', e.target.value)
                    }}
                  >
                    <option value=''>Velg rolle</option>
                    <option value='admin'>Admin</option>
                    <option value='manager'>Manager</option>
                  </select> */}
              {/* </div> */}
              {/* </div>
              </div> */}

              {/* password */}
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Passord</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled={passread}
                    className={clsx('form-control form-control-lg form-control-solid', {
                      'is-invalid': formik.touched.password && formik.errors.password,
                    })}
                    placeholder='Passord'
                    {...formik.getFieldProps('password')}
                  />
                </div>
              </div>

              {/* Confirm password */}
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Bekreft passord</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    disabled={passread}
                    className={clsx('form-control form-control-lg form-control-solid', {
                      'is-invalid':
                        formik.touched.confirm_password && formik.errors.confirm_password,
                    })}
                    placeholder='Bekreft passord'
                    {...formik.getFieldProps('confirm_password')}
                  />
                  <i
                    className='bi bi-pencil-square text-info'
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      top: '-97px',
                      left: '97%',
                    }}
                    onClick={() => setpassread(!passread)}
                  />
                </div>
              </div>
            </div>

            <div className='card-footer d-flex justify-content-end py-6 px-9'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {!loading && 'Fullfør'}
                {loading && (
                  <span className='indicator-progress' style={{ display: 'block' }}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2' />
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export { UpdateProfileDetails }
