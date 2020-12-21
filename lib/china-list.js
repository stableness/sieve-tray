const { isIP } = require('net');
const { resolve } = require('path');
const { readFileSync } = require('fs');

const { getDomain } = require('tldts');

const { BloomFilter } = require('@stableness/bloomxx');

const Reader = require('mmdb-lib').default;

/**
 * @typedef { import('mmdb-lib').CountryResponse } CountryResponse
 */





const filter = new BloomFilter(
    readFileSync(resolve(__dirname, '../dump/china-list.bin')),
);

const reader = new Reader(
    readFileSync(resolve(__dirname, '../dump/china-ip.mmdb')),
);





/**
 * @param {string} domain - domain to check
 * @return {boolean} result
 */
module.exports.has = function (domain) {

    if (Boolean(domain) === false) {
        return false;
    }

    if (filter.has(getDomain(domain) || domain)) {
        return true;
    }

    if (isIP(domain) === 0) {
        return false;
    }

    /**
     * @type { CountryResponse | null }
     */
    const response = reader.get(domain);

    if (response != null) {
        if (response.country != null) {
            if (response.country.iso_code === 'CN') {
                return true;
            }
        }
    }

    return false;

};

