import React from 'react'
import moment from 'moment'
export default function Tenderdetails1(props: any) {
  const { fhData, title } = props
  return (
    <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
      {/*begin::Card header*/}
      <div className='card-header cursor-pointer'>
        {/*begin::Card title*/}
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>{title}</h3>
        </div>
        {/*end::Card title*/}
        {/*begin::Action*/}

        {/*end::Action*/}
      </div>
      {/*begin::Card header*/}
      {/*begin::Card body*/}
      <div className='card-body p-9'>
        {/*begin::Row*/}
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Title</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-bold fs-6 text-gray-800'>{fhData?.title}</span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Row*/}
        {/*begin::Input group*/}
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Pick up Date</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>
              {moment(fhData?.pickup_date).format('DD.MM.YYYY hh:mm')}
            </span>
          </div>
          {/*end::Col*/}
        </div>
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Delivery Date </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>
              {moment(fhData?.delivery_date).format('DD.MM.YYYY hh:mm')}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>locatio from </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.location_from?.address}</span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>location to </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.location_to?.address}</span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>
            Tracking No
            <span
              className='ms-1'
              data-bs-toggle='tooltip'
              aria-label='Phone number must be active'
              data-bs-original-title='Phone number must be active'
              data-kt-initialized={1}
            >
              <i className='ki-duotone ki-information fs-7'>
                <span className='path1' />
                <span className='path2' />
                <span className='path3' />
              </i>{' '}
            </span>
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 d-flex align-items-center'>
            <span className='fw-bold fs-6 text-gray-800 me-2'>{fhData?.order?.order_no}</span>
            <span className='badge badge-success'>Verified</span>
          </div>
          {/*end::Col*/}
        </div>

        {/*end::Input group*/}
        {/*begin::Input group*/}
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>current location</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-semibold text-danger fs-6'>
              {fhData?.order?.order_current_location?.order_address}
            </span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Price</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.total_price}</span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>deliver to details</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.deliver_to_details}</span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>description</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.description}</span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>
            Status
            <span
              className='ms-1'
              data-bs-toggle='tooltip'
              aria-label='Phone number must be active'
              data-bs-original-title='Phone number must be active'
              data-kt-initialized={1}
            >
              <i className='ki-duotone ki-information fs-7'>
                <span className='path1' />
                <span className='path2' />
                <span className='path3' />
              </i>{' '}
            </span>
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 d-flex align-items-center'>
            <span className='badge badge-success'> {fhData?.tender_status}</span>
          </div>
          {/*end::Col*/}
        </div>
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>
            Order Status
            <span
              className='ms-1'
              data-bs-toggle='tooltip'
              aria-label='Phone number must be active'
              data-bs-original-title='Phone number must be active'
              data-kt-initialized={1}
            >
              <i className='ki-duotone ki-information fs-7'>
                <span className='path1' />
                <span className='path2' />
                <span className='path3' />
              </i>{' '}
            </span>
          </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 d-flex align-items-center'>
            <span className='badge badge-success'> {fhData?.order?.order_status}</span>
          </div>
          {/*end::Col*/}
        </div>
      </div>
      {/*end::Card body*/}
    </div>
  )
}
