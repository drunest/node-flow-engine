var expect = require('expect');
var loader = require('../app/loader');

describe('loader', function () {
    it('should load and parse json', function (done) {

        loader.loadJson('specs/fixtures/test.json')
            .then((parsedJson) => {
                expect(parsedJson).toEqual({
                    test: 'test'
                });
                done();
            });
    });

    it('should fail on file which is not json', function (done) {

        loader.loadJson('specs/fixtures/not-json.json')
            .catch((error) => {
                expect(error).toExist();
                done();
            });
    });

    it('should fail if wrong file provided', function (done) {

        loader.loadJson('specs/fixtures/not-exist.json')
            .catch((error) => {
                expect(error).toExist();
                done();
            });
    });
});
