const fs = require('fs');
const chalk = require('chalk');

function loadJson(filePath) {

    return new Promise(function (resolve, reject) {

        fs.readFile(filePath, function (error, data) {
            var jsonAsObject;

            if (error) {
                reject(error);
            }

            try {
                jsonAsObject = JSON.parse(data);
            } catch (parseError) {
                reject(parseError);
            }

            resolve(jsonAsObject);
        });
    });
}

function prepareRules(rules) {

    // convert ids to object keys for easier access
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

    var currentRule = rules[Object.keys(rules)[0]]; // pick first rule

    var execute = prepareExecute(rules, object);

    if (!execute(currentRule)) {
        // go to end
        console.log('end');
    }

}

function prepareExecute(rules, data) {

    var execute = function (rule) {
        if (typeof rule !== 'object') {
            return false;
        }

        if (rule.wasExecuted) {
            throw new Error('loop in the engine');
        }

        // mark as executed to avoid loops
        rule.wasExecuted = true;

        if (rule.ruleBody(data)) {

            console.log(chalk.green(`rule ${rule.id} exited with true`));
            // if result true
            execute(rules[rule.trueId]);
        } else {

            console.log(chalk.red(`rule ${rule.id} exited with false`));
            // if result false
            execute(rules[rule.falseId]);
        }
    };

    return execute;
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
        .catch(function (error) {
            console.log(error);
        });
}

main();

module.exports = {
    main: main
};
