var fs = require('fs');

function loadJson(filePath) {

    return new Promise(function (resolve, reject) {

        fs.readFile(filePath, function (error, data) {
            var jsonAsObject;

            if (error) {
                reject(error);
            }

            try {
                jsonAsObject = JSON.parse(data)
            } catch(error) {
                reject(error);
            }

            resolve(jsonAsObject);
        });
    });
}

function prepareRules(rules) {

    return rules.reduce(function (obj, item) {
        // create function out of ruleBody
        item.ruleBody = new Function(item.ruleBody);

        obj[item.id] = item;

        return obj;
    }, {});
}

function runEngine(objects) {
    var rules = objects[0];
    var object = objects[1];

    console.log(objects)
}

function returnResult() {

}

function main() {

    var args = process.argv.slice(2);
    var rulesFile = args[0];
    var objectFile = args[1];

    return Promise.all([
        loadJson(rulesFile).then(prepareRules),
        loadJson(objectFile)
    ])
        .then(runEngine)
        .then(returnResult)
        .catch(function (error) {
            console.log(error);
        });;
}

main();