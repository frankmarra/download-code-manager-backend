const { User } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      user &&
      (await middleware.comparePassword(user.passwordDigest, req.body.password))
    ) {
      let payload = {
        id: user.id,
        email: user.email,
        name: user.firstName,
        labelId: user.labelId,

        artistId: user.artistId,
        isActive: user.isActive,
        isAdmin: user.isAdmin
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload })
    }
    res.status(401).send({ status: 'ERROR', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    let { email, password, labelId, firstName, lastName } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    email = email.toLowerCase()
    const user = await User.create({
      email,
      passwordDigest,
      labelId,
      firstName,
      lastName
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, userId } = req.body
    const user = await User.findOne({ where: { id: userId } })
    if (
      user &&
      (await middleware.comparePassword(
        user.dataValues.passwordDigest,
        oldPassword
      ))
    ) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      return res.send({ status: 'Ok', payload: user })
    }
    res.status(401).send({ status: 'ERROR', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Login,
  Register,
  UpdatePassword,
  CheckSession
}
