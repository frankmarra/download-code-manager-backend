const { Code } = require('../models')

// const CreateCode = async (req, res) => {
//   try {
//     let albumId = parseInt(req.params.album_id)
//     let newCode = {
//       albumId,
//       used: false,
//       ...req.body
//     }
//     let code = await Code.create(newCode)
//     res.send(code)
//   } catch (error) {
//     throw error
//   }
// }

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
