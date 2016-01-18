'use strict';

const chalk = require('chalk');

function prepareRules(rules) {

    // convert ids to object keys for easier access
    return rules.reduce((obj, item) => {
        // create function out of ruleBody
        item.ruleBody = new Function(item.ruleBody);

        obj[item.id] = item;

        return obj;
    }, {});
}

function prepareExecute(rules, data) {

    const execute = (rule) => {
        if (typeof rule !== 'object') {
            return false;
        }

        if (rule.wasExecuted) {
            throw new Error('loop in the engine');
        }

        // mark as executed to avoid loops
        rule.wasExecuted = true;

        if (rule.ruleBody(data)) {
            // if result true
            console.log(chalk.green(`rule ${rule.id} exited with true`));

            execute(rules[rule.trueId]);
        } else {
            // if result false
            console.log(chalk.red(`rule ${rule.id} exited with false`));

            execute(rules[rule.falseId]);
        }
    };

    return execute;
}

function run(objects) {

    const rules = objects[0];
    const object = objects[1];

    const firstRule = rules[Object.keys(rules)[0]]; // pick first rule
    const execute = prepareExecute(rules, object);

    // if return false, then end
    if (!execute(firstRule)) {
        console.log('end');
    }
}

module.exports = {
    prepareRules: prepareRules,
    run: run
};
