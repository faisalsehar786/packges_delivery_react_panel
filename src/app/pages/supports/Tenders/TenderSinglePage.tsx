/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { useParams, useNavigate } from 'react-router-dom'
import { handleGetRequest } from '../../../services'
import Tenderdetails1 from './Tenderdetails1'
import Gallery from './Gallery'
import TenderEditFrom from './TenderEditFrom'
import Customerdetails from './Customerdetails'
import TenderVariations from './TenderVariations'
import PaymentRecordTable from './PaymentRecordTable'

export default function TenderSinglePage() {
  const { setLoading } = useContext(LoadingContext)
  const [fetchData, setFetchData] = useState<any>()
  const { id } = useParams()
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)
  const navigation = useNavigate()

  const getOrgDetails = async () => {
    const { data } = await handleGetRequest(`/tender/details/${id}`)(setLoading)
    // const {
    //   customer_id,
    //   driver_id,
    //   files,
    //   tender_variations,
    //   order_awarded,
    //   order,
    //   order_current_location,
    //   location_from,
    //   location_to,
    // } = data

    setFetchData(data)
  }

  useEffect(() => {
    getOrgDetails()
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/formal',
        title: 'HmHy',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/formal',
        title: 'Formål',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Nøkkeltall</h3>

        <div className='d-flex flex-wrap my-2'>
          <div className='me-4'>
            <button
              type='button'
              className='btn btn-primary btn-sm'
              onClick={() => navigation('/home/published_jobs')}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <>
        <div className='row'>
          <div className='col-xl-6 col-lg-6 '>
            <Tenderdetails1 fhData={fetchData} title='Job Details' />
          </div>

          <div className='col-xl-6 col-lg-6 '>
            <Customerdetails fhData={fetchData?.customer_id} title='Customer Details' />
            <Customerdetails fhData={fetchData?.driver_id} title='Driver Details' />
          </div>
        </div>
        <div className='row'>
          <PaymentRecordTable
            title='Payment history'
            id={fetchData?._id}
            order_no={fetchData?.order?.order_no}
          />
        </div>
        <div className='row'>
          <div className='col-xl-7 col-lg-7 '>
            <Gallery fhData={fetchData?.files} title='Images' />
          </div>
          <div className='col-xl-5 col-lg-5 '>
            <TenderVariations fhData={fetchData?.tender_variations} title='Dimission' />
          </div>
        </div>
      </>
    </>
  )
}
