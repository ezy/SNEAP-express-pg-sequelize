const app = require('./config/server');
const config = require('./config/environment');

// Start listening
app.listen(config.port, () => {
  console.log(`Server started | ENV=${process.env.NODE_ENV} | http://localhost:${config.port}`);
});
