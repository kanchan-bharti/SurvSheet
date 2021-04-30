const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
var data = fs.readFileSync('./public/surveys.json');
var surveys = JSON.parse(data);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/files/`)
  }, filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var downloadPath = "";

const upload = multer({ storage: storage })

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}
));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));


app.get("/upload", (req, res) => {
  try {
    res.status(200).json({
      data: surveys
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

app.get("/upload/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let survey = surveys.find(survey => survey.id === id);
    res.status(200).json({
      data: survey
    });
  } catch (err) {
    res.status(400).json({
      message: "Some error occured",
      err
    });
  }
});

app.post('/upload', upload.any(), (req, res, next) => {
  console.log(req.files[0], req.body.comment, req.body.uid);
  let id = req.body.uid;

  let survey = {
    id: id,
    comment: req.body.comment,
    filepath: req.files[0].path,
    filename: req.files[0].originalname,
    sheetname: req.body.sheetName,
    col: req.body.col,
    row: req.body.row
  }

  surveys.push(survey)
  var data = JSON.stringify(surveys, null, 2);
  fs.writeFile('./public/surveys.json', data, finished);
  function finished(err) {
    console.log('all set.');
  }
  res.end();
});

// app.post('/download', (req, res) => {
//   downloadPath = req.body.downloadPath;
//   console.log(path)
// });

app.get("/download", function (req,res){
  console.log(path.join(__dirname,'public', 'files', req.query.file));
  res.sendFile(path.join(__dirname,'public', 'files', req.query.file));
});

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('8000');
});

module.exports = app;