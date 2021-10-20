Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(response => {
      localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(response.body)
      )
      cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', (blogTitle) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: {
      title: blogTitle,
      author: 'Cyprenius Dons',
      url: 'http://cypresio.com'
    },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBloglistUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('likeBlog', (blog) => {
  cy.contains(blog).parent()
    .contains('Show Details').click()
  cy.contains(blog).parent()
    .contains('button', 'Like').click()
  cy.wait(500)
})


