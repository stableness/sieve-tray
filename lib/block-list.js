const { resolve } = require('path');
const { readFileSync } = require('fs');

const { BloomFilter } = require('bloomxx-fork');

const dump = readFileSync(resolve(__dirname, '../dump/block-list.bin'));




const filter = new BloomFilter(dump);



/**
 * @param {string} domain - domain to check
 * @return {boolean} result
 */
module.exports.has = function (domain) {
    return Boolean(domain) ? filter.has(domain) : false;
};

