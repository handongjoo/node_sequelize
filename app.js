const express = require('express');
const app = express();
const helmet = require('helmet');
const mainRouter = require('./router/mainRouter');
const path = require('path');
// const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('views', './views');
app.use('/public', express.static(__dirname + '/public'));

app.use(helmet());
// router 미들웨어
app.use('/', mainRouter);
// body 데이터를 꺼내기 위해 필요한 미들웨어
app.use(express.json());
app.use(express.urlencoded());


app.listen(3000, (req, res) => {
    console.log("3000 포트로 연결");
})