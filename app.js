const express = require('express')
const app = express();
const api = require('./backend/api');

app
    .use(express.static(__dirname + '/frontend'))
    .use ("/api", api)
    .listen(process.env.PORT || 3000, () => console.log('Example app listening on port 3000!'))
