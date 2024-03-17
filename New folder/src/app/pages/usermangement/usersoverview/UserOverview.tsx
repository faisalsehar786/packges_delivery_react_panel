import React, { useContext, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { UsersListWrapper } from '../../../modules/apps/user-management/users-list/UsersList'
import BreadcrumbsContext from '../../../../_metronic/layout/core/Breadcrumbs'

const UserOverview: React.FC = () => {
  const { setBreadcrumbs } = useContext(BreadcrumbsContext)

  useEffect(() => {
    setBreadcrumbs([
      { isActive: false, isSeparator: false, path: 'home/oversikt', title: 'Home' },
      {
        isActive: false,
        isSeparator: false,
        path: '/user-mangement/user-overview',
        title: 'Brukere',
      },
      {
        isActive: true,
        isSeparator: false,
        path: '/user-mangement/user-overview',
        title: 'Oversikt',
      },
    ])
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>System brukere</h3>

        <div className='d-flex flex-wrap my-2'>
          <Link to='/user-mangement/add-new-user'>
            <button className='btn btn-primary '>
              <i className='bi bi-person-plus-fill iconbtnStylecx  me-2' />
              Opprett ny bruker
            </button>
          </Link>
          {/* <a
            href='#'
            className='bg-white btn text-muted'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
          >
            Filter
            <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 mxC-3' />
          </a> */}
        </div>
      </div>
      <UsersListWrapper />
    </>
  )
}

export { UserOverview }
