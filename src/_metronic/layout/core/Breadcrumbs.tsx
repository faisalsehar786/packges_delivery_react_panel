import { createContext } from 'react'

export interface Breadcrumb {
  title: string
  path: string
  isActive: boolean
  isSeparator: boolean
}

const BreadcrumbsContext = createContext({
  breadcrumbs: [] as Breadcrumb[],
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => {},
})

export default BreadcrumbsContext
