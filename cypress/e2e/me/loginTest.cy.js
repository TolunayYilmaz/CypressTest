describe('Form Test Cases', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5176/'); 
    });
  
    it('Başarılı form doldurulduğunda success sayfasını açabiliyorum', () => {
      cy.get('[data-cy=emailCy]').type('erdem.guntay@wit.com.tr');
      cy.get('[data-cy=passwordCy]').type('9fxIH0GXesEwH_I');
      cy.get('[data-cy=checkboxCy]').check();
      cy.get('[data-cy=buttonCy]').should('not.be.disabled').click();
      cy.url().should('include', '/success'); 
    });
  
    it('Yanlış email girildiğinde hata mesajı görünmeli ve buton disabled olmalı', () => {
      cy.get('[data-cy=emailCy]').type('wrongemail');
      cy.get('[data-cy=passwordCy]').type('ValidPass123!');
      cy.get('[data-cy=buttonCy]').should('be.disabled');
      cy.get('.text-danger').should('have.length', 1);
      cy.get('.text-danger').should('contain', 'Please enter a valid email address');
    });
  
    it('Hem email hem password yanlış girildiğinde iki hata mesajı görünmeli ve buton disabled olmalı', () => {
      cy.get('[data-cy=emailCy]').type('wrongemail');
      cy.get('[data-cy=passwordCy]').type('abc'); 
      cy.get('[data-cy=buttonCy]').should('be.disabled');
      cy.get('.text-danger').should('have.length', 2);
      cy.get('.text-danger').should('contain', 'Please enter a valid email address');
      cy.get('.text-danger').should('contain', 'Password must be at least 4 characters long');
    });
  
    it('Email ve password doğru ancak kurallar kabul edilmediğinde buton disabled olmalı', () => {
      cy.get('[data-cy=emailCy]').type('test@example.com');
      cy.get('[data-cy=passwordCy]').type('ValidPass123!');
      cy.get('[data-cy=buttonCy]').should('be.disabled');
    });
  });
  