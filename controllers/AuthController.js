const { Label } = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
  try {
    const label = await Label.findOne({
      where: { email: req.body.email },
      raw: true
    })
    if (
      label &&
      (await middleware.comparePassword(
        label.passwordDigest,
        req.body.password
      ))
    ) {
      let payload = {
        id: label.id,
        email: label.email,
        name: label.name,
        slug: label.slug
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
    let { email, password, name } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    email = email.toLowerCase()
    let slug = name.toLowerCase()
    slug = slug
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    const label = await Label.create({
      email,
      passwordDigest,
      name,
      slug
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
