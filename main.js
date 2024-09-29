const jsonfile = require('jsonfile');

const parks = [
  {
    title: 'Sihlcity',
    slug: 'sihlcity',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=34&location_name=FP_Sihlcity',
  },
  {
    title: 'Puls 5',
    slug: 'puls-5',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=29&location_name=FP_Puls5',
  },
  {
    title: 'Stockerhof',
    slug: 'stockerhof',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=32&location_name=FP_Stockerhof',
  },
  {
    title: 'Glattpark',
    slug: 'glattpark',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=31&location_name=FP_Glattpark',
  },
  {
    title: 'Stadelhofen',
    slug: 'stadelhofen',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=30&location_name=FP_Stadelhofen',
  },
  {
    title: 'Milandia',
    slug: 'milandia',
    url: 'https://www.fitnesspark.ch/wp/wp-admin/admin-ajax.php?action=single_park_update_visitors&location_id=12&location_name=FP_Milandia',
  },
];

const timestamp = Date.now();
let temp = 0;
fetch(
  'https://api.open-meteo.com/v1/forecast?latitude=47.3667&longitude=8.55&current=temperature_2m'
)
  .then((response) => response.json())
  .then((data) => {
    temp = data.current.temperature_2m;
    parks.forEach((park) => {
      fetch(park.url)
        .then((response) => response.json())
        .then((data) => {
          const obj = {
            timestamp,
            temperature: temp,
            visitors: data,
          };
          const file = `data/${park.slug}.json`;

          jsonfile.readFile(file, function (err, obj) {
            if (err) console.error(err);
            obj.push({ timestamp, temperature: temp, visitors: data });
            jsonfile.writeFile(file, obj, { flag: 'w' }, function (err) {
              if (err) console.error(err);
            });
          });
          // jsonfile.writeFile(
          //   `./data/${park.slug}.json`,
          //   obj,
          //   { flag: 'a' },
          //   function (err) {
          //     if (err) console.error(err);
          //   }
          // );
        });
    });
  });
