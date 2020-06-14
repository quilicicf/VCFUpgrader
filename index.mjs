#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';

import migrateTelLine from './lib/migrateTelLine.mjs';
import migrateEmailLine from './lib/migrateEmailLine.mjs';
import migratePhotoLine from './lib/migratePhotoLine.mjs';

const [ inputFilePath, outputFilePart ] = process.argv.slice(2);

const fileContent = readFileSync(inputFilePath, 'utf8');

const newFileContent = fileContent.split('\n')
  .map(line => {
    if (!line) { return line; }
    if (line.startsWith('BEGIN:VCARD') || line.startsWith('END:VCARD')) { return line; }
    if (line.startsWith('VERSION:2.1')) { return 'VERSION:4.0'; }
    if (line.startsWith('N:')) { return line; }
    if (line.startsWith('FN:')) { return line; }
    if (line.startsWith('EMAIL')) { return migrateEmailLine(line); }
    if (line.startsWith('TEL')) { return migrateTelLine(line); }
    if (line.startsWith('PHOTO')) { return migratePhotoLine(line); }
    return line;
  })
  .join('\n');

writeFileSync(outputFilePart, newFileContent, 'utf8');
