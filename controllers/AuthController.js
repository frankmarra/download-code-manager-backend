const { Label } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const label = await Label.findOne({
      where: { labelEmail: req.body.labelEmail },
      raw: true
    })
    if (
      label &&
      (await middleware.comparePassword(
        label.passwordDigest,
        req.body.labelPassword
      ))
    ) {
      let payload = {
        id: label.id,
        labelEmail: label.labelEmail,
        labelName: label.labelName
      }
      let token = middleware.createToken(payload)
      return res.send({ label: payload, token })
    }
    res.status(401).send({ status: 'ERROR', msg: 'Unauthorized' })
  } catch (error) {
    throw error
  }
}

const Register = async (req, res) => {
  try {
    const { labelEmail, labelPassword, labelName } = req.body
    let passwordDigest = await middleware.hashPassword(labelPassword)
    const label = await Label.create({
      labelEmail,
      passwordDigest,
      labelName
    })
    res.send(label)
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
  CheckSession
}
