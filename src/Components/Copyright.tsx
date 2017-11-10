import * as React from 'react';
import './Copyright.css';
class Copyright extends React.Component<any, any> {
  render() {

    const Rainbow = require('color-rainbow');

    var numColors = 10;
    var rainbowColors = Rainbow.create(numColors);

    const infos = [
      [ 'Emoji-Icons',
        (<div>Alle Emojis auf dieser Seite stammen aus aus der <a href="https://github.com/twitter/twemoji">Twemoji 2.3 Bibliothek von Twitter</a></div>)
      ],
      [ 'Schriftarten',
        (
          <div>Für das Logo und verschiedene Überschriften
          nutzen wir <a href="https://fonts.google.com/specimen/Londrina+Solid">die Schriftart "Londrina Solid" von Google Fonts</a></div>)
      ],
      [ 'Logo-Icon',
        (
          <div>Das Logo-Icon "family house" wurde erstellt
          von <a href="https://thenounproject.com/rafaleao/uploads/?i=38650"> von Oksana Latysheva from the Noun Project</a></div>)
      ],
      [ 'Karten',
        (
          <div>Für unsere Kartendarstellung nutzen wir Karten-Tiles
          von <a href="http://www.openstreetmap.org/copyright">© OpenStreetMap-Mitwirkende nach CC BY-SA</a></div>)
      ],
      [ 'Css Framework',
        (
          <div>
            <a href="https://bulma.io">
              <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="256" height="48" />
            </a></div>
        )
      ]
    ];

    let colorNr = 0;
    let rows = [];
    for (let info of infos) {
      const myColor = rainbowColors[colorNr++].hexString();
      rows.push( (
        <div className="box SideColorBox" style={{background: 'linear-gradient(to right, ' + myColor + ' ,' + myColor + ' 20px,#fff 20px)'}}>
          <p className="title">{info[0]}</p>
          {info[1]}
        </div>
      ));
    }
    return (
      <section className="section copyrightBg">
        <div className="container">
          <div className="content gradientBg">
            <h1>Copyright Hinweise</h1>
            {rows}
          </div>
        </div>
      </section>
    );
  }

}
export default Copyright;
