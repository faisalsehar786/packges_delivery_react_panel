/* eslint-disable jsx-a11y/anchor-is-valid */
import {useContext, useEffect} from 'react'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'
import StottespillereSearch from './StottespillereSearch'
import StottespillereTable from './StottespillereTable'

export default function StottespillereMain() {
  const {setBreadcrumbs} = useContext(BreadcrumbsContext)

  useEffect(() => {
    setBreadcrumbs([
      {isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home'},
      {
        isActive: false,
        isSeparator: false,
        path: 'home/stottespillere',
        title: 'Støtte',
      },
      {
        isActive: true,
        isSeparator: false,
        path: 'home/stottespillere',
        title: 'Støttespillere',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>Oversikt støttespillere</h3>

        {/* <div className='d-flex flex-wrap my-2'>
          <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a>
        
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
            data-kt-menu='true'
          >
           
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>30 Days</a>
            </div>
          
            <div className='menu-item px-3'>
              <a className='menu-link px-3'>90 Days</a>
            </div>
           
          </div>
         
        </div> */}
      </div>
      <div className='row '>
        {/*begin::Col*/}

        {/* <div className='col-xl-4 px-2'>
          <MixedWidget13
            className='card-xl-stretch mb-xl-10 card_borderC'
            backGroundColor='#ffff'
            chartHeight='100px'
            title='Støttespillere '
            description=''
            numbertext='560'
            // updownVal='18'
          />
        </div> */}

        {/* <div className='col-xl-4 px-2'>
          <MixedWidget13
            className='card-xl-stretch mb-xl-10 card_borderC'
            backGroundColor='#ffff'
            chartHeight='100px'
            title='Aktive støtter'
            description=''
            numbertext='713'
            // updownVal='22'
          />
        </div> */}
        {/* <div className='col-xl-4 px-2'>
          <MixedWidget13
            className='card-xl-stretch mb-xl-10 card_borderC'
            backGroundColor='#ffff'
            chartHeight='100px'
            title='Total støtte mottatt'
            description=''
            numbertext='560 010,-'
          />
        </div> */}
      </div>

      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5 d-flex'>
          <h3 className='card-title align-items-start flex-column '>
            <span className='card-label fw-bold fs-3 mb-1'>Støttespillere</span>
            <span className='text-muted mt-1 fw-bold fs-7'>
            Oversikt over alle registrerte støttespillere fra alle organisasjoner
            </span>
          </h3>

          <div className='col-md-6'>
            {' '}
            <StottespillereSearch />
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <StottespillereTable />
          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}
