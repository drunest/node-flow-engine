'use strict';

const loader = require('./loader');
const flowEngine = require('./flow-engine');

const run = () => {

    const args = process.argv.slice(2);
    const rulesFile = args[0];
    const objectFile = args[1];

    return Promise.all([
        loader.loadJson(rulesFile)
            .then(flowEngine.prepareRules),
        loader.loadJson(objectFile)
    ])
        .then(flowEngine.run)
        // .then(renderer.renderResult)
        .catch((error) => {
            console.log(error);
        });
};

module.exports = {
    run: run
};
