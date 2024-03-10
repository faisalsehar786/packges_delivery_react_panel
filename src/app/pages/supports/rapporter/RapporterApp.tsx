/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'

export default function RapporterApp() {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  useEffect(() => {
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: '/home/rapporter/app', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/home/rapporter/app',
        title: 'Støtte',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/home/rapporter/app',
        title: 'Rapporter app',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6 '>
        <h3 className='fw-bolder my-2'>Rapporter app</h3>
      </div>
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Total App User With Supports'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=659a6b94-1b07-49b3-8cca-9ecb17cf7a83&maxDataAge=60&theme=light&autoRefresh=true'
          />
        </div>

        <div className='col mx-2'>
          <iframe
            title='Total App User With Active Supports'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=659a6a46-a1ec-424c-8b3a-2e0847433f4a&maxDataAge=60&theme=light&autoRefresh=true'
          />
        </div>
      </div>
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Total App Users'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=659a6808-bc5d-4070-8cd7-fa72345a76f1&maxDataAge=60&theme=light&autoRefresh=true'
          />
        </div>
        <div className='col mx-2'>
          <iframe
            title='Total App Users last week'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=1aa0db5b-2d22-4e30-bb37-ed0580b61327&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>

        <div className='col mx-2'>
          <iframe
            title='Total App User last month'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=e38620e2-20b6-4269-a175-cad30509d536&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>
      </div>{' '}
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='User acquisitionlast month'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=7eca5289-e321-4131-96ef-00fed7ad1df6&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>{' '}
        <div className='col mx-2'>
          <iframe
            title='Bank overview'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=b9f897d4-39f5-440d-aa8f-3cca7c443a9d&maxDataAge=3600&theme=light&autoRefresh=true'
          />
        </div>
      </div>
    </>
  )
}
