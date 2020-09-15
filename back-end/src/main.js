require('dotenv').config();
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import mongoose from 'mongoose'

import api from './api'
import jwtMiddleware from './lib/jwtMiddleware'

const app = new Koa();
const router = new Router();

//비구조화 할당 process.env 내부의 값에 대한 래퍼런스
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => {
    console.log('Connect to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });


//라우터 설정
router.use('/api', api.routes());

//라우터 적용 전에 bodyParser적용
app.use(bodyParser());
app.use(jwtMiddleware)

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const port = PORT || 4000;
console.log(port)

app.listen(port, () => {
  console.log(`Listening port ${port}`);
});
