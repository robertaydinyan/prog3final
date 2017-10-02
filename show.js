var jsonfile = require('jsonfile')
var file = 'db.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})