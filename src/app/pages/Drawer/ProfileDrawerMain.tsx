/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line jsx-a11y/anchor-is-valid
import moment from 'moment'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { useAuth } from '../../modules/auth'
// import Language from 'prism-react-renderer';

const ProfileDrawerMain: FC = () => {
  const { currentUser, logout } = useAuth()

  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }
  return (
    <div
      id='kt_profileMain'
      className='bg-white'
      data-kt-drawer='true'
      data-kt-drawer-name='notification'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_profileMain_toggle'
      data-kt-drawer-close='#kt_profileMain_close'
    >
      <div className='card shadow-none rounded-0 border-none'>
        <div className='card-header  border-0' id='kt_profileMain_header'>
          <div className='menu-content d-flex align-items-center'>
            <div className='symbol symbol-50px me-5'>
              {/* <img
                className='card'
                style={{
                  borderRadius: '8px',
                  height: '50px',
                  width: '50px',
                }}
                alt='Logo'
                src={currentUser?.user?.image || toAbsoluteUrl('/media/avatars/300-1.jpg')}
              /> */}
              {currentUser?.user?.image ? (
                <img
                  className='card'
                  id='kt_profileMain_toggle'
                  style={{
                    borderRadius: '8px',
                    height: '50px',
                    width: '50px',
                    cursor: 'pointer',
                  }}
                  alt='Logo'
                  src={currentUser?.user?.image || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                />
              ) : (
                <div
                  className='btn btn-icon btn-active-light-primary btn-custom border min-w-auto '
                  id='kt_profileMain_toggle'
                  style={{ cursor: 'pointer' }}
                >
                  {getInitials(currentUser?.user?.first_name, currentUser?.user?.last_name)}
                </div>
              )}
            </div>

            <div className='d-flex flex-column'>
              <div
                className='fw-bolder d-flex align-items-center fs-5 uppercase
              '
              >
                {currentUser?.user?.first_name} {currentUser?.user?.last_name}
                {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
              </div>
              <div
                className='fs-8 text-muted fw-bold mt-1 float-end'
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {currentUser?.user?.user_type}
              </div>

              <a href='/' className='fw-bold text-muted text-hover-primary fs-7'>
                {/* {currentUser ? currentUser?.user?.email : ""} */}
              </a>
            </div>
          </div>

          <div className='card-toolbar'>
            <button
              type='button'
              className='btn btn-sm btn-icon btn-active-light-primary  min-w-auto'
              id='kt_profileMain_close'
            >
              <i className='fa-duotone fa-rectangle-xmark svg-icon svg-icon-2 fs-2' />
              {/* <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' /> */}
            </button>
          </div>
        </div>
        <div className='card-body position-relative pt-1' id='kt_activities_body'>
          <div
            id='kt_activities_scroll'
            className=''
            data-kt-scroll='true'
            data-kt-scroll-height='auto'
            data-kt-scroll-wrappers='#kt_activities_body'
            data-kt-scroll-dependencies='#kt_activities_header, #kt_activities_footer'
            data-kt-scroll-offset='5px'
          >
            <div className=' align-items-center  min-w-350px  py-3 '>
              <p className='fs-7 text-muted fw-bolder mb-4'>Konto Oversikt</p>
              <div className='separator' />
              {/* <div className='my-6 d-flex '>
                <i className='bi bi bi-grid-3x3-gap-fill ' />
                <div className='ms-4'>
                  <h3 className='fs-7  text-gray-900 mb-1'>Account ID</h3>
                  <span className=' fs-7 text-gray-400'>
                    {currentUser ? currentUser.user._id : ''}
                  </span>
                </div>
              </div> */}

              <div className='my-6 d-flex '>
                <i className='fa-duotone fa-envelope-circle-check' />
                <div className='ms-4'>
                  <h3 className='fs-7  text-gray-900 mb-1'>E-post</h3>
                  <span className=' fs-7 text-gray-400 profileDrawertextgray'>
                    {currentUser ? currentUser?.user?.email : ''}
                  </span>
                </div>
              </div>
              {/* <div className='my-6 d-flex '>
                <i className='bi bi-telephone-fill'></i>
                <div className='ms-4'>
                  <h3 className='fs-7  text-gray-900 mb-1'>Phone</h3>
                  <span className=' fs-7 text-gray-400'>
                    {currentUser ? currentUser.user.mobile_number : ''}
                  </span>
                </div>
              </div> */}
              {/* <div className='my-6 d-flex '>
                <i className='bi bi-person-lines-fill'></i>
                <div className='ms-4'>
                  <h3 className='fs-6  text-gray-900 mb-1'>Type</h3>
                  <span className=' fs-7 text-gray-400'>
                    {currentUser ? currentUser.user.user_type : ''}
                  </span>
                </div>
              </div> */}
              <div className='my-6 d-flex '>
                <i className='fa-solid fa-shield-check' />
                <div className='ms-4'>
                  <h3 className='fs-7  text-gray-900 mb-1'>Sist innlogget</h3>
                  <span className=' fs-7 text-gray-400 profileDrawertextgray'>
                    {currentUser
                      ? moment(currentUser.user.last_login).format('DD.MM.YYYY HH:mm')
                      : ''}
                  </span>

                  {/* <span className=' fs-7 text-gray-400'>Notification description</span> */}
                </div>
              </div>

              {/* <p className='fs-7 text-muted fw-bolder mb-4'>QUICK ACCESS</p>
              <div className='separator'></div> */}
              <div className='my-6 d-flex '>
                <i className='fa-duotone fa-gear' style={{ marginTop: '2px' }} />
                <div className='ms-4'>
                  <Link
                    className='menu-link menu-center px-0 mt-4 linkcolorCustom'
                    to='user-mangement/user-overview/update-profile'
                  >
                    {/* <span className='menu-icon'>
                      <i className='bi bi-gear' />
                    </span> */}
                    <span className='menu-title'>Konto innstillinger</span>
                  </Link>
                  {/* <span className=' fs-7 text-gray-400'>Notification description</span> */}
                </div>
              </div>
              <div className='my-6 d-flex '>
                <i className='fa-duotone fa-lock-keyhole' style={{ marginTop: '2px' }} />
                <div className='ms-4'>
                  <a
                    className='menu-link menu-center px-0 py-1 linkcolorCustom'
                    href='#'
                    onClick={logout}
                  >
                    {/* <span className='menu-icon'>
                      <i className='bi bi-lock-fill' />
                    </span> */}
                    <span className='menu-title'>Logg ut</span>
                  </a>
                  {/* <span className=' fs-7 text-gray-400'>Notification description</span> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileDrawerMain }
