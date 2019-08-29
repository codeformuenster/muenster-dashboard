import * as React from 'react'

import { MeinItems } from './SearchResults/MeinItem'
import { SearchResultDetailed } from './SearchResultDetailed'
import './SearchResults.css'
/**
 * This component contains the various search results,
 * displaying one SearchResults-component (not this one,
 * but the one in sub folder SearchResults) for each one.
 * If a result was selected, display a SearchResultDetailed for that result.
 */
export class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    /**
     * Onclick handler for search result row, updates selectedId in searchParams
     */
    this.toggleSelection = (event, id) => {
      const { searchParams, updateHandler } = this.props
      if (searchParams.selectedId === id) {
        searchParams.selectedId = 0
      } else {
        searchParams.selectedId = id
      }
      updateHandler(searchParams)
    }
  }

  render() {
    let { results = [] } = this.props
    // limit the number of displayed results. If none was given display the first 200
    const { searchParams, updateHandler, limit = 200 } = this.props
    if (searchParams.selectedId) {
      const result = results.find((element) => searchParams.selectedId === element.id)
      if (result) {
        return (
          <SearchResultDetailed
            result={result}
            searchParams={searchParams}
            updateHandler={updateHandler}
          />
        )
      }
    }
    results = results.filter((element) => {
      let date = null
      if (element.dateStart !== null) {
        date = new Date(element.dateStart)
      }
      return element.type !== 'event' || (date === null || date.getDay() === new Date().getDay())
    })
    if (results && results.length > limit) {
      results = results.slice(0, limit)
    }
    return (
      <div className="search_results">
        {results.map((result) => {
          const meinItem = MeinItems.getItem(result.type)
          const ComponentClass = meinItem.component
          const searchResultComponent = <ComponentClass result={result} icon={meinItem.icon} />
          return (
            <article
              key={result.id}
              className={`notification${(searchParams.selectedId === result.id) ? ` ${meinItem.color}` : ''}`}
              onClick={(e) => this.toggleSelection(e, result.id)}
            >
              {searchResultComponent}
            </article>
          )
        })}
      </div>
    )
  }
}
