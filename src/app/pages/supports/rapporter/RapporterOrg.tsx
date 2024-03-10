/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect } from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'

export default function RapporterOrg() {
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
        <h3 className='fw-bolder my-2'>Rapporter organisasjoner</h3>
      </div>
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Total Organisation With Completed MSN'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=29971445-fc8c-4bf0-a9a1-9cc632255cd6&maxDataAge=300&theme=light&autoRefresh=true'
          />
        </div>

        <div className='col mx-2'>
          <iframe
            title='Total Organisation With In-Progress MSN'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='300'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=1b5bc216-3278-43aa-af9e-2f8da5865435&maxDataAge=300&theme=light&autoRefresh=true'
          />
        </div>
      </div>
      <div className='row overview gap-2 my-4'>
        <div className='col mx-2'>
          <iframe
            title='Prefilled orgs without onboarding'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='500'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=58934ee3-75d3-4054-8548-a9ca4f38c8a8&maxDataAge=300&theme=light&autoRefresh=true'
          />
        </div>
        <div className='col mx-2'>
          <iframe
            title='In-Progress MSN Organisation List'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='500'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=7de0d6f0-3887-4b04-8d75-575f56e7b797&maxDataAge=300&theme=light&autoRefresh=true'
          />
        </div>{' '}
        <div className='col mx-2'>
          <iframe
            title='MSN Completed Organisation List'
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
            }}
            width='100%'
            height='500'
            src='https://charts.mongodb.com/charts-project-0-nbqbz/embed/charts?id=2be8c0ca-498c-4f54-b97c-543c2bf7eb52&maxDataAge=300&theme=light&autoRefresh=true'
          />
        </div>
      </div>
    </>
  )
}
