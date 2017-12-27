const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('daar');
  res.send('Hallo');
});
/* updated */
app.post('/', (req, res) => {
  const base64String = req.body.image;
  const name = req.body.name;
  let base64Image = base64String.split(';base64,').pop();
  fs.writeFile(`${name}.png`, base64Image, { encoding: 'base64' }, function(err) {
    console.log('File created');
  });
  res.send('ok');
});

app.listen(3333, () => console.log('Listening on port 3333'));
