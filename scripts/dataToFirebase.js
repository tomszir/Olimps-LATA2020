const path = require('path');
const xlsx = require('node-xlsx').default;
const firebase = require('firebase');
const firebaseConfig = require('../src/config/firebase');

require('firebase/firestore');

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore().collection('locations');

function createDatabaseObject(workSheet) {
  const m = [];

  workSheet.slice(1, workSheet.length).forEach(v => {
    const o = {};

    v.forEach((v, i) => {
      const k = workSheet[0][i];
      o[k] = v;
    });

    m.push(o);
  });

  return m;
}

const museums = createDatabaseObject(
  xlsx.parse(path.join(__dirname, '/data/Muzeji.xlsx'))[0].data,
);

const libraries = createDatabaseObject(
  xlsx.parse(path.join(__dirname, '/data/Bibliotekas.xlsx'))[0].data,
);

Promise.all(
  museums.map(l => {
    const fields = {};

    if (l['Sākums'] && l['Sākums'] != '') {
      fields['Sākums'] = l['Sākums'];
    }

    if (l['Misija'] && l['Misija'] != '') {
      fields['Misija'] = l['Misija'];
    }

    if (l['Sākums'] && l['Sākums'] != '') {
      fields['Sākums'] = l['Sākums'];
    }

    try {
      return db.add({
        title: l['Objekta nosaukums'],
        thumbnailURL: '',
        tags: ['museum', 'opendata'],
        address: l['Adrese'],
        coordinates: {
          latitude: l['LAT'],
          longitude: l['LON'],
        },
        fields,
      });
    } catch (err) {
      return null;
    }
  }),
);

/*
Promise.all(
  libraries.map(l => {
    const fields = {};

    if (l['Sākums'] && l['Sākums'] != '') {
      fields['Sākums'] = l['Sākums'];
    }

    if (l['Misija'] && l['Misija'] != '') {
      fields['Misija'] = l['Misija'];
    }

    if (l['Sākums'] && l['Sākums'] != '') {
      fields['Sākums'] = l['Sākums'];
    }

    try {
      return db.add({
        title: l['Objekta nosaukums'],
        thumbnailURL: '',
        tags: ['library', 'opendata'],
        address: l['Adrese'],
        coordinates: {
          latitude: l['LAT'],
          longitude: l['LON'],
        },
        fields,
      });
    } catch (err) {
      return null;
    }
  }),
)*/

/*
Promise.all(
  workSheetsFromFile[0].data.slice(1, data.length).map(d => {
    return db.add({
      title: '',
      description: d[10],
      thumbnailURL: '',
      tags: ['museum', 'opendata'],
      address: d[2],
      coordinates: {
        latitude: d[3],
        longitude: d[4],
      },
    });
  }),
);
*/
