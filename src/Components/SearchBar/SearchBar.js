import React, { Component } from 'react'
import styled from 'styled-components'

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
  z-index: 10;
  border: 1px solid #FCEF5C;
  border-radius: 10px;
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

export class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Searchbox>
        <SearchIcon />
        <SearchText placeholder='Suchgriff' />
      </Searchbox>
    )
  }
}
