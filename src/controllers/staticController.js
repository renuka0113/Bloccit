module.exports = {
  index(req, res, next){   //index is a function that will contain the route handler for the / route in src/routes/static.js
    res.send("Welcome to Bloccit");
  }
}
