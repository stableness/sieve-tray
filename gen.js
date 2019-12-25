const { createReadStream } = require('fs');
const { createInterface } = require('readline');

const { BloomFilter } = require('bloom-filters');





const [ lines, file ] = process.argv.slice(2);



const filter = BloomFilter.create(parseInt(lines));



const table = createInterface({
    input: createReadStream(file),
});

table

    .on('line', domain => filter.add(domain))

    .once('close', () => {

        const _errorRate = filter._nbHashes;
        const _capacity = filter.size;

        const dump = filter.saveAsJSON();

        // https://github.com/Callidon/bloom-filters/issues/11
        Object.assign(dump, { _capacity, _errorRate });

        process.stdout.write(JSON.stringify(dump), 'utf8');

    })

;

