import React from 'react'

export default function Customerdetails(props: any) {
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
          <label className='col-lg-4 fw-semibold text-muted'>Name</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8'>
            <span className='fw-bold fs-6 text-gray-800'>
              {fhData?.first_name} {fhData?.last_name}
            </span>
          </div>
          {/*end::Col*/}
        </div>
        {/*end::Row*/}
        {/*begin::Input group*/}
        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Email</label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>{fhData?.email}</span>
          </div>

          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>
            Phone No
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
            <span className='fw-bold fs-6 text-gray-800 me-2'>{fhData?.mobile_number}</span>
            <span className='badge badge-success'>Verified</span>
          </div>
          {/*end::Col*/}
        </div>

        <div className='row mb-7'>
          {/*begin::Label*/}
          <label className='col-lg-4 fw-semibold text-muted'>Current Location </label>
          {/*end::Label*/}
          {/*begin::Col*/}
          <div className='col-lg-8 fv-row'>
            <span className='fw-semibold text-gray-800 fs-6'>
              {fhData?.current_location?.address}
            </span>
          </div>
          {/*end::Col*/}
        </div>
      </div>
      {/*end::Card body*/}
    </div>
  )
}
