/**
 * @author Russell Dempsey <SgtPooki@gmail.com>
 *
 * configuration options for the server
 */

var config = module.exports = {};
var projectRoot = __dirname + '/../..';
var clientRoot = __dirname + '/../client';

config.views = {};
config.views.path = clientRoot + '/views';
config.views.engine = 'ejs';

config.server = {};
config.server.port = 5000;
config.server.staticFolders = [
    projectRoot + '/public'
];
