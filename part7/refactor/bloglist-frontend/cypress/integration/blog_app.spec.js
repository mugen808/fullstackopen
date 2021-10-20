describe('Blog Application', () => {

  beforeEach(function(){
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Kalani Brown',
      username: 'kalani',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('login form is shown', function() {
    cy.contains('Show Login')
  })

  it('Log in denied if wrong credentials', function() {
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('kalaney')
    cy.get('[placeholder="Password"]').type('salainen')
    cy.contains('Login').click()
    cy.contains('Invalid username or password')
  })

  it('User can log in correctly', function(){
    cy.contains('Show Login').click()
    cy.get('[placeholder="Username"]').type('kalani')
    cy.get('[placeholder="Password"]').type('salainen')
    cy.contains('Login').click()
    cy.contains('Hello, Kalani Brown')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kalani', password: 'salainen' })
    })

    it('new blog can be added', function() {
      cy.contains('Show Fields').click()
      cy.get('[placeholder="Title"]').type('Cypress Hill!!')
      cy.get('[placeholder="Author"]').type('Maria Carey')
      cy.get('[placeholder="Url"]').type('http://singasong.tr')
      cy.contains('Create a new blog').click()
    })
    describe('like and delete blog buttons works as expected', function() {
      beforeEach(function() {
        cy.createBlog()
        cy.contains('Show Details').click()
      })

      it('a blog can be liked', function() {
        cy.get('#blog-like-button').click()
        cy.contains('1')
      })
      it('a blog can be deleted', function() {
        cy.contains('Delete').click()
      })
    })
    describe('when multiple blogs', function() {
      beforeEach(function() {
        cy.createBlog('Blog 1')
        cy.createBlog('Blog 2')
        cy.createBlog('Blog 3')
      })
      it.only('blogs are organized by number of likes', function() {
        cy.contains('Title:').first().parent().contains('Blog 1')
        cy.likeBlog('Blog 3')
        cy.contains('Title:').first().parent().contains('Blog 3')
        cy.likeBlog('Blog 2')
        cy.contains('Blog 2').parent()
          .contains('button', 'Like').click()
        cy.wait(500)
        cy.contains('Title:').first().parent().contains('Blog 2')
      })
    })
  })
})