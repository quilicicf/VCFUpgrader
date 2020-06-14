import decodeQuotedPrintable from './decodeQuotedPrintable.mjs';

export default (line) => {
  const prefPart = line.includes('PREF') ? ';PREF=1' : '';
  const email = line.split(':')[ 1 ];
  const emailPart = line.includes('QUOTED-PRINTABLE') ? decodeQuotedPrintable(email) : email;
  return `EMAIL${prefPart}:${emailPart}`;
};
