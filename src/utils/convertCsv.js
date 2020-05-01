import csv2geojson from 'csv2geojson';
const axios = require('axios');

// function readTextFile() {
//     return fs.readFileSync('../../time-series-19-covid-combined_csv.csv', 'utf8')
// }
function getData() {
     return new Promise((resolve, reject) => {
        axios.get('http://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/04-30-2020.csv')
        .then(function(response) {
            resolve(response)
        })
        .catch(function(error) {
            reject(error)
        })
    })   
}
export function convertCsv() {
    return getData().then((data) => {
            // console.log(data)
            // data
            // console.log(data)
            let geoJsonData;
            csv2geojson.csv2geojson(data.data, {
                latfield: 'Lat',
                lonfield: 'Long_',
                delimiter: ','
            }, function(err, convertedData) {
                geoJsonData = convertedData;
                // err has any parsing errors
                // data is the data.
                // return new Promise(convertedData)
                // return Promise.resolve(convertedData)
                // return convertedData
            })
            return Promise.resolve(geoJsonData)
            // return Promise.resolve(data)
        }
    )
}
// using async-await
// export async function convertCsv() {
//     const data = await getData();
//     // data
//     // console.log(data)
//     csv2geojson.csv2geojson(data.data, {
//         latfield: 'Lat',
//         lonfield: 'Long_',
//         delimiter: ','
//     }, function (err, convertedData) {
//         // err has any parsing errors
//         // data is the data.
//         // return new Promise(convertedData)
//         // return Promise.resolve(convertedData)
//         return convertedData;
//     });
// }


// .then((data) => {
//     console.log(data)
// })
// console.log(csvData)
// export var geoJson = csv2geojson.csv2geojson(csvData, {
//     latfield: 'Lat',
//     lonfield: 'Long_',
//     delimiter: ','
// }, function(err, data) {
//     // err has any parsing errors
//     // data is the data.
//     console.log(data);
// });
