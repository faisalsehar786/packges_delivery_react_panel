/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { BillingModal } from './BillingModal'

const BillingAddress: React.FC = () => {
  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header'>
        <div className='card-title'>
          <h3>Billing Address</h3>
        </div>
      </div>
      <div className='card-body'>
        <div className='row gx-9 gy-6'>
          <div className='col-xl-6'>
            <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6'>
              <div className='d-flex flex-column py-2'>
                <div className='d-flex align-items-center fs-5 fw-bolder mb-5'>
                  Address 1<span className='badge badge-light-success fs-7 ms-2'>Primary</span>
                </div>
                <div className='fs-6 fw-bold text-gray-600'>
                  Ap #285-7193 Ullamcorper Avenue
                  <br />
                  Amesbury HI 93373
                  <br />
                  US
                </div>
              </div>
              <div className='d-flex align-items-center py-2'>
                <button type='reset' className='btn btn-sm btn-light btn-active-light-primary me-3'>
                  Delete
                </button>
                <button
                  className='btn btn-sm btn-light btn-active-light-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_address'
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6'>
              <div className='d-flex flex-column py-2'>
                <div className='d-flex align-items-center fs-5 fw-bolder mb-3'>Address 2</div>
                <div className='fs-6 fw-bold text-gray-600'>
                  Ap #285-7193 Ullamcorper Avenue
                  <br />
                  Amesbury HI 93373
                  <br />
                  US
                </div>
              </div>
              <div className='d-flex align-items-center py-2'>
                <button type='reset' className='btn btn-sm btn-light btn-active-light-primary me-3'>
                  Delete
                </button>
                <button
                  className='btn btn-sm btn-light btn-active-light-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_address'
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='card card-dashed h-xl-100 flex-row flex-stack flex-wrap p-6'>
              <div className='d-flex flex-column py-2'>
                <div className='d-flex align-items-center fs-5 fw-bolder mb-3'>Address 3</div>
                <div className='fs-6 fw-bold text-gray-600'>
                  Ap #285-7193 Ullamcorper Avenue
                  <br />
                  Amesbury HI 93373
                  <br />
                  US
                </div>
              </div>
              <div className='d-flex align-items-center py-2'>
                <button type='reset' className='btn btn-sm btn-light btn-active-light-primary me-3'>
                  Delete
                </button>
                <button
                  className='btn btn-sm btn-light btn-active-light-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_address'
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
          <div className='col-xl-6'>
            <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed flex-stack h-xl-100 mb-10 p-6'>
              <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
                <div className='mb-3 mb-md-0 fw-bold'>
                  <h4 className='text-gray-900 fw-bolder'>This is a very important note!</h4>
                  <div className='fs-6 text-gray-700 pe-7'>
                    Writing headlines for blog posts is much science and probably cool audience
                  </div>
                </div>
                <a
                  href='#'
                  className='btn btn-primary px-6 align-self-center text-nowrap'
                  data-bs-toggle='modal'
                  data-bs-target='#kt_modal_new_address'
                >
                  New Address
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-10'>
          <h3 className='mb-3'>Tax Location</h3>
          <div className='fw-bold text-gray-600 fs-6'>
            United States - 10% VAT
            <br />
            <a className='fw-bolder' href='#'>
              More Info
            </a>
          </div>
        </div>
      </div>
      <BillingModal />
    </div>
  )
}

export { BillingAddress }
