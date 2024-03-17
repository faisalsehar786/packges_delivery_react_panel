/* eslint-disable jsx-a11y/anchor-is-valid */

import { KTSVG } from '../../../_metronic/helpers'

export default function ZendeskMain() {
  return (
    <div className='d-flex flex-wrap flex-stack mb-6'>
      <h3 className='fw-bolder my-2'>Zendesk</h3>

      <div className='d-flex flex-wrap my-2'>
        <div className='me-4' />
        <a
          href='#'
          className='bg-white btn text-muted'
          data-kt-menu-trigger='click'
          data-kt-menu-placement='bottom-end'
        >
          Filter
          <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
        </a>
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
  )
}
