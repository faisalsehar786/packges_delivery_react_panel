/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, useContext } from 'react'
import { handleGetRequest } from '../../../services'
import LoadingContext from '../../../../_metronic/layout/core/Loading'

import { MixedWidget13 } from '../../../../_metronic/partials/widgets/mixed/MixedWidget13'
import AppUserTable from './AppUserTable'
import AppUserSearch from './AppUserSearch'

export default function AppUserMain() {
  const [stats, setStats] = useState<any>()
  const [role, setRole] = useState<any>('driver')
  const [statsuser, setStatsUser] = useState<any>()
  const { setLoading } = useContext(LoadingContext)

  const getStatsUserApp = async () => {
    const { data } = await handleGetRequest('/admin/get_app_users_stats')(setLoading)
    setStatsUser(data)
  }

  const getStats = async () => {
    const { data } = await handleGetRequest('/admin/get_admin_stats')(setLoading)
    setStats(data)
  }

  useEffect(() => {
    getStats()
    getStatsUserApp()

    return () => {
      setLoading(false)
      setStats(undefined)
    }
  }, [])

  const statusData = [
    { label: 'All', val: 'all' },
    { label: 'driver', val: 'driver' },
    { label: 'customer', val: 'customer' },
  ]

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Nøkkeltall</h3>
      </div>
      <>
        <div className='row'>
          {/* begin::Col */}
          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Antall organisasjoner'
              description='totalt på støtte plattformen'
              numbertext={statsuser?.total}
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
              numbertext={statsuser?.user_type_driver_count}
            />
          </div>

          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Antall støttespillere'
              description='totalt fra alle organisasjoner'
              numbertext={statsuser?.user_type_customer_count}
            />
          </div>
          <div className='col-xl-3 '>
            <MixedWidget13
              className='card-xl-stretch mb-xl-10 card_borderC min-h-240px'
              backGroundColor='#ffff'
              chartHeight='60px'
              title='Total støtte mottat'
              description='Fra alle støttespillere'
              numbertext={stats?.driver_order_accepted}
            />
          </div>
        </div>

        <div className='card mb-5 mb-xl-8'>
          {/* begin::Header */}
          <div className='card-header border-0  py-5 d-flex align-items-center'>
            <h3 className='card-title align-items-start flex-column '>
              <span className='card-label fw-bold fs-3 mb-1'>Sluttbrukere</span>
            </h3>

            <div className='d-flex'>
              <div className='w-550px'>
                <AppUserSearch />
              </div>
              <select
                value={role}
                className='form-control selectpicker w-250px card_borderC '
                onChange={(e) => setRole(e.target.value)}
                style={{ marginLeft: 12 }}
              >
                {statusData?.map((item: any) => <option value={item?.val}>{item?.label}</option>)}
              </select>
            </div>
          </div>
          {/* end::Header */}
          {/* begin::Body */}
          <div className='card-body pt-0 pb-3'>
            {/* begin::Table container */}
            <AppUserTable role={role} />
            {/* end::Table container */}
          </div>
          {/* begin::Body */}
        </div>
      </>
    </>
  )
}
