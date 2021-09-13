const jwt = require('jsonwebtoken')

const userExtractor = async (request, response, next) => {
  let token = ''
  const authorization = await request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid'})
  }

  request.id = decodedToken.id
  next()
}


module.exports = {userExtractor}