var express = require('express');
var config = require('./config');
var app = express();


app.set('port', (process.env.PORT || config.server.port));

config.server.staticFolders.forEach(function (staticPath) {
    app.use(express.static(staticPath));
});

app.set('views', config.views.path);
app.set('view engine', config.views.engine);

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
