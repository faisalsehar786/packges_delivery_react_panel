/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { MixedWidget13 } from '../../../../_metronic/partials/widgets/mixed/MixedWidget13'
import { handleGetRequest } from '../../../services'

interface Stats {
  total_organisations: string
  total_active_organisations: string
  total_goals: string
  active_goals: string
  total_supporters: string
  total_active_supporters: string
  total_active_supports: string
  total_paused_supports: string
  total_canceled_supports: string
  total_completed_supports: string
  total_supports: string
  total_received_supports: string
  total_stotte_cut: string
  total_support_paid_org: string
  total_pending_amount: string
  total_charged_amount: string
  total_reserved_amount: string
}

export default function OversiktMain() {
  const [stats, setStats] = useState<Stats>()
  const { setLoading } = useContext(LoadingContext)
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  const getStats = async () => {
    const { data } = await handleGetRequest('/admin/stats')(setLoading)
    setStats(data)
  }

  useEffect(() => {
    getStats()

    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: '/home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/oversikt',
        title: 'Støtte',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/oversikt',
        title: 'Oversikt',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6 '>
        <h3 className='fw-bolder my-2'>Oversikt</h3>

        {/* <div className='d-flex flex-wrap my-2'>
          <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a> */}
        {/* begin::Menu */}
        {/* <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
            data-kt-menu='true'
          > */}
        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
              <a className='menu-link px-3'>30 Days</a>
            </div> */}
        {/* end::Menu item */}

        {/* begin::Menu item */}
        {/* <div className='menu-item px-3'>
              <a className='menu-link px-3'>90 Days</a>
            </div> */}
        {/* end::Menu item */}
        {/* </div> */}
        {/* end::Menu */}
        {/* </div> */}
      </div>

      <div className='row overview gap-2'>
        {/* First row */}
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total støtte mottatt'
          description='Fra alle støttespillere'
          numbertext={stats?.total_received_supports}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total støtte utbetalt'
          description='Til alle organisasjoner'
          numbertext={stats?.total_support_paid_org}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total omsetning'
          description='Til Støtte AS'
          numbertext={stats?.total_stotte_cut}
        />
      </div>

      {/* Second row */}
      <div className='row overview gap-2 mt-2'>
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Utestående trekk'
          description='For inneværende periode'
          numbertext={stats?.total_pending_amount}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Reserverte trekk'
          description='For inneværende periode'
          numbertext={stats?.total_reserved_amount}
        />
      </div>

      {/* Third row */}
      <div className='row overview gap-2 mt-2'>
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total antall organisasjoner'
          description='På plattformen'
          numbertext={stats?.total_organisations}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Aktive organisasjoner'
          description='På støtte plattformen'
          numbertext={stats?.total_active_organisations}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total antall formål'
          description='Fra alle organisasjoner'
          numbertext={stats?.total_goals}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Aktive formål'
          description='Fra alle organisasjoner'
          numbertext={stats?.active_goals}
        />
      </div>

      {/* Fourth row */}
      <div className='row overview gap-2 mt-2'>
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total antall støttespillere'
          description='Fra alle organisasjoner'
          numbertext={stats?.total_supporters}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Aktive støttespillere'
          description='Fra alle organisasjoner'
          numbertext={stats?.total_active_supporters}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Total antall støtter'
          description='Fra alle Formål'
          numbertext={stats?.total_supports}
        />
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Aktive støtter'
          description='Fra alle Formål'
          numbertext={stats?.total_active_supports}
        />
      </div>
    </>
  )
}
