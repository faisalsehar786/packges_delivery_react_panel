/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'

export default function RapporterStotte() {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  useEffect(() => {
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: '/home/rapporter', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/rapporter',
        title: 'Støtte',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/rapporter',
        title: 'Rapporter',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6 '>
        <h3 className='fw-bolder my-2'>Rapporter støtter</h3>
      </div>
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Goal Support Stats'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='400'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=1be9eaa8-f06a-413d-a866-8d8f16cabc13&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>
      </div>{' '}
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Top 10'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='400'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=6641ea3f-8725-4068-b07d-0fd257cd77d6&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>{' '}
        <div className='col mx-2'>
          <iframe
            title='Top 10'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='400'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=2bb63c99-778a-4a68-9bc2-cc8b3e3caec1&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>
      </div>
    </>
  )
}
