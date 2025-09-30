# Projeto Conduit - QA Cypress

Este projeto é baseado na aplicação Conduit (estilo Medium) e contém testes automatizados **Web e API** usando **Cypress**.

---

## Estrutura do Projeto
```
frontend/
├── cypress/
│   ├── e2e/
│   │   ├── web/
│   │   │   ├── api.cy.js            # Teste de login via UI e feed de artigos
│   │   │   └── login.cy.js          # Teste de login via UI e feed de artigos
│   │   └── api/
│   │       ├── login.cy.js          # Testes de API para login 200/401
│   │       └── articles.cy.js       # Testes de API para artigos (listar, criar, atualizar, excluir)
│   ├── fixtures/
│   │   ├── users.json               # Dados mock de usuários (validUser, invalidUser, etc.)
│   │   └── articles.json            # Dados mock de artigos para feed e feed personalizado
│   └── support/
│       ├── commands.js              # Comando customizado loginUI
│       └── e2e.js                   
├── node_modules/                    
├── public/                          
├── src/                            
│   ├── components/
│   ├── pages/
│   └── ...
├── package.json                     
├── vite.config.js                   
└── README.md                        # Documentação do projeto, casos de teste e instruções
````
---

## Casos de Teste Web (UI)

1. Login com sucesso via UI  
2. Login com dados incorretos → mensagem de erro  
3. Exibir feed com artigos mockados  
4. Visualizar detalhes do artigo 1  
5. Visualizar detalhes do artigo 2  
6. Criar novo artigo (UI) → validação de campos  
7. Editar artigo existente  
8. Excluir artigo existente  
9. Favoritar artigo e validar contador  
10. Filtrar artigos por tag e validar resultado  

---

## Casos de Teste API

1. Login com sucesso → status 200, retorna token  
2. Login com senha incorreta → status 401  
3. Login com email inválido → status 401  
4. Obter feed de artigos → status 200, retorna lista  
5. Obter lista de tags → status 200  
6. Criar novo artigo → status 201  
7. Atualizar artigo existente → status 200  
8. Excluir artigo → status 204  
9. Favoritar artigo → status 200  
10. Desfavoritar artigo → status 200  

> Todos os testes API estão mockados usando fixtures para evitar dependência do backend real.

---

## Como Executar

1. Instalar dependências:
```bash
npm install

2. Rodar a aplicação frontend:

npm run dev

3. Abrir Cypress

npx cypress open

4. Selecionar os testes Web ou API para execução.

````
---

## Padrão de Projeto e Estrutura de Pastas

* Comandos customizados no commands.js (ex: loginUI)

* Fixtures para mockar dados de usuários e artigos

* Intercepts para interceptar requisições da UI e API

* E2E tests separados por web e api

* Organização clara para facilitar manutenção e leitura

---

## Geração de Reports

* Cypress gera reports nativos ao abrir o Test Runner (npx cypress open)

* Para integração com CI/CD ou reports avançados, pode-se usar plugins como mochawesome.

---

## Criatividade e Ajustes

* Testes 100% mockados, sem necessidade de backend real.

* Ignorado erro do React “Objects are not valid as a React child” durante UI tests.

* Uso de fixtures para garantir consistência e reprodutibilidade dos testes.

* Estrutura de pastas limpa, pronta para entrega na DIO e visualização de recrutadores.
