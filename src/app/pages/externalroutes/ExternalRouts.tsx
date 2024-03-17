import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import ZendeskMain from '../zendesk/ZendeskMain'

const userMangementBreadCrumbs: Array<PageLink> = [
  {
    title: 'External',
    path: '/external',
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

const ExternalRouts = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route
        path='zendesk'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Zendesk</PageTitle>
            <ZendeskMain />
          </>
        }
      />

      <Route index element={<Navigate to='/user-mangement/user-overview' />} />
    </Route>
  </Routes>
)

export default ExternalRouts
