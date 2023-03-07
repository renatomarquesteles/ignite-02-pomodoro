import { Outlet } from 'react-router-dom'

import { Header } from '../../components/Header'

import { LayoutContainer } from './styles'

export const DefaultLayout = () => {
  return (
    <LayoutContainer>
      <Header />

      {/** The "children-routes" will be inserted in the Outlet component */}
      <Outlet />
    </LayoutContainer>
  )
}
