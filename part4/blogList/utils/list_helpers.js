const totalLikes = (blogs) => {
  if (blogs === undefined || blogs.length === 0 ) {
    return 0
  }
  const sumLikes = (accumulator, currentValue) => accumulator + currentValue.likes
  return blogs.reduce(sumLikes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs === undefined || blogs.length === 0 ) {
    return 0
  }
  const mostLikes = (accumulator, currentValue) => {
    if (accumulator.likes > currentValue.likes) {
      return accumulator
    } else {
      return currentValue
    }
  }
  return blogs.reduce(mostLikes, {})
}


//TO BE REFACTORED
const blogsCount = (blogs) => {
  const authors = blogs.map(blog => {
    return {
      author: blog.author,
      blogs: 1
    }
  })
}

module.exports = {
  totalLikes,
  favoriteBlog,
  blogsCount
}