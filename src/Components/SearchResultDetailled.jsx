import * as React from 'react';
import './SearchResultDetailled.css';
import { MeinItems } from './SearchResults/MeinItem';
// display keys for the detail page
const keyMap = {
    name: 'Name',
    wlan_status: 'WLAN Status',
    schooltype: 'Schulart',
    url: 'Link',
    link1: 'Link',
    link1_txt: 'Linkbeschreibung',
    groesse: 'Größe',
    recycling_type: 'Recylingart',
    recycling_glass: 'Für Glas geeignet',
    recycling_glass_bottles: 'Für Glasflaschen geeignet',
    amenity: 'Einrichtung',
    plz: 'PLZ',
    strname: 'Straße',
    hsnr: 'Hausnummer',
    subtitle: 'Untertitel',
    description: 'Beschreibung',
    location: 'Ort',
    street: 'Straße',
    adresse: 'Adresse',
    homepage: 'Link',
    opening_hours: 'Öffnungszeiten',
    barrierefrei: 'Barrierefrei',
    montag: 'Montag',
    dienstag: 'Dienstag',
    mittwoch: 'Mittwoch',
    donnerstag: 'Donnerstag',
    freitag: 'Freitag',
    samstag: 'Samstag',
    sonntag: 'Sonntag'
};
/**
 * This component displays detailed information about one search result, like the distance and approximate arrival times.
 */
class SearchResultDetailled extends React.Component {
    render() {
        const result = this.props.result;
        console.log('Detailled result:', result);
        const meinItem = MeinItems.getItem(result.type);
        let icon = meinItem.icon;
        if (!icon) {
            icon = 'mdi-home';
        }
        return (<article key={result.id} className={'notification detailedItem'}>
        <div className="media">
          <div className="media-left">
            <p>
              <span className={'icon detailIcon notification is-large ' + meinItem.color}>
                <i className={'mdi mdi-48px ' + icon}/>
              </span>
            </p>
            <div className="distanceDiv has-text-centered">

              <span className={'tag ' + meinItem.color}>{this.capitalizeFirstLetter(meinItem.name)}</span>
              <br />
              <span className="tag is-white">{this.distancePrettifier(result.distance)}</span>
            </div>
          </div>
          <div className="media-content">
            <div className="content">
              <div className="pull-right closeBtn">
                <button onClick={e => this.toggleSelection()} className="delete" aria-label="delete"/>
              </div>
              <span className="title">
                <span>{result.name} &nbsp; </span>

              </span>
              <div className="is-clearfix">

                {result.url && (<a href={result.url} target="_blank">
                    <span className="icon is-large">
                      <i className="mdi mdi-16px mdi-web"/>
                    </span>
                    Webseite besuchen
                    </a>)}

                {result.dateStart && (<div>
                    <p className="has-text-danger">
                      <span className="icon">
                        <i className="mdi mdi-timetable"/>
                      </span>
                      Startdatum: {this.toHumanReadableDate(result.dateStart)}
                    </p>
                    <p className="has-text-danger">
                      <span className="icon">
                        <i className="mdi mdi-timetable"/>
                      </span>
                      Enddatum: {result.dateEnd ? this.toHumanReadableDate(result.dateEnd) : 'unbekannt'}
                    </p>
                  </div>)}

                <div className="properties">
                  <span><i>Typ:</i> {this.capitalizeFirstLetter(meinItem.name)}</span>
                  {this.renderProperties(result.properties)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>);
    }
    /**
     * componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here.
     * If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
     */
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    isoDateStringToDate(date) {
        return new Date(Date.parse(date));
    }
    toHumanReadableDate(date) {
        let isoDate = this.isoDateStringToDate(date);
        if (isoDate.getHours() > 0) {
            return isoDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
        }
        else {
            return isoDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: '2-digit' });
        }
    }
    distancePrettifier(dist) {
        return '' + Math.round(dist) + 'm';
    }
    getMinutesByFeet(dist) {
        return Math.round(dist / 80) + ' Min.';
    }
    getMinutesByCar(dist) {
        return Math.round(dist / 250) + ' Min.';
    }
    isRunning(wlanStatus) {
        return wlanStatus === 'in Bearbeitung';
    }
    capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    renderProperties(properties) {
        const response = [];
        for (const key in properties) {
            if (key) {
                switch (key.toLowerCase()) {
                    case 'rechtswert':
                    case 'hochwert':
                    case 'kita_id':
                    case 'e_name':
                    case 'rechts':
                    case 'lfdnr':
                    case 'hoch':
                    case 'id':
                        continue;
                    case 'skater':
                    case 'streetball':
                        if (!properties[key]) {
                            continue;
                        }
                        break;
                    case 'bereich':
                        switch (properties[key]) {
                            case 'A':
                            case 'A+B/C':
                                properties[key] = 'Spielplatz für alle Altersklassen mit zentraler Versorgungsfunktion';
                                break;
                            case 'B':
                            case 'B/C':
                                properties[key] = 'Spielplatz für Kleinkinder sowie schulpflichtige Kinder und Jugendliche zur Versorgung eines Wohnbereiches';
                                break;
                            case 'C':
                                properties[key] = 'Spielplatz für Kleinkinder';
                                break;
                            default:
                                break;
                        }
                        break;
                    case 'ball':
                        switch (String(properties[key])) {
                            case '0':
                                properties[key] = 'kein Ballspielplatz';
                                break;
                            case '1':
                                properties[key] = 'seperater Ballspielplatz';
                                break;
                            case '2':
                                properties[key] = 'Spielplatz mit integriertem Ballspielplatz';
                                break;
                            default:
                                break;
                        }
                        break;
                    default:
                }
                // check if a readable key is available
                let displayKey = key;
                if (key.toLowerCase().replace(':', '_') in keyMap) {
                    displayKey = keyMap[key.toLowerCase().replace(':', '_')];
                }
                // check if the value is a valid http address. If it is display as link
                if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(properties[key])) {
                    response.push(<span><i>{this.capitalizeFirstLetter(displayKey)}:</i> <a target="_blank" rel="noopener noreferrer" href={properties[key]}>Webseite besuchen</a></span>);
                }
                else {
                    response.push(<span><i>{this.capitalizeFirstLetter(displayKey)}:</i> {properties[key]}</span>);
                }
            }
        }
        return response;
    }
    toggleSelection() {
        const sp = this.props.searchParams;
        sp.selectedId = 0;
        this.props.updateHandler(sp);
    }
}
export default SearchResultDetailled;
