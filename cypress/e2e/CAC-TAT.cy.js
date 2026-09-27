import { faker } from '@faker-js/faker'

describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('deve preencher os campos obrigatórios e enviar o formulário', () => {
    cy.get('input[id="firstName"]').type('Allan') // preenche o campo de nome obrigatório
    cy.get('input[id="lastName"]').type('Souza') // preenche o campo de sobrenome obrigatório
    cy.get('input[id="email"]').type('allan057@gmail.com') // preenche o campo de email obrigatório
    cy.get('input[id="phone"]').type('2197578584') // preenche o campo de telefone obrigatório
    cy.get('textarea[id="open-text-area"]').type('Esse teste está sendo muito bem sucedido para os campos obrigatórios', { delay: 0 }) // preenche o campo de mensagem obrigatório
    cy.contains('button', 'Enviar').click() // clica no botão de enviar

    cy.get('.success').should('be.visible') // verifica se a mensagem de sucesso está visível
    
  })

  it('deve exibir mensagem de erro ao enviar o formulário com email inválido', () => {
    cy.get('input[id="firstName"]').type('Allan') // preenche o campo de nome obrigatório
    cy.get('input[id="lastName"]').type('Souza') // preenche o campo de sobrenome obrigatório
    cy.get('input[id="email"]').type('allan057@gmail,com') // preenche o campo de email obrigatório
    cy.get('input[id="phone"]').type('2197578584') // preenche o campo de telefone obrigatório
    cy.get('textarea[id="open-text-area"]').type('Esse teste está sendo muito bem sucedido para os campos obrigatórios', { delay: 0 }) // preenche o campo de mensagem obrigatório
    cy.contains('button', 'Enviar').click() // clica no botão de enviar

    cy.get('span[class="error"]').should('be.visible') // verifica se a mensagem de erro está visível

})
it('deve aceitar somente números no campo de telefone', () => {

cy.get('input[id="phone"]')
  .type('abc')
  .should('have.value', '') 
})

it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{

cy.get('#firstName').type('Allan')
cy.get('#lastName').type('Souza')
cy.get('#email').type('allan057@gmail.com')
cy.get('#phone-checkbox').check() 
cy.get('span[style="display: inline;"]').should('be.visible')
cy.get('textarea[id="open-text-area"]').type('Esse teste está sendo muito bem sucedido para os campos obrigatórios', { delay: 0 })
cy.contains('button', 'Enviar').click()

cy.get('span[class="error"]').should('be.visible')
})

it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {

cy.get('input[id="firstName"]')
  .type('Allan')
  .clear()
cy.get('input[id="lastName"]')
  .type('Souza') 
  .clear()
cy.get('input[id="email"]')
  .type('allan057@gmail.com')
  .clear()
cy.get('input[id="phone"]')
  .type('2197578584')
  .clear() 
cy.get('textarea[id="open-text-area"]')
  .type('Esse teste está sendo muito bem sucedido para os campos obrigatórios', { delay: 0 }) 
  .clear()


})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {

cy.contains('button', 'Enviar').click() // clica no botão de enviar
cy.get('span[class="error"]').should('be.visible') // verifica se a mensagem de erro está visível


})

it('envia o formulário com sucesso usando um comando customizado', () =>  {
const dados = {

  nome: faker.person.firstName(),
  sobrenome: faker.person.lastName(),
  email: faker.internet.email(),
  telefone: faker.phone.number(), 
  descricao: faker.lorem.sentence(),  

}

cy.camposObrigatórios(dados)

cy.contains('button', 'Enviar').click()

cy.get('.success > strong').should('be.visible')

})

it('seleciona um produto (YouTube) por seu texto', () => {

cy.get('#product')
  .select('YouTube')
  .should('have.value', 'youtube')


})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {

cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')


})

it('seleciona um produto (Blog) por seu índice', () => {

cy.get('#product')
  .select(1)
  .should('have.value', 'blog')

})

it('marca o tipo de atendimento "Feedback"', () => { 
cy.get('input[type="radio"]')
  .check('feedback')
  .should('have.value', 'feedback')


})

it('marca cada tipo de atendimento', () => {
  cy.get('input[type="radio"]')
  .check('ajuda')
  .should('be.checked')

  cy.get('input[type="radio"]')
  .check('elogio')
  .should('be.checked')
  
  cy.get('input[type="radio"]')
  .check('feedback')
  .should('be.checked')

});

it('marca ambos checkboxes, depois desmarca o último', () => {
  cy.get('input[type="checkbox"]')
  .check()
  .uncheck('phone')
  
});

it('seleciona um arquivo da pasta fixtures', () => {
  cy.get('input[type=file]')
  .selectFile('cypress/fixtures/example.json')
  .should(input => {
  expect(input[0].files[0].name).to.equal('example.json')  
  
  })
});

it('seleciona um arquivo simulando um drag-and-drop', () => {
  cy.get('input[type=file]')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
    expect(input[0].files[0].name).to.equal('example.json')

  })
});

it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => { // Abrindo em outra página
  cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
});

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => { // Com target fazendo a página abrir na mesma página
  cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .invoke('removeAttr', 'target')
    .click()

  cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')  
});


})