/**
 *
 * @author Russell Dempsey <SgtPooki@gmail.com>
 */

 var Promise = require('promise');
 var request = require('request');
 var _ = require('lodash');

 require('shelljs/global');

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
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/371361&output=today'),
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/367081&output=today'),
        promiseHttpGet('http://data.nbcnews.com/drone/getbyid?id=newscms/entry/364286&output=today')
    ];
    var processApiResults = function () {
        Promise.all(promises)
            .then(function (results) {
                var photos = _(results)
                    .map(JSON.parse)
                    .pluck('results')
                    .flatten()
                    .map(function (item) {
                        return {
                            title: item.cover_Headline,
                            description: item.summary,
                            photos: _.get(item, 'gallery.photos')
                        };
                    })
                    .value();

                response.render('pages/index', {photos: photos});
            })
            .catch(function (error) {
                console.log('found error...');
                console.log(error);
            });
    };

    // if (process.env.NODE_ENV === 'development') {
        exec('gulp build', {async: true}, processApiResults);
    // } else {
        // processApiResults();
    // }

};
