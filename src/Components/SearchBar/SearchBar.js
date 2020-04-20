import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { SearchCategories } from 'Components/SearchCategories/SearchCategories'

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

const UpperBox = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`

const SearchBox = styled.div`
  width: calc(100% - 50px);
  height: 45px;
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  border: 1px solid #FCEF5C;
  border-radius: 10px;
`

const SearchOptions = styled.div`
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  background: white;
  padding: 10px;
  border: 1px solid #FCEF5C;
  border-radius: 50px;
`

const rotateUp180 = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
`

const rotateDown180 = keyframes`
  0% { transform: rotate(180deg); }
  100% { transform: rotate(0deg); }
`

const ChevronIcon = styled.i.attrs({
  className: 'fa fa-chevron-down',
})`
  color: gray;
  font-size: 20px;
  transform-origin: 50% 50%;
  animation-name: ${(props) => {
    if (props.isOpen === null) {
      return null
    }
    return props.isOpen ? rotateUp180 : rotateDown180
  }};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
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
  min-width: calc(100% - 20px);

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

const CategoriesContainer = styled.div`
  position: relative;
  background: white;
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

    this.state = {
      isCategoriesOpen: true,
    }
  }

  handleOpen = () => {
    this.setState({
      isCategoriesOpen: !this.state.isCategoriesOpen
    })
  }


  render() {
    const { searchQuery } = this.props
    const { isCategoriesOpen } = this.state
    
    return (
      <SearchContainer>
        <UpperBox>
          <SearchBox>
            <SearchIcon />
            <SearchText placeholder='Suchbegriff' onChange={this.props.onChange} value={searchQuery} />
          </SearchBox>
          <SearchOptions onClick={this.handleOpen}>
            <ChevronIcon isOpen={isCategoriesOpen} />
          </SearchOptions>
        </UpperBox>
        {
          isCategoriesOpen
            ? <SearchCategories />
            : null
        }
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
