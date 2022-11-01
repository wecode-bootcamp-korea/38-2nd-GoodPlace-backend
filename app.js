require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');
const { globalErrorHandler } = require('./utils/error');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);
app.use(globalErrorHandler);

app.get('/ping', ( req, res ) => {
  res.json({ message : 'pong'})
})

const PORT = process.env.PORT;

const startServer = async () => {
  try{
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`))
  }
  catch (err){
    console.log(err);
  }
}

startServer();
