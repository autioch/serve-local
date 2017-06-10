# Serve local

Minimalistic local server for static content. Creates an instance of [Node HTTP Server](https://nodejs.org/api/http.html#http_class_http_server).

## Install

` npm i -D serve-local `

## Setup

Server factory requires 2 parameters - documentRoot and port.


```javascript
/* Requiring the package. */
const serveLocal = require('serve-local');

/* Arguments */
const documentRoot = 'C:';
const port = '8080';

/* Creating instance. */
const server = serveLocal(documentRoot, port);
```

```javascript
require('serve-local')('C:', 8080);
```

## Usage
Server is an instance of [Node HTTP Server](https://nodejs.org/api/http.html#http_class_http_server).
It exposes all the events, properties and methods.

```javascript
/* Close the server. */
server.close(() => console.log('closed'));

/* Checking server status. */
console.log(`Is server listening: ${server.listening}`);
```
