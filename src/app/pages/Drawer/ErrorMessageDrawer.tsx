import moment from 'moment'
import { FC, useContext, useEffect, useState } from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import LoadingContext from '../../../_metronic/layout/core/Loading'
import { handleGetRequest } from '../../services'

interface IProps {
  selectedUser: any
}

const ErrorMessageDrawer: FC<IProps> = ({ selectedUser }) => {
  const { setLoading } = useContext(LoadingContext)
  const [errorMessages, setErrors] = useState<any>([])

  const getInitials = (firstName = '', lastName = '') => {
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
  }
  const getErrorMessages = async () => {
    const res = await handleGetRequest(`/errorMessages/${selectedUser?._id}`)(setLoading)
    setErrors(res)
  }

  useEffect(() => {
    if (selectedUser?._id)
      setTimeout(() => {
        getErrorMessages()
      }, 500)
  }, [selectedUser?._id])

  return (
    <div
      id='kt_errormessage'
      data-kt-drawer='true'
      data-kt-drawer-name='notification'
      data-kt-drawer-activate='true'
      data-kt-drawer-overlay='true'
      data-kt-drawer-width="{default:'300px', 'lg': '400px'}"
      data-kt-drawer-direction='end'
      data-kt-drawer-toggle='#kt_errormessage_toggle'
      data-kt-drawer-close='#kt_errormessage_close'
      className='errormessage-drawer'
    >
      <div className='card shadow-none rounded-0 border-none transactions-area-error-log'>
        <div className='card-header  border-0' id='kt_transaction_header'>
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
              {selectedUser?.image ? (
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
                  src={selectedUser?.image || toAbsoluteUrl('/media/avatars/300-1.jpg')}
                />
              ) : (
                <div
                  className='btn btn-icon btn-active-light-primary btn-custom border min-w-auto '
                  id='kt_profileMain_toggle'
                  style={{ cursor: 'pointer' }}
                >
                  {getInitials(selectedUser?.first_name, selectedUser?.last_name)}
                </div>
              )}
            </div>

            <div className='d-flex flex-column'>
              <div
                className='fw-bolder d-flex align-items-center fs-5 uppercase
              '
              >
                {selectedUser?.first_name} {selectedUser?.last_name}
                {/* <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span> */}
              </div>
              <div
                className='fs-8 text-muted fw-bold mt-1 float-end'
                style={{
                  textTransform: 'capitalize',
                }}
              >
                {selectedUser?.user_type}
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
              id='kt_errormessage_close'
            >
              <i className='fa-duotone fa-rectangle-xmark svg-icon svg-icon-2 fs-2' />
              {/* <KTSVG path='/media/icons/duotune/general/gen024.svg' className='svg-icon-2' /> */}
            </button>
          </div>
        </div>
        <div className='top-section position-relative padding-tp ' id='kt_activities_body'>
          <p className='fs-7 text-muted fw-bolder mb-4'>Feilmeldingslogg</p>
          <div className='separator' />
          {errorMessages?.data?.map((item: any) => (
            <div className='my-6 d-flex '>
              <i className='fa-duotone fa-triangle-exclamation ' />
              <div className='ms-4'>
                <h3 className='fs-7  text-gray-900 mb-1'>
                  {moment(item?.created_at).format('DD.MM.YYYY')} -{' '}
                  {moment(item?.created_at).format('hh:mm')}
                </h3>
                <span className=' fs-7 text-gray-400'>
                  {item?.error_message} <br />
                  {item?.route}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { ErrorMessageDrawer }
