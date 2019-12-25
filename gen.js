const { createInterface } = require('readline');

const { getDomain } = require('tldts');

const { BloomFilter } = require('bloom-filters');





const store = new Set();

const table = createInterface({
    input: process.stdin,
    terminal: false,
});

table

    .on('line', line => {
        store.add(getDomain(line || '') || line);
    })

    .once('close', () => {

        const filter = BloomFilter.from(Array.from(store), 0.01);

        const _errorRate = filter._nbHashes;
        const _capacity = filter.size;

        const dump = filter.saveAsJSON();

        // https://github.com/Callidon/bloom-filters/issues/11
        Object.assign(dump, { _capacity, _errorRate });

        process.stdout.write(JSON.stringify(dump), 'utf8');

    })

;

