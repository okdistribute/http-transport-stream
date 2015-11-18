var getport = require('getport')
var test = require('tape')
var http = require('http')
var transport = require('./')

test('sends http request to server', function (t) {
  var server = http.createServer(function (req, res) {
    if (req.method === 'POST' && req.url === '/hello') {
      t.same(req.headers['x-command'], 'world')
      res.end('okay')
    }
  })
  getport(function (err, port) {
    t.ifError(err)
    server.listen(port, function () {
      var stream = transport('world', 'http://localhost:' + port + '/hello')
      stream.on('data', function (data) {
        t.same(data.toString(), 'okay')
      })
      stream.on('close', function () {
        server.close()
        t.end()
      })
    })
  })
})
