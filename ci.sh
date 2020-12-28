#!/bin/sh

set -eu



gen_china_list()
{

    OUTPUT=output.txt
    DUMP=dump
    BASE=https://cdn.jsdelivr.net/gh/felixonmars/dnsmasq-china-list

    echo '' > $OUTPUT
    curl -sSL $BASE/apple.china.conf >> $OUTPUT
    # curl -sSL $BASE/google.china.conf >> $OUTPUT
    curl -sSL $BASE/accelerated-domains.china.conf >> $OUTPUT

    mkdir -p $DUMP
    awk -F '/' 'NF {print $2}' $OUTPUT | DOMAIN=1 node gen.js > $DUMP/china-list.bin

    curl -sSL https://cdn.jsdelivr.net/gh/Hackl0us/GeoIP2-CN@release/Country.mmdb > $DUMP/china-ip.mmdb

}



gen_block_list()
{

    OUTPUT=output.txt
    DUMP=dump
    URL=https://cdn.jsdelivr.net/gh/StevenBlack/hosts@3.2.13/hosts

    echo '' > $OUTPUT
    curl -sSL $URL | grep "^0.0.0.0" | awk 'NF {print $2}' | grep -v "^0.0.0.0" >> $OUTPUT

    mkdir -p $DUMP
    cat $OUTPUT | node gen.js > $DUMP/block-list.bin

}



cd $1 && shift && "$@"

