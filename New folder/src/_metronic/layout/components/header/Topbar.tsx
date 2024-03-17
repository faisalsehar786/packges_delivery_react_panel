import clsx from 'clsx'
import { FC, useContext } from 'react'
import { useAuth } from '../../../../app/modules/auth'
import MasterlayoutContext from '../../../../context/Masterlayout/layoutContext'
import { KTSVG, toAbsoluteUrl } from '../../../helpers'
import { HeaderUserMenu } from '../../../partials'
import { useLayout } from '../../core'

const itemClass = 'ms-1 ms-lg-3',
  btnClass =
    'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary w-30px h-30px w-md-40px h-md-40px border border-gray-300',
  userAvatarClass = 'symbol-30px symbol-md-40px'
//  btnIconClass = 'svg-icon-1'

const Topbar: FC = () => {
  const { config } = useLayout()
  const masterlayoutContextRecive = useContext(MasterlayoutContext)
  const { successMessageSupport, setsuccessMessageSupport } = masterlayoutContextRecive
  // const {currentUser, logout} = useAuth()
  const { currentUser } = useAuth()
  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }
  return (
    <div className='d-flex align-items-stretch justify-self-end flex-shrink-0'>
      {/* Search */}
      <div className={clsx('d-flex align-items-stretch', itemClass)}>{/* <Search /> */}</div>

      {/* NOTIFICATIONS */}
      <div className={clsx('d-flex align-items-center', itemClass)}>
        {/* begin::Menu- wrapper */}
        {/* <div
          className={clsx('d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary position-relative ', btnClass)}
          id='kt_notification_toggle'
        >
          <KTSVG
            path='/media/icons/duotune/general/gen007.svg'
            className='svg-icon-dark svg-icon-1'
          />
        </div>
        <HeaderNotificationsMenu /> */}
        {/* end::Menu wrapper */}
      </div>

      <div className={clsx('d-flex align-items-center mt-1', itemClass)}>
        <div className='align-items-center'>
          <div
            className='fs-7 text-gray-800 text-hover-primary fw-bolder'
            style={{ lineHeight: '8px', textAlign: 'end', textTransform: 'capitalize' }}
          >
            {' '}
            {currentUser?.user?.first_name} {currentUser?.user?.last_name}
          </div>
          <div
            className='fs-8 text-muted fw-bold mt-1 float-end'
            style={{
              textTransform: 'capitalize',
            }}
          >
            {currentUser?.user?.user_type}
          </div>
        </div>
      </div>
      {/* begin::User */}
      <div className={clsx('d-flex align-items-center', itemClass)} id='kt_header_user_menu_toggle'>
        {/* begin::Toggle */}
        {/* <div className={clsx('cursor-pointer symbol', userAvatarClass)} id='kt_profileMain_toggle'> */}

        {/* <img
          className={clsx(
            'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom p-0',
            btnClass
          )}
          style={{
            borderRadius: '8px',
            height: '50px',
            width: '50px'
          }}
          id='kt_profileMain_toggle'
          src={currentUser?.user?.image || toAbsoluteUrl('/media/avatars/300-1.jpg')}
          alt='metronic'
        /> */}
        {currentUser?.user?.image ? (
          <img
            className='card'
            id='kt_profileMain_toggle'
            style={{
              borderRadius: '8px',
              height: '45px',
              width: '45px',
              marginLeft: '1px',
              marginTop: '-2px',
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

        <HeaderUserMenu />
        {/* end::Toggle */}
      </div>
      {/* end::User */}

      {/* Activities */}
      <div className={clsx('d-flex align-items-center', itemClass)}>
        {/* begin::Drawer toggle */}
        <div
          className={clsx(
            'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom',
            btnClass
          )}
          onClick={() => setsuccessMessageSupport('')}
          style={{
            borderRadius: '8px',
          }}
          id='kt_activities_toggle'
        >
          <i className='fa-duotone fa-headset fs-2'></i>
        </div>
        {/* end::Drawer toggle */}
      </div>
      {/* CHAT */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
      {/* begin::Menu wrapper */}
      {/* <div
          className={clsx(
            'd-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom position-relative',
            btnClass
          )}
          id='kt_drawer_chat_toggle'
        >
          <KTSVG path='/media/icons/duotune/communication/com012.svg' className={btnIconClass} />

          <span className='bullet bullet-dot bg-success h-6px w-6px position-absolute translate-middle top-0 start-50 animation-blink'></span>
        </div> */}
      {/* end::Menu wrapper */}
      {/* </div> */}

      {/* Quick links */}
      {/* <div className={clsx('d-flex align-items-center', itemClass)}> */}
      {/* begin::Menu wrapper */}
      {/* <div
          className={clsx('d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary btn-custom', btnClass)}
          data-kt-menu-trigger='click'
          data-kt-menu-attach='parent'
          data-kt-menu-placement='bottom-end'
        >
          <KTSVG path='/media/icons/duotune/general/gen025.svg' className={btnIconClass} />
        </div>
        <QuickLinks /> */}
      {/* end::Menu wrapper */}
      {/* </div> */}

      {/* begin::Aside Toggler */}
      {config.header.left === 'menu' && (
        <div className='d-flex align-items-center d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='d-flex align-items-center position-relative justify-content-center cursor-pointer btn-active-light-primary w-30px h-30px w-md-40px h-md-40px'
            id='kt_header_menu_mobile_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className='svg-icon-1' />
          </div>
        </div>
      )}
    </div>
  )
}

export { Topbar }
