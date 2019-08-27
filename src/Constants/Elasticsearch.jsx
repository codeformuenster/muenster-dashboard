export const elasticsearchUrlPrefix = process.env.REACT_APP_ELASTICSEARCH_URL_PREFIX || 'https://elasticsearch.codeformuenster.org/mein-ms2-';
export const baseUrl = elasticsearchUrlPrefix.slice(0, elasticsearchUrlPrefix.lastIndexOf('/'));
export const baseUrlAlternativeHost = 'https://data.mein-ms.de/';
export const prefix = elasticsearchUrlPrefix.slice(elasticsearchUrlPrefix.lastIndexOf('/') + 1);
export const districtIndex = `${prefix}districts`;
export const placesIndex = `${prefix}places`;
/**
 * Return our fallback elasticsearch host if the primary one is down
 */
export let getBaseUrl = function () {
    let host = baseUrl;
    if (window.location.hash === '#es2') {
        console.log('Using elastic host fallback.');
        host = baseUrlAlternativeHost;
    }
    return host;
};
/**
 * Method that will be called if an elastic search error occurs
 */
export let switchElasticSearchHost = function () {
    if (window.location.hash === '#es2') {
        console.log('Elasticsearch error occured on alternative host. Not switching hosts.');
    }
    else {
        window.location.href = '#es2';
        window.location.reload();
    }
};
