describe('Testes da criação, registro e login', () => {
  it('Teste de criação de usuário com falha', () => {
    cy.visit('https://www.demoblaze.com/index.html')
    // Clica no botão "Sign In"
    cy.get('#signin2').click()

    // Preenche os campos de registro com informações inválidas
    cy.get('#sign-username').type('joaozin')
    cy.get('#sign-password').type('joaozin')

    // Clica no botão "Sign Up"
    cy.get(
      '#signInModal .modal-dialog .modal-content .modal-footer .btn-primary',
    ).click()
  })

  it('Cria e faz login com um usuário criado', () => {
    // Chama a função criaruser para obter as informações de usuário
    const infos = criaruser()

    cy.visit('https://www.demoblaze.com/index.html')
    // Clica no botão "Login"
    cy.get('#login2').click()

    // Preenche os campos de login com as informações criadas
    cy.wait(1000)
    cy.get('#loginusername').type(infos[0])
    cy.wait(1000)
    cy.get('#loginpassword').type(infos[1])
    cy.wait(1000)
    // Clica no botão "Log in"
    cy.get(
      '#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary',
    )
      .should('be.visible')
      .click()
    // Confere se logou
    cy.get('#nameofuser').should('contain.text', infos[0])
  })

  it('Contato o suporte dosite', () => {
    // Visite o site
    cy.visit('https://www.demoblaze.com/index.html')
    // Clica em Contact
    cy.get(':nth-child(2) > .nav-link').click()
    // Escreve as informações e a mensagem
    cy.wait(700)
    cy.get('#recipient-email').type('joaozin@email.com')
    cy.wait(700)
    cy.get('#recipient-name').type('joazin')
    cy.wait(700)
    cy.get('#message-text').type(
      'Como o dia está lindo hoje, vim por meio de tal ferramenta para contacta-los e desejar um feliz e tranquilo dia',
    )
    cy.wait(700)
    // Envia a mensagem
    cy.get(
      '#exampleModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click()
  })
})

function criaruser() {
  const hora = new Date().getHours().toString()
  const minuto = new Date().getMinutes().toString()
  const seg = new Date().getSeconds().toString()
  const ID = hora + minuto + seg + 'ID'
  const Senha = hora + minuto + seg + 'Senha'

  // Clica no botão "Sign In" para abrir o formulário de registro
  cy.visit('https://www.demoblaze.com/index.html')
  cy.get('#signin2').click()
  // Preenche os campos de registro com as informações geradas
  cy.wait(1000)
  cy.get('#sign-username').type(ID)
  cy.wait(1000)
  cy.get('#sign-password').type(Senha)
  cy.wait(1000)

  // Clica no botão "Sign Up" para criar o usuário
  cy.get(
    '#signInModal .modal-dialog .modal-content .modal-footer .btn-primary',
  ).click()

  // Retorna as informações do usuário
  return [ID, Senha]
}
