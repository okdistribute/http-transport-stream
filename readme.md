# http-transport-stream

Executes a command using duplex http or https.

[![build status](http://img.shields.io/travis/karissa/http-transport-stream.svg?style=flat)](http://travis-ci.org/karissa/http-transport-stream)

```
npm install http-transport-stream
```

#### `http-transport-stream(url)`

`url`: where to send the POST request

## Example

```js
var http = require('http-transport-stream')
var stream = http('https://dat.myserver.edu/mydat')
stream.on('data', console.log)
```

## How it works

`http-transport-stream` sends a POST request to the URL you provide.
