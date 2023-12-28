var apiRoutes = require('./routes');
var express = require('express');

var app = express();
var port = 8080;

app.use(express.json());
apiRoutes(app);

app.listen(port, () => {
    console.log(`--------------------------------------------------------`)
    console.log(`Example server listening at http://localhost:${port}/api`)
    console.log(`--------------------------------------------------------`)
})