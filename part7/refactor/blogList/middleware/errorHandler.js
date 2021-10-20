const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  }
  else if (err.name === 'JsonWebTokenError') {
    res.status(401).json({ error: err.message })
  }
  else if (err) {
    console.log('error is: ', err)
    res.status(400).send({ error: 'Something went wrong'})
  }
  next()
}

module.exports = errorHandler