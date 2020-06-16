export const elasticsearchUrlPrefix = process.env.REACT_APP_ELASTICSEARCH_URL_PREFIX || 'https://data.mein-ms.de/'
export const baseUrl = elasticsearchUrlPrefix.slice(0, elasticsearchUrlPrefix.lastIndexOf('/'))
export const baseUrlAlternativeHost = 'https://elasticsearch.codeformuenster.org/mein-ms2-'
export const prefix = elasticsearchUrlPrefix.slice(elasticsearchUrlPrefix.lastIndexOf('/') + 1)
export const districtIndex = `${prefix}districts`
export const placesIndex = `${prefix}places`
/**
 * Return our fallback elasticsearch host if the primary one is down
 */
export const getBaseUrl = () => {
  let host = baseUrl
  if (window.location.hash === '#es2') {
    console.log('Using elastic host fallback.')
    host = baseUrlAlternativeHost
  }
  console.log('elastic url:', host);
  return host
}
