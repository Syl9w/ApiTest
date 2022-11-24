describe("TODO api tests", () => {
    let todoItem;
    it("fetches Todo item - GET", () => {
        cy.request('/todos/').as('todoRequest')
        cy.get('@todoRequest').then(
            todos => {
                expect(todos.status).to.eq(200)
                assert.isArray(todos.body, 'Todos response is an array')
            }
        )
    })

    it('Deletes Todo item - DELETE', () => {
        todoItem = 9
        cy.request('DELETE', `/todos/${todoItem}`).as('todoRequest')
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200)
            assert.isString(todos.body, 'todo deleted')
        })
    })

    it('Adds Todo item - POST', () => {
        cy.request('POST', `/todos/`, {task: "run tests"}).as('todoRequest')
        cy.get('@todoRequest').then(todos => {
            expect(todos.status).to.eq(200)
            cy.wrap(todos.body).should('deep.include', {
                task: 'run tests',
                completed: false
            })
        })
    })
})
