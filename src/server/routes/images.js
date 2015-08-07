/**
 *
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

 var Promise = require('promise');
 var request = require('request');
 var _ = require('lodash');

 var promiseHttpGet = function promiseHttpGet(url) {
     return new Promise(function (resolve, reject) {
         request(
             url,
             function (error, response, body) {
                 if (error || response.statusCode !== 200) {
                     return reject(error);
                 }
                 resolve(body);
             }
         );
     });
 };

module.exports = function (request, response) {
    var promises = [
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/364286&output=today'),
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/367081&output=today'),
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/364286&output=today')
    ];

    Promise.all(promises)
        .then(function (results) {
            var photos = _(results)
                .map(JSON.parse)
                .pluck('results')
                .flatten()
                .pluck('gallery')
                .pluck('photos')
                // .flatten()
                .value();

            response.render('pages/index', {photos: photos});
        })
        .catch(function (error) {
            console.log('found error...');
            console.log(error);
        });
};
