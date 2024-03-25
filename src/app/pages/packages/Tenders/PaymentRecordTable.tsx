import React, { useContext, useEffect, useState } from 'react'
import { handleGetRequest } from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { numberSpacing } from '../../../../_metronic/helpers'
import moment from 'moment'
export default function PaymentRecordTable(props: any) {
  const { setLoading } = useContext(LoadingContext)
  const { id, order_no, title, fhData } = props
  const [fetchData, setFetchData] = useState<any>()
  const getOrgDetails = async () => {
    if (id && order_no) {
      const { data } = await handleGetRequest(
        `/order/track_order_by_id_order_no_or_with_payment_details?order_no=${order_no}&payments_record=true&order_id=${id}`
      )(setLoading)
      if (data) setFetchData(data?.payment_record_list)
    }
  }
  useEffect(() => {
    getOrgDetails()
  }, [id, order_no])

  console.log(fetchData)

  return (
    <>
      {fetchData?.map((item: any, index: any) => (
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view' key={item?._id}>
          {/*begin::Card header*/}
          <div className='card-header cursor-pointer'>
            {/*begin::Card title*/}
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>
                {title} - {1 + index}
              </h3>
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
              <label className='col-lg-4 fw-semibold text-muted'>Customer info</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8'>
                <span className='fw-bold fs-6 text-gray-800'>
                  Name:{item?.customer_id.first_name} {item?.customer_id?.last_name} , Email:{' '}
                  {item?.customer_id?.email} , Phone:{item?.customer_id?.mobile_number}
                </span>
              </div>
              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>Driver info</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8'>
                <span className='fw-bold fs-6 text-gray-800'>
                  Name:{item?.driver_id?.first_name} {item?.driver_id?.last_name} , Email:
                  {item?.driver_id?.email} , Phone:{item?.driver_id?.mobile_number}
                </span>
              </div>
              {/*end::Col*/}
            </div>
            {/*end::Row*/}
            {/*begin::Input group*/}

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>platfrom share</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8 fv-row'>
                <span className='fw-semibold text-gray-800 fs-6'>
                  Platfrom name:{item?.platfrom_share?.platfrom_name} Amount:
                  {numberSpacing(item?.platfrom_share?.share_amount)}
                </span>
              </div>

              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>driver share amount</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8 fv-row'>
                <span className='fw-semibold text-gray-800 fs-6'>
                  {numberSpacing(item?.driver_share_amount)}
                </span>
              </div>

              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>tax</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8 fv-row'>
                <span className='fw-semibold text-gray-800 fs-6'>{numberSpacing(item?.tax)}</span>
              </div>

              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>paid price</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8 fv-row'>
                <span className='fw-semibold text-gray-800 fs-6'>
                  {numberSpacing(item?.paid_price)}
                </span>
              </div>

              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>charge date</label>
              {/*end::Label*/}
              {/*begin::Col*/}
              <div className='col-lg-8 fv-row'>
                <span className='fw-semibold text-gray-800 fs-6'>
                  {moment(item?.charge_date).format('DD.MM.YYYY hh:mm')}
                </span>
              </div>

              {/*end::Col*/}
            </div>

            <div className='row mb-7'>
              {/*begin::Label*/}
              <label className='col-lg-4 fw-semibold text-muted'>
                status
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
                <span className='badge badge-success'>{item?.status}</span>
              </div>
              {/*end::Col*/}
            </div>
          </div>
          {/*end::Card body*/}
        </div>
      ))}
    </>
  )
}
