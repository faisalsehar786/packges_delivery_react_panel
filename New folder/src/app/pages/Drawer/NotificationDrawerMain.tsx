import React, { FC } from 'react'
import { KTSVG } from '../../../_metronic/helpers'

const NotificationDrawerMain: FC = () => (
  <div
    id='kt_notification'
    className='bg-white'
    data-kt-drawer='true'
    data-kt-drawer-name='notification'
    data-kt-drawer-activate='true'
    data-kt-drawer-overlay='true'
    data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
    data-kt-drawer-direction='end'
    data-kt-drawer-toggle='#kt_notification_toggle'
    data-kt-drawer-close='#kt_notification_close'
  >
    <div className='card shadow-none rounded-0 border-none'>
      <div className='card-header border-0' id='kt_notification_header'>
        <div className=' d-flex align-items-center'>
          <div className='btn btn-icon btn-active-light-primary btn-custom border'>
            <KTSVG
              path='/media/icons/duotune/general/gen007.svg'
              className='svg-icon-dark svg-icon-1'
            />
          </div>
          <div className='ms-4'>
            <h3 className='fs-5 fw-bolder text-gray-900 mb-0'>Notifications</h3>
            <span className='fw-bold fs-7 text-gray-400'>And alerts</span>
          </div>
        </div>

        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-active-light-primary me-n5'
            id='kt_notification_close'
          >
            <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' />
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
            <p className='createTicket'>LAST 24 HOURS</p>

            <div className='mb-3 d-flex border-primary bg-light-info dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-info p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/general/gen007.svg'
                  className='svg-icon-info svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>Notification title</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>

            <div className='mb-3 d-flex border-primary bg-light-info dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-warning p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/communication/com003.svg'
                  className='svg-icon-warning svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>System alert</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>

            <div className='mb-3 d-flex border-primary bg-light-danger dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-danger p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/communication/com003.svg'
                  className='svg-icon-danger svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>System warning</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>

            <p className='createTicket my-7'>LAST 7 DAYS</p>

            <div className='mb-3 d-flex border-primary bg-light-info dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-info p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/general/gen007.svg'
                  className='svg-icon-info svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>Notification title</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>

            <div className='mb-3 d-flex border-primary bg-light-info dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-warning p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/communication/com003.svg'
                  className='svg-icon-warning svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>System alert</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>

            <div className='mb-3 d-flex border-primary bg-light-danger dz-message needsclick align-items-center notificationAlerts'>
              <span className='svg-icon svg-icon-2hx svg-icon-primary notificationAlertsradius bg-light-danger p-2 shadow-sm'>
                <KTSVG
                  path='/media/icons/duotune/communication/com003.svg'
                  className='svg-icon-danger svg-icon-2hx'
                />
              </span>
              <div className='ms-4'>
                <h3 className='fs-6  text-gray-900 mb-1'>System warning</h3>
                <span className=' fs-7 text-gray-400'>Notification description</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export { NotificationDrawerMain }
