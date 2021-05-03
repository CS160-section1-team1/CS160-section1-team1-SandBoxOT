// Dependencies
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));


//Routes
app.use('/user', require('./routes/userRoutes'));   // Keven Lam
app.use('/event', require('./routes/eventRoutes')); // Keven Lam
app.use('/serviceProvider', require('./routes/serviceProviderRoutes')); // Keven Lam
app.use('/image', require('./routes/imageRoutes')); // Keven Lam

app.get('/', (request, response) => {
  response.send('Secure server');
});

const port = 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`));
