import React, { Component } from 'react'
import styled from 'styled-components'

const SearchCatContainer = styled.div`
  position: absolute;
  overflow-x: hidden;
  width: 100%;
  height: 35px;
  z-index: 100;
  top: 45px;
  left: 0;
`

const SearchCatRow = styled.div.attrs(props => ({
  style: {
    transform: `translate(${props.xOffset}px)`,
  }
}))`
  position: absolute;
  display: flex;
  flex-direction: row;
  height: 35px;
  left: 0;
`

// written externally because is also used for horizontal slider
const marginRightPX = 20

const SearchOffer = styled.div`
  position: relative;
  background: white;
  height: 35px;
  width: max-content;
  color: red;
  padding: 5px 10px;
  margin-right: ${marginRightPX}px;
  border: 1px solid #FCEF5C;
  border-radius: 10px;
`

export class SearchCategories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xOffset: 0,
      trackSlide: false,
      clientX: null,
      maxXOffset: Infinity,
    }

    this.rowRef = React.createRef()
    this.containerRef = React.createRef()
  }

  componentDidMount() {
    const containerWidth = this.containerRef.current.offsetWidth
    const maxOffset = this.rowRef.current.offsetWidth
    this.setState({
      maxXOffset: containerWidth - maxOffset + marginRightPX,
    })
  }

  handleTouchStart = (e) => {
    e.stopPropagation()
    this.setState({
      trackSlide: true
    })
  }

  handleTouchMove = (e) => {
    e.stopPropagation()
    const { clientX: currClientX } = e.changedTouches[0]
    const {
      clientX: formerClientX,
      xOffset,
      maxXOffset,
    } = this.state
    if (!formerClientX) {
      this.setState({
        clientX: currClientX,
      })
    } else if (currClientX > formerClientX) { // slide right
      const newXOffset = xOffset + currClientX - formerClientX
      if (newXOffset < 0) {
        this.setState({
          clientX: currClientX,
          xOffset: newXOffset,
        })
      } else {
        this.setState({
          clientX: currClientX,
          xOffset: 0,
        })
      }
    } else if (currClientX < formerClientX) { // slide left
      const newXOffset = xOffset - formerClientX + currClientX
      if (newXOffset > maxXOffset) {        
        this.setState({
          clientX: currClientX,
          xOffset: newXOffset,
        })
      } else {
        this.setState({
          clientX: currClientX,
          xOffset: maxXOffset,
        })
      }
    }
  }

  handleTouchEnd = () => {
    this.setState({
      clientX: null,
    })
  }

  render() {
    const { xOffset } = this.state 
    const {
      categories,
      categorySelected,
    } = this.props
    
    return (
      <SearchCatContainer ref={this.containerRef}>
        <SearchCatRow
          xOffset={xOffset}
          ref={this.rowRef}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          {
            categories.map((item) => (
              <SearchOffer key={item.name} onClick={() => categorySelected(item)}>
                {item.name}
              </SearchOffer>
            ))
          }
        </SearchCatRow>
      </SearchCatContainer>
    )
  }
}
