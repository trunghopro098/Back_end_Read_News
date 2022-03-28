const express = require('express')
const app = express()
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});
const port = 5000;


var cors = require('cors')
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use('/images', express.static('./images'));
app.use('/user',require('./Route/user.route'));
app.use('/reward',require('./Route/reward.route'));
app.use('/new',require('./Route/new.route'))
app.use('/mission',require('./Route/mission.route'));
app.listen(port,()=>console.log(`App listening at http://localhost:${port}`))