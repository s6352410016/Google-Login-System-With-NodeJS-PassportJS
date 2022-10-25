const express = require('express');
const router = require('./routes/router');
const session = require('express-session');
const app = express();

app.set('view engine' , 'ejs');
app.use(session({secret: 'bell'}));
app.use(router);

app.listen(5000 , () => {
    console.log('Starting server...');
});