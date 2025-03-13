# Especificações do Projeto


## Personas

- **Persona 1 – João, o Estudante Universitário**

Idade: 22 anos 

Profissão: Estudante de Letras 

-Hobbies: Leitura de clássicos da literatura, escrita criativa, participar de grupos de discussão online 

Desafios: Dificuldade em organizar as leituras acadêmicas e de lazer, falta de recomendações personalizadas 

Necessidades: Uma plataforma que ajude a registrar os livros lidos, acompanhar o progresso e encontrar novas leituras baseadas em seus interesses 

Motivação para usar o TÔ LENDO: Quer se organizar melhor para equilibrar leituras acadêmicas e pessoais, além de interagir com outros leitores.




- **Persona 2 – Mariana, a Jovem Leitora Casual**

Idade: 18 anos

Profissão: Estudante do ensino médio 

Hobbies: Redes sociais, assistir séries, ler romances contemporâneos 

Desafios: Falta de incentivo para manter um hábito de leitura contínuo, dificuldade em escolher o próximo livro 

Necessidades: Um ambiente interativo e gamificado que torne a leitura mais envolvente e divertida 

Motivação para usar o TÔ LENDO: Quer participar de desafios de leitura e receber indicações de livros baseadas em seus gostos 



- **Persona 3 – Ricardo, o Profissional Atarefado**

Idade: 30 anos 

Profissão: Analista de Marketing 

Hobbies: Desenvolvimento pessoal, leitura de não-ficção, podcasts sobre produtividade 

Desafios: Falta de tempo para ler e dificuldade em organizar as leituras profissionais e de lazer 

Necessidades: Uma plataforma que o ajude a planejar e acompanhar seus livros, além de recomendações de leituras relevantes 

Motivação para usar o TÔ LENDO: Quer otimizar seu tempo e manter o hábito de leitura alinhado com seus objetivos profissionais

Enumere e detalhe as personas da sua solução. Para tanto, baseie-se tanto nos documentos disponibilizados na disciplina e/ou nos seguintes links:

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`   | QUERO/PRECISO ... `FUNCIONALIDADE`|PARA ... `MOTIVO/VALOR`                     |
|-----------------------|-----------------------------------|--------------------------------------------|
|Estudante universitário| Dar minha opnião a outros leitores| Ajudar leitores indecisos ou novos leitores|
|Leitor Amador          | Registrar os livros que já li     | Ter mais organização da minha biblioteca   |
|Jovem leitora          | Fazer recomendações de livros     | Ajudar novos leitores iniciantes           |
|Pai atarefado          | Habituar a leitura dos meus filhos| Aperfeiçoar o apendizado deles             |

## Requisitos

As tabelas a seguir detalham os requisitos funcionais e não funcionais do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade | 
|------|-----------------------------------------|----| 
|RF-001| Permitir que os usuários realizem cadastro e login. | Alta |  
|RF-002| Permitir que o usuário redefina sua senha. | Alta | 
|RF-003| Permitir que administradores cadastrem, editem e removam livros. | Alta |
|RF-004| Permitir pesquisa e consulta de livros disponíveis. | Alta |
|RF-005| Permitir reserva e renovação de livros. | Alta |
|RF-006| Permitir que os usuários comprem livros na plataforma. | Alta |
|RF-007| Permitir feedback após o livro ser lido. | Alta |
|RF-008| Registrar os livros já lidos. | Alta |
|RF-009| Chat global para a comunidade debater sobre os livros. | Alta |
|RF-010| Permitir que usuários filtrem os livros por autor, gênero e disponibilidade. | Alta |
|RF-011| Disponibilizar histórico de empréstimos. | Média |
|RF-012| Permitir teste grátis da plataforma. | Média |
|RF-013| Emitir relatórios de uso da biblioteca.	| Baixa |
|RF-014| Permitir que os usuários experimentem o livro por um tempo.	| Baixa |



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RF-001| O sistema deve garantir a segurança dos dados dos usuários. | Alta |
|RF-002| O sistema deve ser compatível com navegadores modernos e sistemas operacionais Android. | Alta |
|RF-003| O sistema deverá deverá atender às normas legais, tais como padrões, leis, etc. | Alta |
|RF-004| A interface deve ser intuitiva e acessível para diferentes perfis de usuários. | Média |
|RF-005| Os livros estarem disponíveis em modo offline. | Média |
|RF-006| O desenvolvimento deve ser em linguagem Java| Baixa |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
