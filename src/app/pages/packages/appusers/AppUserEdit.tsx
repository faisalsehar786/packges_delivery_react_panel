/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { useAuth } from '../../../modules/auth'
import {
  handleGetRequest,
  handlePatchRequest,
  handlePatchRequestWithOutAlerts,
} from '../../../services'

export const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  mobile_number: '',
  company: '',
  contactPhone: '',
  companySite: '',
  currency: '',

  user_type: '',
  password: '',
  confirm_password: '',
}
const profileDetailsSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  // company: Yup.string().required('Company name is required'),
  email: Yup.string().email('Wrong email format').required('Email is required'),
  mobile_number: Yup.string().required('Contact phone is required'),
  //   user_type: Yup.string().required('Role is required'),
  password: Yup.string().notRequired(),
  // communication: Yup.string().required('Communication is required'),
  confirm_password: Yup.string().when('password', {
    is: (password: any) => {
      return password && password.length > 0
    },
    then: Yup.string().oneOf([Yup.ref('password')], 'Password does not match'),
  }),
})

const AppUserEdit: React.FC = () => {
  const { currentUser } = useAuth()

  const [data, setData] = useState<any>(initialValues)
  const [picture, setPicture] = useState<any>(null)
  const [driver, setDriver] = useState(false)
  const [customer, setCustomer] = useState(false)
  const [passread, setpassread] = useState(true)
  const { loading, setLoading } = useContext(LoadingContext)
  const { id } = useParams<any>()
  const navigation = useNavigate()
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
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
      //   formData.append('user_type', values.role)

      if (!values?.confirm_password && values?.password !== values?.confirm_password) {
        setErrors({ confirm_password: 'yes' })
        return
      }
      if (values?.password && !passread && values?.confirm_password)
        formData.append('password', values.password)
      formData.append('picture', picture)

      const { data } = await handlePatchRequest(`/user/${id}`, formData, {})(setLoading)
      await handlePatchRequestWithOutAlerts(
        `/user/${id}`,
        { user_type: [{ role: driver ? 'driver' : '' }, { role: customer ? 'customer' : '' }] },
        {}
      )(setLoading)
      if (data) {
        navigation('/home/app-users')
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
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i
    if (!allowedExtensions.exec(e.target.value)) {
      toast.error(`
      Kun tillatt filtyper er: png, jpeg, jpg og gif.')
      `)
      e.target.value = ''
      return false
    }
    setPicture(e.target.files[0])
  }

  useEffect(() => {
    setData({
      ...data,
      ...{ password: passread ? '************' : '' },
      ...{ confirm_password: passread ? '************' : '' },
    })
  }, [passread])

  const getUser = async () => {
    const { data } = await handleGetRequest(`/user/${id}`)(setLoading)
    setData({
      first_name: data.first_name,
      last_name: data.last_name,
      user_type: data.user_type,
      email: data.email,
      mobile_number: data.mobile_number,
      current_location: data?.current_location,
      password: '************',
      confirm_password: '************',
      // communication: data.communication,
    })
    setPicture(data.image)

    data?.user_type?.find((o: any) => o.role == 'driver')?.role ? setDriver(true) : setDriver(false)
    data?.user_type?.find((o: any) => o.role == 'customer')?.role
      ? setCustomer(true)
      : setCustomer(false)

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
        path: `/user-mangement/user-overview/update-user/${id}`,
        title: `${data?.first_name} ${data?.last_name}`,
      },
    ])
  }
  useEffect(() => {
    if (!id) return

    getUser()
  }, [id])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Oppdatere bruker</h3>

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
                  </div>
                  <div>
                    <div className='form-text'>Tillatt filtype: jpg, jpeg, png.</div>
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

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Rolle</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <div className='d-flex align-items-center mt-3'>
                    <div className='form-check form-check-solid'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={driver}
                        onChange={() => {
                          setDriver(!driver)
                        }}
                      />
                      <label className='form-check-label ps-2'>Driver</label>
                    </div>
                    <div className='form-check form-check-solid mx-3'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={customer}
                        onChange={() => {
                          setCustomer(!customer)
                        }}
                      />
                      <label className='form-check-label ps-2'>Customer</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label fw-bold fs-6'>
                  <span className=''>Current Location</span>
                </label>

                <div className='col-lg-8 fv-row'>
                  <input
                    disabled
                    type='tel'
                    className='form-control form-control-lg form-control-solid'
                    placeholder='Current Location'
                    value={data?.current_location?.address}
                  />
                </div>
              </div>

              {/* {currentUser?.user._id === id ? (
                <>
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

                  <div className='row mb-6'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                      <span className=''>Bekreft passord</span>
                    </label>

                    <div className='col-lg-8 fv-row'>
                      <input
                        type='text'
                        className={clsx('form-control form-control-lg form-control-solid', {
                          'is-invalid':
                            formik.touched.confirm_password && formik.errors.confirm_password,
                        })}
                        disabled={passread}
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
                </>
              ) : (
                ''
              )} */}
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

export { AppUserEdit }
