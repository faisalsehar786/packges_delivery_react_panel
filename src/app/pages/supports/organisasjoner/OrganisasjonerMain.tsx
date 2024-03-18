/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect, useContext} from 'react'
import {handleGetRequest} from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import OrgSearch from './OrgSearch'
import OrganizationsTable from './OrgTable'
import {MixedWidget13} from '../../../../_metronic/partials/widgets/mixed/MixedWidget13'

export default function OrganisasjonerMain() {
  const [stats, setStats] = useState<any>()
  const {setLoading} = useContext(LoadingContext)

  const getStats = async () => {
    const {data} = await handleGetRequest('/admin/stats')(setLoading)
    setStats(data)
  }

  useEffect(() => {
    getStats()

    return () => {
      setLoading(false)
      setStats(undefined)
    }
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Nøkkeltall</h3>
      </div>
      <>
        <div className='row'>
          {/*begin::Col*/}
          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Antall organisasjoner'
              description='totalt på støtte plattformen'
              numbertext={stats?.total_organisations}
            />
          </div>
          {/* Aktive antall organisasjoner */}
          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Aktive organisasjoner'
              description='totalt på støtte plattformen'
              numbertext={stats?.total_active_organisations}
            />
          </div>

          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Antall støttespillere'
              description='totalt fra alle organisasjoner'
              numbertext={stats?.total_active_supporters}
            />
          </div>
          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Total støtte mottat'
              description='Fra alle støttespillere'
              numbertext={stats?.total_received_supports}
            />
          </div>
        </div>

        <div className={`card mb-5 mb-xl-8`}>
          {/* begin::Header */}
          <div className='card-header border-0  py-5 d-flex align-items-center'>
            <h3 className='card-title align-items-start flex-column '>
              <span className='card-label fw-bold fs-3 mb-1'>Oversikt organisasjoner</span>
            </h3>

            <div className='col-md-6'>
              <OrgSearch />
            </div>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body pt-0 pb-3'>
            {/* begin::Table container */}
            <OrganizationsTable />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  )
}
