import { Outlet } from 'react-router-dom'
import { Header } from '../../component/Header'
import { Layoutconteiner } from './styles'

export function DefaultLayout() {
  return (
    <Layoutconteiner>
      <Header />
      <Outlet />
    </Layoutconteiner>
  )
}
