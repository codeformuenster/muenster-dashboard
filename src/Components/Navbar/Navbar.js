import React, { Component } from 'react'
import styled from 'styled-components'
import {
  NavLink,
} from 'react-router-dom'

const NavbarContainer = styled.nav`
  width: 100vw;
  background-color: #000000;
  height: 50px;
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  z-index: 100;
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

const NavMenuIcon = styled.i`
  display: inline-block;
  color: white;
  font-size: 20px;
`

const SlideMenu = styled.div`
  width: 100vw;
  top: 49px;
  transform: ${p => p.isOpen ? 'scaleY(1)' : 'scaleY(0)'};
  transform-origin: top left;
  background-color: #000000;
  position: absolute;
  left: 0;
  padding-left: 15px;
  display: flex;
  transition: transform 1s ease;
  z-index: -1;
`

const LinkItem = styled.li`
  height: 40px;
  line-height: 40px;
`

const LinkText = styled.span`
  color: #ffffff;
`

function getParents(e) {
  var result = [];
  for (var p = e && e.parentElement; p; p = p.parentElement) {
    result.push(p);
  }
  return result;
}


export class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: null,
    }

    this.refList = [
      React.createRef(),
      React.createRef(),
      React.createRef(),
    ]

    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen: currentIsOpen } = this.state
    const { isOpen: formerIsOpen } = prevState
    if (currentIsOpen !== formerIsOpen) {
      const body = document.querySelector('body')
      if (formerIsOpen) {
        body.removeEventListener('mouseup', this.disableGlobalClick)
      } else {
        body.addEventListener('mouseup', this.disableGlobalClick)
      }
    }
  }

  disableGlobalClick = (e) => {
    const parentsTree = getParents(e.target)
    const isNavItem = parentsTree.some(elem => elem.id === 'nav-menu-button')
    if (!isNavItem) {
      this.handleToggle()
    }
  }

  handleToggle() {
    const { isOpen } = this.state
    this.refList.forEach((item) => {
      item.current.beginElement()
    })    
    this.setState({
      isOpen: !isOpen,
    })
  }

  render() {
    const { isOpen } = this.state
    return (
      <NavbarContainer>
        <LeftNav>
          <NavLink to="/">
            <Logo src='https://mein-ms.de/static/media/Logo.9a658356.svg' />
          </NavLink>
          <NavTitle>MEIN-MS.de</NavTitle>
        </LeftNav>
        <NavMenuIcon
          id="nav-menu-button"
          onClick={this.handleToggle}
        >
          <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
            <g>
              <title>Layer 1</title>
              <line id="svg_2" x1="2" x2="28" y1="5" y2="5" strokeWidth="2" stroke="white">
                <animate ref={this.refList[0]} attributeName="y2" from={isOpen ? "5" : "25"} to={isOpen ? "25" : "5"} begin="click" dur='1s' fill="freeze" /> 
              </line>
              <line id="svg_3" y2="15" x2="28" y1="15" x1="2" opacity='1' strokeWidth="2" stroke="white">
                <animate ref={this.refList[1]} attributeName="opacity" from={isOpen ? "1" : "0"} to={isOpen ? "0" : "1"} begin="click" dur='1s' fill="freeze" /> 
              </line>
              <line id="svg_4" x1="2" x2="28" y1="25" y2='25' strokeWidth="2" stroke="white">
                <animate ref={this.refList[2]} attributeName="y2" from={isOpen ? "25" : "5"} to={isOpen ? "5" : "25"} begin="click" dur='1s' fill="freeze" /> 
              </line>
            </g>
          </svg>
        </NavMenuIcon>
        <SlideMenu isOpen={isOpen}>
          <ul>
            <LinkItem>
              <NavLink to="/aktuelles">
                <LinkText>Aktuell im Viertel</LinkText>
              </NavLink>
            </LinkItem>
            <LinkItem>
              <NavLink to="/copyright">
                <LinkText>Copyright</LinkText>
              </NavLink>
            </LinkItem>
            <LinkItem>
              <NavLink to="/impressum">
                <LinkText>Impressum</LinkText>
              </NavLink>
            </LinkItem>
          </ul>
        </SlideMenu>
      </NavbarContainer>
    )
  }
}
