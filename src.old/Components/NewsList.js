import * as React from 'react'

import { NewsService } from '../Services/NewsService'
import './NewsList.css'
/**
 * This component displays the various news results as retrieved from the newspaper WN.
 */
export class NewsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: [],
    }
  }

  componentDidMount() {
    new NewsService().loadNews((results) => {
      this.setState({
        news: results,
      })
    })
  }

  render() {
    const { news } = this.state
    return (
      <div className="wn_news">
        <h2 className="title">WN Aktuell</h2>
        <div className="columns">
          {
            news.map((result) => (
              <div key={result.id} className="column">
                <article className="box">
                  <div className="content ">
                    <a className="subtitle" href={result.url}>{result.title}</a>
                    <div className="content">
                      {result.description}
                    </div>
                  </div>
                </article>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
