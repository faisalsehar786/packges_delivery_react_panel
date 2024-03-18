import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import OversiktMain from './oversikt/OversiktMain'
import TenderMain from './Tenders/TenderMain'
import ActiveTenderMain from './ActiveTenders/ActiveTenderMain'
import AppUserMain from './appusers/AppUserMain'
import { AppUserEdit } from './appusers/AppUserEdit'
import TenderSinglePage from './Tenders/TenderSinglePage'
// eslint-disable-next-line import/no-named-default

const userMangementBreadCrumbs: Array<PageLink> = [
  {
    title: 'Home',
    path: '/home',
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

const SupportRouts = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='oversikt'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Oversikt</PageTitle>
            <OversiktMain />
          </>
        }
      />
      <Route
        path='published_jobs'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Formål</PageTitle>
            <TenderMain />
          </>
        }
      />
      <Route
        path='published_job/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Formål detaljer</PageTitle>
            <TenderSinglePage />
          </>
        }
      />

      <Route
        path='activedeliveries'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Organisasjoner</PageTitle>
            <ActiveTenderMain />
          </>
        }
      />

      <Route
        path='app-users'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>App Users</PageTitle>
            <AppUserMain />
          </>
        }
      />

      <Route
        path='app-users/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>App Users</PageTitle>
            <AppUserEdit />
          </>
        }
      />

      <Route index element={<Navigate to='/user-mangement/user-overview' />} />
    </Route>
  </Routes>
)

export default SupportRouts
