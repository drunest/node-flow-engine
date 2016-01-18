'use strict';

const fs = require('fs');

function loadJson(filePath) {

    return new Promise((resolve, reject) => {

        fs.readFile(filePath, (error, data) => {
            let jsonAsObject;

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

module.exports = {
    loadJson: loadJson
};
