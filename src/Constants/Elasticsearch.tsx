
export const elasticsearchUrlPrefix = process.env.REACT_APP_ELASTICSEARCH_URL_PREFIX || 'https://elasticsearch.codeformuenster.org/mein-ms-';
export const baseUrl = elasticsearchUrlPrefix.slice(0, elasticsearchUrlPrefix.lastIndexOf('/'));
export const prefix = elasticsearchUrlPrefix.slice(elasticsearchUrlPrefix.lastIndexOf('/') + 1);

// export const baseUrl = process.env.REACT_APP_ELASTICSEARCH_URL || 'https://elasticsearch.codeformuenster.org';
// export const prefix = process.env.REACT_APP_ELASTICSEARCH_INDEX_PREFIX || 'mein-ms-';

export const districtIndex = `${prefix}districts`;
export const placesIndex = `${prefix}places`;
