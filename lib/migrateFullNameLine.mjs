import decodeQuotedPrintable from './decodeQuotedPrintable.mjs';

export default (line) => {
  const fullName = line.split(':')[ 1 ];
  const fullNamePart = line.includes('QUOTED-PRINTABLE') ? decodeQuotedPrintable(fullName) : fullName;
  return `FN:${fullNamePart}`;
};
