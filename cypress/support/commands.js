Cypress.Commands.add('camposObrigatórios', ({ nome, sobrenome, email, telefone, descricao }) => {

cy.get('input[id="firstName"]').type(nome)
cy.get('input[id="lastName"]').type(sobrenome)
cy.get('input[id="email"]').type(email)
cy.get('input[id="phone"]').type(telefone)
cy.get('textarea[id="open-text-area"]').type(descricao)

})
