export const baseUrl = process.env.REACT_APP_ELASTICSEARCH_URL || 'https://elasticsearch.codeformuenster.org';
export const prefix = process.env.REACT_APP_ELASTICSEARCH_INDEX_PREFIX || 'mein-ms-';
export const districtIndex = `${prefix}districts`;
export const placesIndex = `${prefix}places`;
