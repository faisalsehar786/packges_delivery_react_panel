import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { RightToolbar } from '../partials/layout/RightToolbar'
import { Content } from './components/Content'
import { Footer } from './components/Footer'
import { ScrollTop } from './components/ScrollTop'
import { AsideDefault } from './components/aside/AsideDefault'
import { HeaderWrapper } from './components/header/HeaderWrapper'
import { Toolbar } from './components/toolbar/Toolbar'
import { PageDataProvider } from './core'
import { ActivityDrawerMain } from '../../app/pages/Drawer/ActivityDrawerMain'
import { SendPushNotificationDrawerMain } from '../../app/pages/Drawer/SendPushNotificationDrawerMain '
import $ from 'jquery'
import { NotificationDrawerMain } from '../../app/pages/Drawer/NotificationDrawerMain'
import { ProfileDrawerMain } from '../../app/pages/Drawer/ProfileDrawerMain'
const MasterLayout = () => {
  useEffect(() => {
    $('#kt_aside_toggle').on('click', () => {
      $('body').addClass('mobileVer')
      $('.menue-drawrCustom').attr('style', 'display: block !important')
    })
  })

  // State to show/hide accordion

  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root'>
        {/* begin::Page */}
        <div className='page d-flex flex-row flex-column-fluid'>
          <AsideDefault />

          {/* begin::Wrapper */}
          <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
            <HeaderWrapper />

            <Toolbar />

            {/* begin::Content */}
            <div id='kt_content' className='content d-flex flex-column flex-column-fluid'>
              {/* <button
                onClick={() => ScondaryMenueToggler()}
                className='btn btn-sm btn-icon bg-body btn-color-gray-700 btn-active-info shadow-sm fsatollenav'
              >
                <i className='las la-arrow-left me-2'></i>
              </button> */}
              <Content>
                <Outlet />
              </Content>
            </div>
            {/* end::Content */}
            <Footer />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Page */}
      </div>

      {/* begin:: Drawers */}
      <ActivityDrawerMain />
      <NotificationDrawerMain />
      <SendPushNotificationDrawerMain />
      <ProfileDrawerMain />

      <RightToolbar />

      <ScrollTop />
    </PageDataProvider>
  )
}

export { MasterLayout }
