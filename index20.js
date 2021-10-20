const express = require('express')
const config = require('./common/config/env.config.js');
const app = express();

const https = require('https');
const fs = require('fs');


const options = {
  key: fs.readFileSync('/var/www/httpd-cert/token.dog_2021-09-17-22-23_04.key'),
  cert: fs.readFileSync('/var/www/httpd-cert/token.dog_2021-09-17-22-23_04.cert')
};

const DogsRouter = require('./dogs/routes.config');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Hello Crypto Dog!')
});

DogsRouter.routesConfig(app);

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('Hello Crypto Dog!');
}).listen(config.port);