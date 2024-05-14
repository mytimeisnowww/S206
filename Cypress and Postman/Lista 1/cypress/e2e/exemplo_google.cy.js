/// <reference types="cypress"/>
describe('Criando cenario de teste para o site do Google',()=>{

    it('Caso de teste: Se digitar Facebook na barra de pesquisa e clicar no botao Im feeling lucky deve abrir o site do facebook',()=>{
        type_facebook()
        cy.get('#gb').click()
        cy.get('.FPdoLc > center > .RNmpXc').click()
        cy.origin('https://www.facebook.com', () => {
            cy.get(':nth-child(1) > label').should('contain', 'Email')
         })
    })
    it('Caso de teste: Se digitar Facebook na barra de pesquisa e clicar no primeiro resultado deve pesquisar facebook',()=>{
        type_facebook()
        cy.get('#jZ2SBf > .wM6W7d > span').click()
        cy.get('#APjFqb').as('btn').should('contain', 'facebook')
    })

    it('Caso de teste: Ao clicar no botao de pesquisa de voz, deve aparecer que esse tipo de pesquisa foi desativada (Cenario negativo)', ()=>{
        visit_google()
        cy.get('.XDyW0e').click()
        cy.get('body').should('contain', 'desativada')
    })

    it('Caso de teste: Visita o google e clica no Como funciona a Pesquisa,deve aparecer a mensagem Nossa missão...',()=>{
        visit_google()
        cy.get('[href="https://google.com/search/howsearchworks/?fg=1"]').click()
        Cypress.config('defaultCommandTimeout',15000)
        cy.get('.homepage-hero__content__title').should('contain.text', 'Nossa missão é organizar as informações disponíveis no mundo todo e torná-las acessíveis e úteis para todos.')
    })

    it('Caso de teste: Se digitar Facebook na barra de pesquisa e clicar no botão de pesquisa, deve conter uma explicação sobre a Meta.',()=>{
        type_facebook()
        cy.get('.aajZCb > .lJ9FBc > center > .gNO89b').click()
        cy.get('.RJn8N').should('contain.text', 'Meta')
    })

    it('Caso de teste: Se digitar inatel santa rita na barra de pesquisa e pesquisar, deve conter a mensagem Instituto Nacional de Telecomunicações - Inatel',()=>{
        visit_google()
        cy.get('#APjFqb').type('inatel santa rita sapucaí')
        cy.get('.aajZCb > .lJ9FBc > center > .gNO89b').click()
        Cypress.config('defaultCommandTimeout',15000)
        cy.get('.DoxwDb > .PZPZlf').should('contain.text','Instituto Nacional de Telecomunicações - Inatel')
    })
})

function type_facebook(){
    visit_google()
    cy.get('#APjFqb').type('Facebook')
}

function visit_google(){
    cy.viewport(1500,700)
    cy.visit('https://www.google.com/')
}
