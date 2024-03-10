import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import FormalEdit from './Formal/FormalEdit'
import FormalMain from './Formal/FormalMain'
import FormalSingle from './Formal/FormalSingle'
import OrgEdit from './organisasjoner/OrgEdit'
import AddOrg from '../add-new-org/AddOrg'
import OrgSingle from './organisasjoner/OrgSingle'
import OrganisasjonerMain from './organisasjoner/OrganisasjonerMain'
import OversiktMain from './oversikt/OversiktMain'
import RapporterApp from './rapporter/RapporterApp'
import RapporterOrg from './rapporter/RapporterOrg'
// eslint-disable-next-line import/no-named-default
import { default as RapporterMain, default as RapporterStotte } from './rapporter/RapporterStotte'
import StottespillereMain from './stottespillere/StottespillereMain'
import StottespillereSingle from './stottespillere/StottespillereSingle'

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
        path='formal'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Formål</PageTitle>
            <FormalMain />
          </>
        }
      />
      <Route
        path='add-org'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Legg til organisasjon</PageTitle>
            <AddOrg />
          </>
        }
      />
      <Route
        path='formalSingle/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Formål detaljer</PageTitle>
            <FormalSingle />
          </>
        }
      />
      <Route
        path='formalEdit/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Opprett nytt formål</PageTitle>
            <FormalEdit />
          </>
        }
      />
      <Route
        path='organisasjonerEdit/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Org. detaljer</PageTitle>
            <OrgEdit />
          </>
        }
      />
      <Route
        path='organisasjonerSingle/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Org. detaljer</PageTitle>
            <OrgSingle />
          </>
        }
      />
      <Route
        path='stottespillereSingle/:id'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Oversitk organisasjoner</PageTitle>
            <StottespillereSingle />
          </>
        }
      />
      <Route
        path='organisasjoner'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Organisasjoner</PageTitle>
            <OrganisasjonerMain />
          </>
        }
      />
      <Route
        path='stottespillere'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Støttespillere</PageTitle>
            <StottespillereMain />
          </>
        }
      />
      <Route
        path='rapporter'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Rapporter</PageTitle>
            <RapporterMain />
          </>
        }
      />
      <Route
        path='rapporter/app'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Rapporter app</PageTitle>
            <RapporterApp />
          </>
        }
      />
      <Route
        path='rapporter/org'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Rapporter app</PageTitle>
            <RapporterOrg />
          </>
        }
      />{' '}
      <Route
        path='rapporter/stotte'
        element={
          <>
            <PageTitle breadcrumbs={userMangementBreadCrumbs}>Rapporter app</PageTitle>
            <RapporterStotte />
          </>
        }
      />
      <Route index element={<Navigate to='/user-mangement/user-overview' />} />
    </Route>
  </Routes>
)

export default SupportRouts
