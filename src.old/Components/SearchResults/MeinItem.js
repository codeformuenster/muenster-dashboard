import SearchResultsConstruction from './SearchResultsConstruction'
import SearchResultsLunch from './SearchResultsLunch'
import SearchResultsPlayground from './SearchResultsPlayground'
import SearchResultsWc from './SearchResultsWc'
import SearchResultsWifi from './SearchResultsWifi'
import SearchResultsWebcam from './SearchResultsWebcam'
import SearchResultsDefault from './SearchResultsDefault'
import SearchResultsEvent from './SearchResultsEvent'
/**
 * Class to hold colors, types, names and icons for all our Types
 */
export class MeinItems {
  static getItem(key) {
    return MeinItems.items[key] || {
      name: key,
      icon: null,
      color: 'is-light',
      component: SearchResultsDefault,
    }
  }
}

MeinItems.items = {
  babychange: {
    name: 'Wickelraum',
    icon: 'mdi-baby-buggy',
    color: 'is-link',
    component: SearchResultsDefault,
  },
  bookbus: {
    name: 'Bücherbus',
    icon: 'mdi-bus-clock',
    color: 'is-link',
    component: SearchResultsDefault,
  },
  cemetery: {
    name: 'Friedhof',
    icon: 'mdi-grave-stone',
    color: 'is-light',
    component: SearchResultsDefault,
  },
  container: {
    name: 'Recycling-Container',
    icon: 'mdi-recycle',
    color: 'is-danger',
    component: SearchResultsDefault,
  },
  construction: {
    name: 'Baustelle',
    icon: 'mdi-vlc',
    color: 'is-danger',
    component: SearchResultsConstruction,
  },
  kindergarden: {
    name: 'Kindergarten',
    icon: 'mdi-baby',
    color: 'is-primary',
    component: SearchResultsDefault,
  },
  lunch: {
    name: 'Mittagstisch',
    icon: 'mdi-food',
    color: 'is-link',
    component: SearchResultsLunch,
  },
  pool: {
    name: 'Bad',
    icon: 'mdi-pool',
    color: 'is-info',
    component: SearchResultsDefault,
  },
  playground: {
    name: 'Spielplatz',
    icon: 'mdi-castle',
    color: 'is-warning',
    component: SearchResultsPlayground,
  },
  wc: {
    name: 'Toilette',
    icon: 'mdi-human-male-female',
    color: 'is-light',
    component: SearchResultsWc,
  },
  wifi: {
    name: 'WLAN',
    icon: 'mdi-wifi',
    color: 'is-dark',
    component: SearchResultsWifi,
  },
  webcam: {
    name: 'Webcam',
    icon: 'mdi-camera',
    color: 'is-success',
    component: SearchResultsWebcam,
  },
  event: {
    name: 'Termin',
    icon: 'mdi-calendar-text',
    color: 'is-black',
    component: SearchResultsEvent,
  },
  school: {
    name: 'Schule',
    icon: 'mdi-school',
    color: 'is-light',
    component: SearchResultsDefault,
  },
  sport: {
    name: 'Sportstätte',
    icon: 'mdi-soccer',
    color: 'is-success',
    component: SearchResultsDefault,
  },
  agencies: {
    name: 'Amt',
    icon: 'mdi-briefcase',
    color: 'is-black',
    component: SearchResultsDefault,
  },
  papierkorb: {
    name: 'Papierkorb',
    icon: 'mdi-trash-can-outline',
    color: 'is-black',
    component: SearchResultsDefault,
  },
  library: {
    name: 'Bücherei',
    icon: 'mdi-book',
    color: 'is-warning',
    component: SearchResultsDefault,
  },
}
