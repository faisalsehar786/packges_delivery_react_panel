/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { MixedWidget13 } from '../../../../_metronic/partials/widgets/mixed/MixedWidget13'
import { handleGetRequest } from '../../../services'
import { KTSVG } from '../../../../_metronic/helpers'

export default function OversiktMain() {
  const [stats, setStats] = useState<any>()
  const [statsApp, setStatsApp] = useState<any>()
  const { setLoading } = useContext(LoadingContext)
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  const getAppStats = async () => {
    const { data } = await handleGetRequest('/admin/get_app_users_stats')(setLoading)
    setStatsApp(data)
  }
  const getStats = async () => {
    const { data } = await handleGetRequest('/admin/get_admin_stats')(setLoading)

    setStats(data)
  }

  useEffect(() => {
    getStats()
    getAppStats()
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: '/home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/oversikt',
        title: 'HmHy',
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
      </div>

      <div className='row overview gap-2'>
        {/* First row */}
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall sluttbrukere'
          // description='Fra alle støttespillere'
          numbertext={statsApp?.total}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall sjåfører'
          // description='Til alle organisasjoner'
          numbertext={statsApp?.user_type_driver_count}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall leveringer'
          // description='Til HmHy'
          numbertext={stats?.total}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall aktive leveranser'
          // description='Til HmHy'
          numbertext={stats?.order_processing}
        />
      </div>

      <div className='row overview gap-2 mt-4'>
        {/* First row */}
        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall sluttbrukere'
          // description='Fra alle støttespillere'
          numbertext={statsApp?.user_type_customer_count}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall sjåfører'
          // description='Til alle organisasjoner'
          numbertext={stats?.order_payment_done}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall leveringer'
          // description='Til HmHy'
          numbertext={stats?.order_awaiting_for_payment}
        />

        <MixedWidget13
          className='card-xl-stretch  card_borderC col'
          backGroundColor='#ffff'
          chartHeight='60px'
          title='Antall aktive leveranser'
          // description='Til HmHy'
          numbertext={stats?.order_completed}
        />
      </div>
    </>
  )
}
