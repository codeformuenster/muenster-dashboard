import React, { Component } from 'react'
import styled from 'styled-components'

const Layout = styled.div`
  position: relative;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: red;
`

const Searchbox = styled.div`
  position: absolute;
  top: 15px;
  width: calc(100% - 30px);
  height: 45px;
  left: 15px;
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
`

const SearchIcon = styled.i.attrs({
  className: 'fa fa-search',
})`
  color: gray;
  font-size: 20px;

`

const SearchText = styled.input`
  border: none;
  font-size: 20px;
  outline: none;
  padding-left: 10px;
  padding-right: 10px;
  max-width: calc(100% - 20px);

  :focus {
    outline: none;
  }
`

export default class TestPage extends Component {
  render() {
    return (
      <>

      <Layout>
        <Searchbox>
          <SearchIcon/>
          <SearchText placeholder='Suchgriff' />
        </Searchbox>
      </Layout>
      </>
    )
  }
}
