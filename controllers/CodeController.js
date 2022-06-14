const { Code } = require('../models')

const UpdateCode = async (req, res) => {
  try {
    let codeId = parseInt(req.params.code_id)
    let updatedCode = await Code.update(req.body, {
      where: { id: codeId },
      returning: true
    })
    res.send(updatedCode)
  } catch (error) {
    throw error
  }
}

module.exports = {
  UpdateCode
}
