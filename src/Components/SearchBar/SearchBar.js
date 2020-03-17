import React, { Component } from 'react'
import styled from 'styled-components'

const SearchContainer = styled.div`
  position: absolute;
  top: 15px;
  width: calc(100% - 30px);
  left: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`

const SearchBox = styled.div`
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
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

const SearchOffer = styled.div`
  position: relative;
  background: white;
  width: 100%;
  height: 35px;
  color: red;
  padding: 5px 10px;
  border: 1px solid #FCEF5C;
  border-radius: 10px;
  z-index: 100;
  top: 0;
`

export class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { searchQuery } = this.props
    
    return (
      <SearchContainer>
        <SearchBox>
          <SearchIcon />
          <SearchText placeholder='Suchbegriff' onChange={this.props.onChange} value={searchQuery} />
        </SearchBox>
        {
          this.props.searchOffers.map(offer => (
            <SearchOffer key={offer.name} onClick={() => this.props.offerSelected(offer)}>
              {offer.icon} - {offer.name}
            </SearchOffer>
          ))
        }
      </SearchContainer>
    )
  }
}
