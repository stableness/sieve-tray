#!/bin/sh

set -eu



gen_china_list()
{

    OUTPUT=output.txt
    BASE=https://cdn.jsdelivr.net/gh/felixonmars/dnsmasq-china-list

    echo '' > $OUTPUT
    curl -sSL $BASE/apple.china.conf >> $OUTPUT
    curl -sSL $BASE/google.china.conf >> $OUTPUT
    curl -sSL $BASE/accelerated-domains.china.conf >> $OUTPUT

    mkdir -p json
    awk -F '/' 'NF {print $2}' $OUTPUT | sort -b -f | uniq -i | node gen.js > json/china-list.json

}



cd $1 && shift && "$@"

