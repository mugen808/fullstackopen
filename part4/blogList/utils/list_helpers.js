const _ = require('lodash')

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


const blogsCount = (blogs) => {
  const authors = blogs.map(blog => {
    const entry = {
      author: blog.author,
      blogs: 1
    }
    return entry
  })

  const authorList = authors.reduce((sum, current) => {
    if (sum[current.author]) {
      sum[current.author].blogs += 1
    } else {
      sum[current.author] = {
        author: current.author,
        blogs: 1
      }
    }
    return sum
  }, {})
  const mostLikes = _.values(authorList).reduce((sum, curr) => {
    if (sum.blogs > curr.blogs) {
          return sum
        } else {
          sum = curr
          return sum
        }
      }, {})
  return mostLikes
}


const authorLikes = blogs => {
  const authors = blogs.map(blog => {
    const entry = {
      author: blog.author,
      likes: blog.likes
    }
    return entry
  })

  const authorList = authors.reduce((sum, current) => {
    if (sum[current.author]) {
      sum[current.author].likes += current.likes
    } else {
      sum[current.author] = {
        author: current.author,
        likes: current.likes
      }
    }
    return sum
  }, {})
  const higherLikes = _.values(authorList).reduce((sum, curr) => {
    if (sum.likes > curr.likes) {
          return sum
        } else {
          sum = curr
          return sum
        }
      }, {})
  
  console.log('mostlikes: ', higherLikes)
  return higherLikes
}
module.exports = {
  totalLikes,
  favoriteBlog,
  blogsCount,
  authorLikes
}