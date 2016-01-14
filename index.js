var fs = require('fs');

function loadFiles(rulesFile, objectFile) {
    return Promise.all([
        loadJson(rulesFile),
        loadJson(objectFile)
    ]);
}

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

function validate(jsons) {
    var rules = jsons[0];
    var object = jsons[1];

    console.log(rules[0]);

    var rulesWithKey = rules.reduce(function (obj, item) {
        // transform ruleBody to real function
        item.ruleBody = new Function(item.ruleBody);

        obj[item.id] = item;

        return obj;
    }, {})

    console.log(rulesWithKey[1].ruleBody(object))

    console.log(rulesWithKey);
}

function runEngine() {

}

function returnResult() {

}

function main() {

    var args = process.argv.slice(2);
    var rulesFile = args[0];
    var objectFile = args[1];

    loadFiles(rulesFile, objectFile)
        .then(validate)
        .then(runEngine)
        .then(returnResult)
        .catch(function (error) {
            console.log(error);
        });
}

main();