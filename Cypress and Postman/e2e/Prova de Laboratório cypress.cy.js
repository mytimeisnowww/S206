describe('Testes da criação, registro e login', () => {
  it('Cria e faz login com um usuário criado', () => {
    // Chama a função criaruser para obter as informações de usuário
    const infos = criaruser();

    cy.visit('https://www.demoblaze.com/index.html');

    // Clica no botão "Login"
    cy.get('#login2').click();

    // Preenche os campos de login com as informações criadas
    cy.get('#loginusername').type(infos[0]);
    cy.get('#loginpassword').type(infos[1]);

    // Clica no botão "Log in"
    cy.get('#logInModal > .modal-dialog > .modal-content > .modal-footer > .btn-primary').click();
  });

  it("Teste de criação de usuário com falha", () => {
    cy.visit('https://www.demoblaze.com/index.html');

    // Clica no botão "Sign In"
    cy.get('#signin2').click();

    // Preenche os campos de registro com informações inválidas
    cy.get('#sign-username').type("joaozin");
    cy.get('#sign-password').type("joaozin");

    // Clica no botão "Sign Up"
    cy.get('#signInModal .modal-dialog .modal-content .modal-footer .btn-primary').click();
  });
});

function criaruser(){
  const hora = new Date().getHours().toString();
  const minuto = new Date().getMinutes().toString();
  const seg = new Date().getSeconds().toString();
  const ID = hora + minuto + seg + "ID";
  const Senha = hora + minuto + seg + "Senha";

  // Clica no botão "Sign In" para abrir o formulário de registro
  cy.visit("https://www.demoblaze.com/index.html");
  cy.get('#signin2').click();

  // Preenche os campos de registro com as informações geradas
  cy.get('#sign-username').type(ID);
  cy.get('#sign-password').type(Senha);

  // Clica no botão "Sign Up" para criar o usuário
  cy.get('#signInModal .modal-dialog .modal-content .modal-footer .btn-primary').click();

  // Retorna as informações do usuário
  return [ID, Senha];
}