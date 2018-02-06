const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  console.log('daar');
  res.send('Hallo');
});
/* updated */
app.post('/upload', (req, res) => {
  const base64String = req.body.image;

  console.log(base64String.split('').length);
  const name = 'c:\\Temp\\' + req.body.name;
  let base64Image = base64String.split(';base64,').pop();
  fs.writeFile(`${name}.png`, base64Image, { encoding: 'base64' }, function(err) {
    console.log('File created');
    console.log(`${name}.png`);
  });
  res.send('ok');
});

app.listen(3333, () => console.log('Listening on port 3333'));
