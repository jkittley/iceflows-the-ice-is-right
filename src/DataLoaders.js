import Papa from 'papaparse';

function loadCardData (onRowRead, onComplete, onError) {
  var csvFilePath = require("./res/data-cards.csv");
  Papa.parse(csvFilePath, {
    download: true,
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (x) => x.trim(),
    transformHeader: (x) => x.trim(),
    error: onError,
    complete: function(results) {
      // Get the facts
      var factIds = results.meta.fields.filter(field => field.trim().startsWith("fact")).map(field => field.trim()); 
      var factMeta = {}

      // Add the rows
      results.data.forEach(function (row) {

        // Meta data from meta rows
        if (row.title === "meta") {
          factIds.forEach(function (factId) { 
            if (!(factId in factMeta)) factMeta[factId] = { id: factId };
            factMeta[factId][row.imagePath] = row[factId];
          });

        // Facts from rows
        } else {
          var facts = [];
          factIds.forEach(factId => facts.push({ 
            ...factMeta[factId],
            value: row[factId],
          }))

          //  Row Callback
          onRowRead({ ...row, id: row['No'], facts: facts });

        }
      });

      // On complete callback
      onComplete(factMeta);

    }
  });
  return true;
}



function loadZoneData (onRowRead, onComplete, onError) {
  var csvFilePath = require("./res/data-zones.csv");
  Papa.parse(csvFilePath, {
    download: true,
    delimiter: ",",
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transform: (x) => x.trim(),
    transformHeader: (x) => x.trim(),
    error: onError,
    complete: function(results) {
      // Add the rows
      results.data.forEach(function (row) {
          //  Row Callback
          var x = {};
          x[row.zoneId] = row;
          onRowRead(x);
      });

      // On complete callback
      onComplete();

    }
  });
  return true;
}

export { loadCardData, loadZoneData }