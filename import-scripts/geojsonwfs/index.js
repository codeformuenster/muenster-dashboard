
const queue = require('async/queue')
const genericWorker = require('./worker')
const playgroundWorker = require('./playgroundWorker')
const kitaWorker = require('./kitaWorker')

//  `type`: { servName, typeName, type }
const tasks = {
  baeder: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:baeder', type: 'pool',
  },
  behoerden: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:behoerden', type: 'agencies',
  },
  buecherbus: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:buecherbus', type: 'bookbus',
  },
  libraries: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:buechereien', type: 'library',
  },
  cemeteries: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:friedhoefe', type: 'cemetery',
  },
  toiletten: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:Toiletten', type: 'wc',
  },
  wifiaps: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:WLAN-Standorte', type: 'wifi',
  },
  papierkorb: {
    worker: genericWorker, servName: 'poiserv', typeName: 'ms:papierkorb', type: 'papierkorb',
  },
  schulen: {
    worker: genericWorker, servName: 'schulenserv', typeName: 'ms:schulen', type: 'school',
  },

  spielplaetze: {
    worker: playgroundWorker, servName: 'odspielplserv', typeName: 'spielplaetze', type: 'playground',
  },
  sportstaetten: {
    worker: playgroundWorker, servName: 'odsportstserv', typeName: 'sportstaetten', type: 'sport',
  },

  kitas: {
    worker: kitaWorker, servName: 'kitaserv', typeName: 'ms:kitas01', type: 'kindergarden',
  },
}

const importToES = function importToES(task, cb) {
  task.worker(task)
    .then(() => {
      cb(null)
    })
    .catch((err) => {
      cb(err)
    })
}

const q = queue(importToES, 1)

for (const [_, task] of Object.entries(tasks)) {
  q.push(task, () => {
    console.log(`done importing ${task.typeName}`)
  })
}
