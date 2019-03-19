module.exports = {
    checkEmptyField: (req, res, next) => {
    for (let prop in req.body) {
      if (req.body[prop].length <= 0) {
        return res.status(400).send({message: `Please fill in value for ${prop} input.`})
      }
    }
    next();
  },

  checkValidEmail: (req, res, next) => {
    for (let prop in req.body) {
      if (prop === 'email' && !req.body[prop].includes('@')) {
        return res.send({ message: `Please input valid email.`})
      }
    }
    next();
  },

  checkValidCellNum: (req, res, next) => {
    let removeSymbols;
    for (let prop in req.body) {
      if (prop === 'cell') {
        removeSymbols = req.body[prop].replace(/\D/g, '');
        if (removeSymbols.length !== 10) {
          return res.send({ message: `Please input valid cell phone number.`})
        };
      }
    }
    next();
  }
}