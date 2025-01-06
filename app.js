require('dotenv').config();
const express = require('express');
const cors = require('cors');  
const app = express();
const path = require('path');
const getRouter = require('./routes/getRoutes');
const postRouter = require('./routes/postRoutes');
const passport = require('./passportConfig');

app.use(cors({
    origin: 'http://localhost:5000',  
    credentials: true, 
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(getRouter); 
app.use(postRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
