import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from 'react-router-dom'

import LogoIgnit from '../../assets/logo-ignit.svg'
import { HeaderContainer } from './styles'

export function Header() {
  return (
    <HeaderContainer>
      <img src={LogoIgnit} alt="" />
      <nav>
        <NavLink to={'/'}>
          <Timer size={24} />
        </NavLink>
        <NavLink to={'/history'}>
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
