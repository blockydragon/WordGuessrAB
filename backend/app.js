const express = require('express');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/static')));

app.use('/user',userRoutes);
app.use('/game',gameRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
