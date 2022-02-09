const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

const authRoutes = require('./routes/auth.js');

require('dotenv').config({path:'./config.env'});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.send('WElcome');
});

app.use('/auth', authRoutes);

app.listen(PORT, (req, res) => {
    console.log('Server running on port 80');
})