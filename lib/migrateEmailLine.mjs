export default (line) => {
  const prefPart = line.includes('PREF') ? ';PREF=1' : '';
  const email = line.split(':')[ 1 ];
  return `EMAIL${prefPart}:${email}`;
};
