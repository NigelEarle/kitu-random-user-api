const express = require('express');
const app = express();
const userDataRoutes = require('./routes/userDataRoutes');
const PORT = 3000;

app.use('/users', userDataRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})