# http-transport-stream

Executes a command using duplex http or https.

```
npm install http-transport-stream
```

#### `http-transport-stream(cmd, url)`

`cmd`: the data to send to the URL

`url`: where to send the POST request

## Example

```js
var http = require('http-transport-stream')
var stream = http('dat serve', 'https://dat.myserver.edu/mydat')
stream.on('data', console.log)
```

## How it works

`http-transport-stream` sends a POST request to the URL you provide. The POST request has an HTTP header, 'X-Command', containing the content of the cmd.
