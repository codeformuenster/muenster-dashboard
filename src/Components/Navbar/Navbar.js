import React, { Component } from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.nav`
  width: 100vw;
  background-color: #000000;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
`

const LeftNav = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled.img`
  width: 40px;
  height: 40px;
  transform: translateY(5px);
`

const NavTitle = styled.h1`
  font-size: 30px;
  font-family: Londrina Solid,cursive;
  color: #ffffff;
`

const NavMenuIcon = styled.i.attrs({
  className: 'fa fa-bars',
})`
  display: inline-block;
  color: white;
  font-size: 20px;
`

export class Navbar extends Component {
  render() {
    return (
      <NavbarContainer>
        <LeftNav>
          <Logo src='https://mein-ms.de/static/media/Logo.9a658356.svg' />
          <NavTitle>MEIN-MS.de</NavTitle>
        </LeftNav>
        <NavMenuIcon />
      </NavbarContainer>
    )
  }
}
