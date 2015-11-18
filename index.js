var http = require('http')
var duplexify = require('duplexify')
var https = require('https')
var url = require('url')

module.exports = function (cmd, transport) {
  var u = url.parse(transport)
  var protocolName = u.protocol.slice(0, -1)
  if (protocolName === 'http') return request(http, cmd, u)
  if (protocolName === 'https') return request(https, cmd, u)
  throw new Error('Unsupported protocol.')
}

function request (mod, cmd, u) {
  var stream = duplexify()
  var headers = {}

  if (cmd) headers['X-Command'] = cmd
  if (u.auth) headers.Authorization = 'Basic ' + new Buffer(u.auth).toString('base64')

  var req = mod.request({
    method: 'POST',
    path: u.path,
    port: u.port,
    host: u.hostname,
    headers: headers
  })

  if (!req._header && req._implicitHeader) req._implicitHeader()
  if (req._send) req._send(new Buffer(0))
  stream.setWritable(req)

  req.on('socket', function (socket) {
    // http://neophob.com/2013/09/rpc-calls-and-mysterious-40ms-delay/
    socket.setNoDelay()
  })

  req.on('response', function (res) {
    if (!/2\d\d/.test(res.statusCode)) return stream.destroy(error(res))
    stream.setReadable(res)
  })

  return stream
}

var error = function (res) {
  var err = new Error('Request failed with status ' + res.statusCode)
  err.status = res.statusCode
  err.headers = res.headers
  return err
}
