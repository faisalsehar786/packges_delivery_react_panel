/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import toastr from '../../../../toaster'
import { useAuth } from '../core/Auth'
import { register } from '../core/_requests'

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  last_name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => !!(val && val.length > 0),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const { saveAuth, setCurrentUser } = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true)
      try {
        const auth = await register(
          values.email,
          values.first_name,
          values.last_name,
          values.password,
          values.password_confirmation
        )
        if (auth.data.data.param === 'register_success_email_not_verified') {
          toastr.success(
            'Din registrering er vellykket. Sjekk e-posten din for å bekreft kontoen din og opprette passord.'
          )
          saveAuth(undefined)
          setCurrentUser(undefined)
          setStatus(
            'Din registrering er vellykket. Sjekk e-posten din for å bekreft kontoen din og opprette passord.'
          )
          setSubmitting(false)
          setLoading(false)
        }
      } catch (error: any) {
        toastr.error(error.response.data.message)
        // eslint-disable-next-line no-console
        console.error(error)
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}

      <div className='mb-10 '>
        {/* begin::Title */}

        <div className=' mb-10 d-flex ' style={{ alignItems: 'center' }}>
          <img
            src={toAbsoluteUrl('/media/logos/S-logo-full-dark.png')}
            alt='logo'
            className='svg-icon-cufs mb-14'
            style={{ maxWidth: '120px' }}
          />
          {/* <h2 className='text-dark mb-14 mx-2'>Støtteapparatet</h2> */}
        </div>

        <h1 className='authtext'>Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 '>Already have an account?</div>
        {/* end::Link */}
      </div>

      <div className='d-flex align-items-center mb-10'>
        <div className='border-bottom border-gray-300 mw-50 w-100' />
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
        <div className='border-bottom border-gray-300 mw-50 w-100' />
      </div>

      {formik.status && (
        <div className='mb-4 alert alert-danger bg-info border-0'>
          <div className='alert-text font-weight-bold text-white'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Firstname */}
      <div className='row fv-row mb-7'>
        <div className='col-xl-6'>
          <label className='form-label fw-bolder text-dark fs-6'>First name</label>
          <input
            placeholder='Fornavn'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('first_name')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.first_name && formik.errors.first_name,
              },
              {
                'is-valid': formik.touched.first_name && !formik.errors.first_name,
              }
            )}
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.first_name}</span>
              </div>
            </div>
          )}
        </div>
        <div className='col-xl-6'>
          {/* begin::Form group Lastname */}
          <div className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
            <input
              placeholder='Etternavn'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('last_name')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.last_name && formik.errors.last_name,
                },
                {
                  'is-valid': formik.touched.last_name && !formik.errors.last_name,
                }
              )}
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.last_name}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            { 'is-invalid': formik.touched.email && formik.errors.email },
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-10 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2' />
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px' />
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('password_confirmation')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid':
                formik.touched.password_confirmation && formik.errors.password_confirmation,
            },
            {
              'is-valid':
                formik.touched.password_confirmation && !formik.errors.password_confirmation,
            }
          )}
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password_confirmation}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <div className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            I Agree the{' '}
            <Link to='/auth/terms' className='ms-1 link-primary'>
              terms and conditions
            </Link>
            .
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5 authbgcolor'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{ display: 'block' }}>
              Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2' />
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
