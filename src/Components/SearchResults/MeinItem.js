/**
 * Class to hold colors, types, names and icons for all our Types
 */

const meinItems = {
  babychange: {
    name: 'Wickelraum',
    icon: 'mdi-baby-buggy',
    color: 'is-link',
  },
  bookbus: {
    name: 'Bücherbus',
    icon: 'mdi-bus-clock',
    color: 'is-link',
  },
  cemetery: {
    name: 'Friedhof',
    icon: 'mdi-grave-stone',
    color: 'is-light',
  },
  container: {
    name: 'Recycling-Container',
    icon: 'mdi-recycle',
    color: 'is-danger',
  },
  construction: {
    name: 'Baustelle',
    icon: 'mdi-vlc',
    color: 'is-danger',
  },
  kindergarden: {
    name: 'Kindergarten',
    icon: 'mdi-baby',
    color: 'is-primary',
  },
  lunch: {
    name: 'Mittagstisch',
    icon: 'mdi-food',
    color: 'is-link',
  },
  pool: {
    name: 'Bad',
    icon: 'mdi-pool',
    color: 'is-info',
  },
  playground: {
    name: 'Spielplatz',
    icon: 'mdi-castle',
    color: 'is-warning',
  },
  wc: {
    name: 'Toilette',
    icon: 'mdi-human-male-female',
    color: 'is-light',
  },
  wifi: {
    name: 'WLAN',
    icon: 'mdi-wifi',
    color: 'is-dark',
  },
  webcam: {
    name: 'Webcam',
    icon: 'mdi-camera',
    color: 'is-success',
  },
  event: {
    name: 'Termin',
    icon: 'mdi-calendar-text',
    color: 'is-black',
  },
  school: {
    name: 'Schule',
    icon: 'mdi-school',
    color: 'is-light',
  },
  sport: {
    name: 'Sportstätte',
    icon: 'mdi-soccer',
    color: 'is-success',
  },
  agencies: {
    name: 'Amt',
    icon: 'mdi-briefcase',
    color: 'is-black',
  },
  papierkorb: {
    name: 'Papierkorb',
    icon: 'mdi-trash-can-outline',
    color: 'is-black',
  },
  library: {
    name: 'Bücherei',
    icon: 'mdi-book',
    color: 'is-warning',
  },
}

export const getMarkerItem = (key) => {
  return meinItems[key] || {
    name: key,
    icon: null,
    color: 'is-light',
  }
}
