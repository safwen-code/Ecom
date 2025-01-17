const bcrypt = require('bcrypt')

const saltRounds = 10

const hashpassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(password, salt)

  return hash && hash
}

const camparePassword = (pass, hash) => {
  return bcrypt.compare(pass, hash)
}

module.exports = { hashpassword, camparePassword }
