const config = require('./config');
const fs = require('fs');
const sql = require('mssql');
const myQuery = `select acc_navid+'.'+acc_lastname name, pic_base64 image from v_accounts A JOIN t_accounts_picture P on acc_UIC=accountId where acc_firstname='Sue'`;

const start = async () => {
  try {
    const pool = await sql.connect(config);
    const result = await sql.query`select acc_navid+'.'+acc_lastname name, pic_base64 image from v_accounts A JOIN t_accounts_picture P on acc_UIC=accountId `;
    const { recordset } = result;
    recordset.map(({ name, image }) => {
      let iname = 'c:\\Temp\\' + name;
      let base64Image = image.split(';base64,').pop();
      fs.writeFile(`${iname}.png`, base64Image, { encoding: 'base64' }, function(err) {
        console.log('File created');
        console.log(`${iname}.png`);
      });
    });
    return;
  } catch (err) {
    console.error(err);
  }
};

start();
