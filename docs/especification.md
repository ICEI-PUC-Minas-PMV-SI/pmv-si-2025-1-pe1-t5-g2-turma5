# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto.

Caso deseje atribuir uma imagem a sua persona, utilize o site https://thispersondoesnotexist.com/

## Personas

Pedro Paulo tem 26 anos, é arquiteto recém-formado e autônomo. Pensa em se desenvolver profissionalmente através de um mestrado fora do país, pois adora viajar, é solteiro e sempre quis fazer um intercâmbio. Está buscando uma agência que o ajude a encontrar universidades na Europa que aceitem alunos estrangeiros.

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
Lembre-se que você deve ser enumerar e descrever precisamente e personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Ricardo             | Biblioteca propria                 | Divlgar os livros que gostou           |
|Joana               | Registrar os livros que ja leu     | Não esqecer e ler o mesmo livro        |
|Gondin              | Comunidade para debate de livros   | ter Network e ver outras opniões       |
|Mbappe              | Divulgar livros para outras pessoas| Ajudar novos leitores iniciantes       |
|Maria               | Achar livros com avaliaçoes boas   | Nao perder tempo com livros ruins      |


Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas a seguir detalham os requisitos funcionais e não funcionais do projeto. A priorização dos requisitos foi realizada utilizando a técnica de MoSCoW, classificando-os em:

Deve ter: Requisitos essenciais para o funcionamento básico do sistema.
Deveria ter: Requisitos importantes, mas não críticos para o lançamento inicial.
Poderia ter: Requisitos desejáveis, que podem ser implementados em futuras versões.
Não terá: Requisitos que não serão implementados neste momento.


### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| Permitir que os usuários realizem cadastro e login. | Deve ter |  
|RF-002| Permitir que o usuário redefina sua senha. | deve ter | 
|RF-003| Permitir que administradores cadastrem, editem e removam livros. | Deve ter |
|RF-004| Permitir pesquisa e consulta de livros disponíveis. | Deve ter |
|RF-005| Permitir reserva e renovação de livros. | Deve ter |
|RF-006| Permitir que os usuários comprem livros na plataforma. | Deve ter |
|RF-007| Permitir feedback após a compra. | Deve ter |
|RF-008| Permitir que usuários filtrem os livros por autor, gênero e disponibilidade. | Deve ter |
|RF-009| Disponibilizar histórico de empréstimos. | Deveria ter |
|RF-010| Emitir relatórios de uso da biblioteca.	| Poderia ter |
|RF-011| Permitir que os usuários experimentem o livro por um tempo.	| Poderia ter |
|RF-012| Permitir teste grátis da plataforma. | Poderia ter |
|RF-013| Permitir vender os livros comprados. | Não terá |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RF-001| O sistema deve garantir a segurança dos dados dos usuários. | Deve ter |
|RF-002| O sistema deve ser compatível com navegadores modernos e sistemas operacionais Android. | Deve ter |
|RF-003| O sistema deverá deverá atender às normas legais, tais como padrões, leis, etc. | Deve ter |
|RF-004| A interface deve ser intuitiva e acessível para diferentes perfis de usuários. | Deveria ter |
|RF-005| Os livros estarem disponíveis em modo offline. | Deveria ter |
|RF-006| O desenvolvimento deve ser em linguagem Java| Poderia ter |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
