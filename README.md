# VCFUpgrader

A tool to upgrade VCards from v2.1 to v4

## What is this?

A tool I created to migrate the VCard export from my old phone so it was importable in the new.

I couldn't find a satisfying open-source solution to do that unfortunately.

## Disclaimer

This is a tool I wrote in a dash and it does not support the whole specification (far from it). If your VCard file only contains fields in the following list you should be pretty safe:

* N
* FN
* ADR
* TEL
* ORG
* EMAIL
* PHOTO

Otherwise, I can't guarantee anything will work.

## How to use it?

```shell
git clone https://github.com/quilicicf/VCFUpgrade.git
cd VCFUpgrade
npm ci
node ./index.js /path/to/inputFile.vcf # It MUST end with .vcf
```

The program will print the list of processed contacts to stdout and write the migrated file in the temporary folder on your machine.

It'll print the name of the generated file to stdout too.

Example of output:

```
node index.js /home/toto/Downloads/Contacts.vcf
FN:Ma friend
FN:Ma other friend
Writing output to /tmp/Contacts-v4.vcf
```
