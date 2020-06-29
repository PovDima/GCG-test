import fs from 'fs';

const saveModule = (res) => {
  const data = JSON.stringify(res, null, 2);
  fs.writeFile('./res.json', data, (e) => {
    console.log(e || 'File successfully loaded.');
  });

  return res;
};

export default saveModule;
