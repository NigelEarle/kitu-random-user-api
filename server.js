const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userDataRoutes = require('./routes/userDataRoutes');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', userDataRoutes);

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🌎`);
})