import React from 'react'

export const Copyright = () => {
  const rainbowColors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
    '#ff8800',
  ]
  const infos = [
    ['Datenquellen',
      (
        <div>Wir nutzen Daten aus dem{' '}
        <a href="http://www.stadt-muenster.de/katasteramt/geodatenmanagement/open-data.html">Open Data Portal der Stadt Münster</a>.</div>
      ),
    ],
    ['Nachrichten',
      (
        <div>Auf unserer Startzeite erscheinen Nachrichten{' '}
        <a href="http://www.wn.de">aus dem RSS Feed der westfälischen Nachrichten</a>.</div>
      ),
    ],
    ['Emoji-Icons',
      (<div>Alle Emojis auf dieser Seite stammen aus der <a href="https://github.com/twitter/twemoji">Twemoji 2.3 Bibliothek von Twitter</a>.</div>)
    ],
    ['Schriftarten',
      (
        <div>Für das Logo und verschiedene Überschriften
        nutzen wir <a href="https://fonts.google.com/specimen/Londrina+Solid">die Schriftart "Londrina Solid" von Google Fonts</a>.</div>)
    ],
    ['Logo-Icon',
      (
        <div>Das Logo-Icon "family house" wurde erstellt
        von <a href="https://thenounproject.com/rafaleao/uploads/?i=38650"> Oksana Latysheva from the Noun Project</a>.</div>)
    ],
    ['Karten',
      (
        <div>Für unsere Kartendarstellung nutzen wir Karten-Tiles
        von <a href="http://www.openstreetmap.org/copyright">© OpenStreetMap-Mitwirkende nach CC BY-SA</a>.</div>)
    ],
    ['CSS Framework',
      (
        <div>
          <a href="https://bulma.io">
            <img src="https://bulma.io/images/made-with-bulma.png" alt="Made with Bulma" width="256" height="48" />
          </a>
        </div>
      ),
    ],
  ]

  const rows = infos.map((info, idx) => {
    const myColor = rainbowColors[idx]
    return (
      <div
        className="box SideColorBox"
        style={{ background: `linear-gradient(to right, ${myColor} ,${myColor} 20px,#fff 20px)` }}
      >
        <p className="title">{info[0]}</p>
        {info[1]}
      </div>
    )
  })

  return (
    <section className="section copyrightBg">
      <div className="container">
        <div className="content gradientBg">
          <h1>Copyright Hinweise</h1>
          {rows}
        </div>
      </div>
    </section>
  )
}