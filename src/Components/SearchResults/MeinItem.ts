import SearchResultsConstruction from './SearchResultsConstruction';
import SearchResultsKindergarden from './SearchResultsKindergarden';
import SearchResultsLunch from './SearchResultsLunch';
import SearchResultsPlayground from './SearchResultsPlayground';
import SearchResultsPool from './SearchResultsPool';
import SearchResultsWc from './SearchResultsWc';
import SearchResultsWifi from './SearchResultsWifi';
import SearchResultsWebcam from './SearchResultsWebcam';
import SearchResultsDefault from './SearchResultsDefault';
import SearchResultsEvent from './SearchResultsEvent';

export interface IMeinItem {
    name: string;
    icon: string;
    color: string;
    component: any;
}

/**
 * Class to hold colors, types, names and icons for all our Types
 */
export abstract class MeinItems {

    public static items: {[id: string]: IMeinItem} = {
      babychange: {
        name: 'Wickelraum',
        icon: 'mdi-baby-buggy',
        color: 'is-link',
        component: SearchResultsDefault
      },
      construction: {
        name: 'Baustelle',
        icon: 'mdi-vlc',
        color: 'is-danger',
        component: SearchResultsConstruction
      },
      kindergarden: {
        name: 'Kindergarten',
        icon: 'mdi-baby',
        color: 'is-primary',
        component: SearchResultsKindergarden
      },
      lunch: {
        name: 'Mittagstisch',
        icon: 'mdi-food',
        color: 'is-link',
        component: SearchResultsLunch
      },
      pool: {
        name: 'Bad',
        icon: 'mdi-pool',
        color: 'is-info',
        component: SearchResultsPool
      },
      playground: {
        name: 'Spielplatz',
        icon: 'mdi-castle',
        color: 'is-warning',
        component: SearchResultsPlayground
      },
      wc: {
        name: 'Toilette',
        icon: 'mdi-human-male-female',
        color: 'is-light',
        component: SearchResultsWc
      },
      wifi: {
        name: 'WLAN',
        icon: 'mdi-wifi',
        color: 'is-dark',
        component: SearchResultsWifi
      },
      webcam: {
        name: 'Webcam',
        icon: 'mdi-camera',
        color: 'is-success',
        component: SearchResultsWebcam
      },
      event: {
        name: 'Termin',
        icon: 'mdi-calendar-text',
        color: 'is-success',
        component: SearchResultsEvent
      },
      school: {
        name: 'Schule',
        icon: 'mdi-school',
        color: 'is-light',
        component: SearchResultsDefault
      },
      sport: {
        name: 'Sportstätte',
        icon: 'mdi-soccer',
        color: 'is-success',
        component: SearchResultsDefault
      },
      agencies: {
        name: 'Amt',
        icon: 'mdi-briefcase',
        color: 'is-danger',
        component: SearchResultsDefault
      },
      library: {
        name: 'Bücherei',
        icon: 'mdi-book',
        color: 'is-warning',
        component: SearchResultsDefault
      }
    };

    public static getItem(key: string): IMeinItem {
      return MeinItems.items[key] || {
        name: key,
        icon: key,
        color: key,
        component: SearchResultsDefault
      };
    }
}
