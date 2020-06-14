const SUPPORTED_TYPES = [
  'text',
  'voice',
  'fax',
  'cell',
  'video',
  'pager',
  'textphone',
];

const getTypesPart = (line) => {
  const types = SUPPORTED_TYPES.filter(type => new RegExp(`${type}[:;]`, 'i').test(line));
  return types.length > 1 ? `;TYPE="${types.join(',')}"` : '';
};

export default (line) => {
  const number = line.split(':')[ 1 ];
  const typesPart = getTypesPart(line);
  const prefPart = line.toUpperCase().includes('PREF') ? ';PREF=1' : '';
  return `TEL;VALUE=uri${prefPart}${typesPart}:${number}`;
};
