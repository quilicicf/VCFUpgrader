#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

import migrateTelLine from './lib/migrateTelLine.mjs';
import migrateNameLine from './lib/migrateNameLine.mjs';
import migrateEmailLine from './lib/migrateEmailLine.mjs';
import migratePhotoLine from './lib/migratePhotoLine.mjs';
import migrateAddressLine from './lib/migrateAddressLine.mjs';
import migrateFullNameLine from './lib/migrateFullNameLine.mjs';
import decodeQuotedPrintable from './lib/decodeQuotedPrintable.mjs';

const [ inputFilePath, outputFilePart ] = process.argv.slice(2);

const fileContent = readFileSync(inputFilePath, 'utf8');

const { lines, contactNames } = fileContent.split('\n')
  .reduce(
    (seed, line) => {
      if (!line) {
        seed.lines.push(line);
      } else if (line.startsWith('BEGIN:VCARD') || line.startsWith('END:VCARD')) {
        seed.isInTextNode = false;
        seed.lines.push(line);
      } else if (line.startsWith('VERSION:2.1')) {
        seed.isInTextNode = false;
        seed.lines.push('VERSION:4.0');
      } else if (/^N[:;]/.test(line)) {
        seed.isInTextNode = true;
        seed.lines.push(migrateNameLine(line));
      } else if (/^FN[:;]/.test(line)) {
        seed.isInTextNode = true;
        const fullName = migrateFullNameLine(line);
        seed.contactNames.push(fullName);
        seed.lines.push(fullName);
      } else if (/^TEL[:;]/.test(line)) {
        seed.isInTextNode = true;
        seed.lines.push(migrateTelLine(line));
      } else if (/^ADR[:;]/.test(line)) {
        seed.isInTextNode = true;
        seed.lines.push(migrateAddressLine(line));
      } else if (/^EMAIL[:;]/.test(line)) {
        seed.isInTextNode = true;
        seed.lines.push(migrateEmailLine(line));
      } else if (/^PHOTO[:;]/.test(line)) {
        seed.isInTextNode = false;
        seed.lines.push(migratePhotoLine(line));
      } else {
        seed.lines.push(seed.isInTextNode ? decodeQuotedPrintable(line) : line);
      }

      return seed;
    },
    { lines: [], contactNames: [], isInTextNode: false },
  );

contactNames.sort();
process.stdout.write(`${contactNames.join('\n')}\n`);

const newFileContent = lines.join('\n');

writeFileSync(outputFilePart, newFileContent, 'utf8');
