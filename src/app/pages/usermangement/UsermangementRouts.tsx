import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import { UserOverview } from './usersoverview/UserOverview'
import GolbalSettings from './createnewuser/GolbalSettings'
import { UpdateUserDetails } from './updateuser'
import { UpdateProfileDetails } from './updateprofile'

const userMangementBreadCrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/usermangement',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const UsermangementRouts = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='add-new-user'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Opprett ny bruker</PageTitle>
            <GolbalSettings />
          </>
        }
      />

      <Route
        path='user-overview/update-profile'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Oppdatere bruker</PageTitle>
            <UpdateProfileDetails />
          </>
        }
      />

      <Route
        path='user-overview/update-user/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Oppdatere bruker</PageTitle>
            <UpdateUserDetails />
          </>
        }
      />

      <Route
        path='user-overview'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>User Overview</PageTitle>
            <UserOverview />
          </>
        }
      />

      <Route index element={<Navigate to='/user-mangement/user-overview' />} />
    </Route>
  </Routes>
)

export default UsermangementRouts
