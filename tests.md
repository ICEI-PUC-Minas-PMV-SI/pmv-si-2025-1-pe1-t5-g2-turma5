# Testes

Neste projeto serão realizados dois tipos de testes:

 - O **Teste de Software**, que utiliza uma abordadem de caixa preta, e tem por objetivo verificar a conformidade do software com os requisitos funcionais e não funcionais do sistema.
 - O **Teste de Usabilidade**, que busca avaliar a qualidade do uso do sistema por um usuário do público alvo. 

Se quiser conhecer um pouco mais sobre os tipos de teste de software, leia o documento [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/).

A documentação dos testes é dividida nas seguintes seções:

 - [Plano de Testes de Software](#plano-de-testes-de-software)
 - [Registro dos Testes de Software](#registro-dos-testes-de-software)
 - [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
 - [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
 - [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
 - [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

# Teste de Software

Nesta seção o grupo deverá documentar os testes de software que verificam a correta implementação dos requisitos funcionais e não funcionais do software.

## Plano de Testes de Software

Preencha a tabela com o plano dos testes. Para cada Caso de Teste (CT), associe qual o Requisito Funcional ou não funcional que ele está verificando. Associe também a página (ou artefato) onde o teste será realizado e descreva o cenário do teste. Veja a tabela de exemplo.


<table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
        <col class="col0">
        <col class="col1">
        <col class="col2">
        <tbody>
          <tr class="row0">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT01 - Criar conta</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row1">
            <td class="column0 style11 s style11" rowspan="4">Procedimento</td>
            <td class="column1 style5 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/login.html</td>
            <td class="column2 style12 s style12" rowspan="8">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row2">
            <td class="column1 style2 s">2) Clique em &quot;criar conta&quot;</td>
          </tr>
          <tr class="row3">
            <td class="column1 style2 s">3) Preencha todos os campos do formulário</td>
          </tr>
          <tr class="row4">
            <td class="column1 style2 s">4) Clique no botão &quot;entrar&quot;.</td>
          </tr>
          <tr class="row5">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-001</td>
          </tr>
          <tr class="row6">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Logar no usuaio criado direto para pagina do usuario</td>
          </tr>
          <tr class="row7">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção de dados válidos no formulário de cadastro</td>
          </tr>
          <tr class="row8">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row9">
            <td class="column0 style10 null style10" colspan="3"></td>
          </tr>
          <tr class="row11">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT02 - Redefinir senha - parte 1</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row12">
            <td class="column0 style11 s style11" rowspan="4">Procedimento</td>
            <td class="column1 style5 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/login.html</td>
            <td class="column2 style12 s style12" rowspan="8">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row13">
            <td class="column1 style2 s">2) Clique em &quot;Esqueceu sua senha?&quot;</td>
          </tr>
          <tr class="row14">
            <td class="column1 style2 s">3) Preencha os campos do formulário</td>
          </tr>
          <tr class="row15">
            <td class="column1 style2 s">4) Clique no botão &quot;Confirmar nova senha&quot;.</td>
          </tr>
          <tr class="row16">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-002</td>
          </tr>
          <tr class="row17">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Redirecionamento para página de redefinição de senha</td>
          </tr>
          <tr class="row18">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção do usuario/e-mail no campo correspondente</td>
          </tr>
          <tr class="row19">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row20">
            <td class="column0 style14 null style14" colspan="3"></td>
          </tr>
          <tr class="row22">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT02 - Redefinir senha - parte 2</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row23">
            <td class="column0 style11 s style11" rowspan="4">Procedimento</td>
            <td class="column1 style5 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/login.html</td>
            <td class="column2 style12 s style12" rowspan="8">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row24">
            <td class="column1 style4 s">2) Preencha o campo de e-mail com o e-mail que pretende alterar a senha.</td>
          </tr>
          <tr class="row25">
            <td class="column1 style4 s">3) Escreva nos dois campos de senha a nova senha que pretente entrar em vigor.</td>
          </tr>
          <tr class="row26">
            <td class="column1 style2 s">4) Clique no botão &quot;entrar&quot;.</td>
          </tr>
          <tr class="row27">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-002</td>
          </tr>
          <tr class="row28">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Redirecionamento para página do usuário.</td>
          </tr>
          <tr class="row29">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção do e-mail e senha do usuário.</td>
          </tr>
          <tr class="row30">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row31">
            <td class="column0 style14 null style14" colspan="3"></td>
          </tr>
          <tr class="row33">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT03 - Cadastro de livro - parte 1</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row34">
            <td class="column0 style11 s style11" rowspan="3">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/cadastro.html</td>
            <td class="column2 style13 s style13" rowspan="7">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row35">
            <td class="column1 style2 s">2) Preencha todos os campos obrigarios da primeira etapa formulário.</td>
          </tr>
          <tr class="row36">
            <td class="column1 style5 s">3) Clique no botão &quot;Proximo&quot;.</td>
          </tr>
          <tr class="row37">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row38">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Abertura da segunda etapa de cadastro</td>
          </tr>
          <tr class="row39">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção dos dados principais do livro.</td>
          </tr>
          <tr class="row40">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row41">
            <td class="column0 style14 null style14" colspan="3"></td>
          </tr>
          <tr class="row43">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT03 - Cadastro de livro - parte 2</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row44">
            <td class="column0 style11 s style11" rowspan="3">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/cadastro.html</td>
            <td class="column2 style13 s style13" rowspan="7">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row45">
            <td class="column1 style2 s">2) Preencha todos os campos obrigarios da segunda etapa formulário.</td>
          </tr>
          <tr class="row46">
            <td class="column1 style5 s">3) Clique no botão &quot;Proximo&quot;.</td>
          </tr>
          <tr class="row47">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row48">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Abertura da terceira etapa do cadastro.</td>
          </tr>
          <tr class="row49">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção dos dados quantitativo e classificatorio do livro.</td>
          </tr>
          <tr class="row50">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row51">
            <td class="column0 style14 null style14" colspan="3"></td>
          </tr>
          <tr class="row53">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT03 - Cadastro de livro - parte 3</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row54">
            <td class="column0 style11 s style11" rowspan="3">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/cadastro.html</td>
            <td class="column2 style13 s style13" rowspan="7">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row55">
            <td class="column1 style2 s">2) Preencha todos os campos obrigarios da terceira etapa formulário.</td>
          </tr>
          <tr class="row56">
            <td class="column1 style5 s">3) Clique no botão &quot;Proximo&quot;.</td>
          </tr>
          <tr class="row57">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row58">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Abertura da quarta etapa do cadastro.</td>
          </tr>
          <tr class="row59">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Inserção dos links sobre o livro.</td>
          </tr>
          <tr class="row60">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row61">
            <td class="column0 style14 null style14" colspan="3"></td>
          </tr>
          <tr class="row63">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT03 - Cadastro de livro - parte 4</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row64">
            <td class="column0 style11 s style11" rowspan="3">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/cadastro.html</td>
            <td class="column2 style13 s style13" rowspan="7">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row65">
            <td class="column1 style2 s">2) Preencha os campos que achar necessario da quarta etapa formulário, etapa opcional.</td>
          </tr>
          <tr class="row66">
            <td class="column1 style5 s">3) Clique no botão &quot;Salvar Cadastro&quot;.</td>
          </tr>
          <tr class="row67">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row68">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Retorno visual confirmando cadastro realizado com sucesso.</td>
          </tr>
          <tr class="row69">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Preenchimento de dados extras sobre o livro.</td>
          </tr>
          <tr class="row70">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row71">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row72">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row73">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT04 - Remover livro</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row74">
            <td class="column0 style11 s style11" rowspan="5">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/catalogo.html</td>
            <td class="column2 style13 s style13" rowspan="9">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row75">
            <td class="column1 style2 s">2) Escreva o nome do livro no campo de busca central.</td>
          </tr>
          <tr class="row76">
            <td class="column1 style5 s">3) Visualize o ícone de lixeira sobre a capa do livro.</td>
          </tr>
          <tr class="row77">
            <td class="column1 style5 s">4) Clique sobre o ícone de lixeira.</td>
          </tr>
          <tr class="row78">
            <td class="column1 style5 s">5) Confirme remoção, clicando em &quot;Excluir livro&quot;.</td>
          </tr>
          <tr class="row79">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row80">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Livro sairá do catalogo do projeto.</td>
          </tr>
          <tr class="row81">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Nome do livro.</td>
          </tr>
          <tr class="row82">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row83">
            <td class="column0 style10 null style10" colspan="3"></td>
          </tr>
          <tr class="row85">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT05 - Editar livro cadastrado</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row86">
            <td class="column0 style11 s style11" rowspan="5">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/catalogo.html</td>
            <td class="column2 style13 s style13" rowspan="9">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row87">
            <td class="column1 style2 s">2) Busque o livro que gostaria de editar.</td>
          </tr>
          <tr class="row88">
            <td class="column1 style5 s">3) Visualize o ícone de edição sobre a capa do livro.</td>
          </tr>
          <tr class="row89">
            <td class="column1 style5 s">4) Clique sobre o ícone de edição.</td>
          </tr>
          <tr class="row90">
            <td class="column1 style5 s">5) Ajuste os dados abertos</td>
          </tr>
          <tr class="row91">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-003</td>
          </tr>
          <tr class="row92">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Dados do livro serão atualizados.</td>
          </tr>
          <tr class="row93">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Nome do livro.</td>
          </tr>
          <tr class="row94">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row95">
            <td class="column0 style10 null style10" colspan="3"></td>
          </tr>
          <tr class="row97">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT06 - Consulta de disponibilidade</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row98">
            <td class="column0 style11 s style11" rowspan="2">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/catalogo.html</td>
            <td class="column2 style12 s style12" rowspan="6">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row99">
            <td class="column1 style2 s">2) Busque o livro que gostaria de achar no campo de pesquisa com nome do livro ou autor(a).</td>
          </tr>
          <tr class="row100">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-004</td>
          </tr>
          <tr class="row101">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Dados do livro serão atualizados.</td>
          </tr>
          <tr class="row102">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Nome do livro ou nome do autor(a)</td>
          </tr>
          <tr class="row103">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row104">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row105">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row106">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT07 - Registrar livro como lido</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row107">
            <td class="column0 style11 s style11" rowspan="5">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/user.html</td>
            <td class="column2 style12 s style12" rowspan="9">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row108">
            <td class="column1 style2 s">2) Clique no botão a esquerda &quot;+ Adicionar livro&quot;.</td>
          </tr>
          <tr class="row109">
            <td class="column1 style2 s">3) Utilize o scroll para achar o livro desejado.</td>
          </tr>
          <tr class="row110">
            <td class="column1 style2 s">4) Clique no livro.</td>
          </tr>
          <tr class="row111">
            <td class="column1 style2 s">5) Escolha a seção &quot;Finalizado&quot;.</td>
          </tr>
          <tr class="row112">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-006</td>
          </tr>
          <tr class="row113">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Aparecimento do livro na Biblioteca do usuário.</td>
          </tr>
          <tr class="row114">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Uso do mouse.</td>
          </tr>
          <tr class="row115">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
          <tr class="row116">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row117">
            <td class="column0 style6 null"></td>
            <td class="column1 style6 null"></td>
            <td class="column2 style7 null"></td>
          </tr>
          <tr class="row118">
            <td class="column0 style9 s">Caso de Teste</td>
            <td class="column1 style9 s">CT08 - FILTRAGEM POR AUTOR(RA) OU GENERO</td>
            <td class="column2 style1 s">Responsável</td>
          </tr>
          <tr class="row119">
            <td class="column0 style11 s style11" rowspan="2">Procedimento</td>
            <td class="column1 style15 s">1) Acesse o endereço https://icei-puc-minas-pmv-si.github.io/pmv-si-2025-1-pe1-t5-g2-turma5/src/USER/catalogo.html</td>
            <td class="column2 style12 s style12" rowspan="6">Igor Ferreira Soares da Silva</td>
          </tr>
          <tr class="row120">
            <td class="column1 style2 s">2) Utilize os dropdown de genero ou campo de pesquisa para entrar com nome do livro ou autor(a).</td>
          </tr>
          <tr class="row121">
            <td class="column0 style3 s">Requisitos associados</td>
            <td class="column1 style3 s">RF-007</td>
          </tr>
          <tr class="row122">
            <td class="column0 style2 s">Resultado esperado</td>
            <td class="column1 style2 s">Livro aparecerá</td>
          </tr>
          <tr class="row123">
            <td class="column0 style3 s">Dados de entrada</td>
            <td class="column1 style3 s">Seleção de genero ou escrita do(a) autor(a).</td>
          </tr>
          <tr class="row124">
            <td class="column0 style2 s">Resultado obtido</td>
            <td class="column1 style2 s">Sucesso</td>
          </tr>
        </tbody>
    </table>

## Registro dos Testes de Software

Esta seção deve apresentar o relatório com as evidências dos testes de software realizados no sistema pela equipe, baseado no plano de testes pré-definido. Documente cada caso de teste apresentando um vídeo ou animação que comprove o funcionamento da funcionalidade. Veja os exemplos a seguir.

<table border="0" cellpadding="0" cellspacing="0" id="sheet0" class="sheet0 gridlines">
        <col class="col0">
        <col class="col1">
        <tbody>
          <tr class="row0">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT01 - Criar conta</td>
          </tr>
          <tr class="row1">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-001 - Permitir que os usuários realizem cadastro e login.</td>
          </tr>
          <tr class="row2">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1DBO09Nxv-e4HnWZ5H9iqfIAOJVzNrctI/view?usp=drive_link</td>
          </tr>
          <tr class="row3">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row4">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT02 - Redefinir senha - parte 1</td>
          </tr>
          <tr class="row5">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-002 - Permitir que o usuário redefina sua senha.</td>
          </tr>
          <tr class="row6">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1VeA7v0PXvxaFBqIEGW2UmC8gw4OWXcW5/view?usp=drive_link</td>
          </tr>
          <tr class="row7">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row8">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT02 - Redefinir senha - parte 2</td>
          </tr>
          <tr class="row9">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-002 - Permitir que o usuário redefina sua senha.</td>
          </tr>
          <tr class="row10">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1VLDQjynSyAyk0Bs00lNsGw32L_cdzKwS/view?usp=drive_link</td>
          </tr>
          <tr class="row11">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row12">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT03 - Cadastro de livro - parte 1</td>
          </tr>
          <tr class="row13">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row14">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1QHh2p-7wANtP98bg7-Z6c765g-_M0EBi/view?usp=sharing</td>
          </tr>
          <tr class="row15">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row16">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT03 - Cadastro de livro - parte 2</td>
          </tr>
          <tr class="row17">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row18">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/14KrJZYqJI8ZxBWRBgBS6lBtMRYx-xNxD/view?usp=drive_link</td>
          </tr>
          <tr class="row19">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row20">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT03 - Cadastro de livro - parte 3</td>
          </tr>
          <tr class="row21">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row22">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1UTQ57uK9A8rbJr44s_JY3G_RKwcik4Db/view?usp=drive_link</td>
          </tr>
          <tr class="row23">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row24">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT03 - Cadastro de livro - parte 4</td>
          </tr>
          <tr class="row25">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row26">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1jsMvuKBksmBHDYb4mTJTxywxvQ76njCc/view?usp=drive_link</td>
          </tr>
          <tr class="row27">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row28">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT04 - Remover livro</td>
          </tr>
          <tr class="row29">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row30">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/12RccIwiEVVxD3ZQM5OjFeFsuXyRoi4HW/view?usp=drive_link</td>
          </tr>
          <tr class="row31">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row32">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT05 - Editar livro cadastrado</td>
          </tr>
          <tr class="row33">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-003 - Permitir que administradores cadastrem, editem e removam livros.</td>
          </tr>
          <tr class="row34">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1YXFlyzLpJ6UL9dArDBvT4v9EtRWnbCas/view?usp=drive_link</td>
          </tr>
          <tr class="row35">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row36">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT06 - Consulta de disponibilidade</td>
          </tr>
          <tr class="row37">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-004 - Permitir pesquisa e consulta de livros disponíveis.</td>
          </tr>
          <tr class="row38">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1X6U8oLqObu6m6tyQgwbKoKZZ2ZwbwFuv/view?usp=drive_link</td>
          </tr>
          <tr class="row39">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row40">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT07 - Registrar livro como lido</td>
          </tr>
          <tr class="row41">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-006 - Registrar os livros já lidos.</td>
          </tr>
          <tr class="row42">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/1gMQvlGDjvG1wcmTBuFN2uffiDFwijYJ1/view?usp=drive_link</td>
          </tr>
          <tr class="row43">
            <td class="column0">&nbsp;</td>
            <td class="column1">&nbsp;</td>
          </tr>
          <tr class="row44">
            <td class="column0 style1 s">Caso de Teste</td>
            <td class="column1 style0 s">CT08 - FILTRAGEM POR AUTOR(RA) OU GENERO</td>
          </tr>
          <tr class="row45">
            <td class="column0 style0 s">Requisito Associado</td>
            <td class="column1 style0 s">RF-007 - Permitir que usuários filtrem os livros por autor, gênero e disponibilidade.</td>
          </tr>
          <tr class="row46">
            <td class="column0 style0 s">Link do Video do teste realizado:</td>
            <td class="column1 style0 s">https://drive.google.com/file/d/16vDYlj4uFifJcyh_FM3kcgsZnVTQMhM_/view?usp=drive_link</td>
          </tr>
        </tbody>
    </table>


## Avaliação dos Testes de Software

Discorra sobre os resultados do teste. Ressaltando pontos fortes e fracos identificados na solução. Comente como o grupo pretende atacar esses pontos nas próximas iterações. Apresente as falhas detectadas e as melhorias geradas a partir dos resultados obtidos nos testes.

## Testes de unidade automatizados (Opcional)

Se o grupo tiver interesse em se aprofundar no desenvolvimento de testes de software, ele podera desenvolver testes automatizados de software que verificam o funcionamento das funções JavaScript desenvolvidas. Para conhecer sobre testes unitários em JavaScript, leia 0 documento  [Ferramentas de Teste para Java Script](https://geekflare.com/javascript-unit-testing/).

# Testes de Usabilidade

O objetivo do Plano de Testes de Usabilidade é obter informações quanto à expectativa dos usuários em relação à  funcionalidade da aplicação de forma geral.

Para tanto, elaboramos quatro cenários, cada um baseado na definição apresentada sobre as histórias dos usuários, definido na etapa das especificações do projeto.

Foram convidadas quatro pessoas que os perfis se encaixassem nas definições das histórias apresentadas na documentação, visando averiguar os seguintes indicadores:

Taxa de sucesso: responde se o usuário conseguiu ou não executar a tarefa proposta;

Satisfação subjetiva: responde como o usuário avalia o sistema com relação à execução da tarefa proposta, conforme a seguinte escala:

1. Péssimo; 
2. Ruim; 
3. Regular; 
4. Bom; 
5. Ótimo.

Tempo para conclusão da tarefa: em segundos, e em comparação com o tempo utilizado quando um especialista (um desenvolvedor) realiza a mesma tarefa.

Objetivando respeitar as diretrizes da Lei Geral de Proteção de Dados, as informações pessoais dos usuários que participaram do teste não foram coletadas, tendo em vista a ausência de Termo de Consentimento Livre e Esclarecido.

Apresente os cenários de testes utilizados na realização dos testes de usabilidade da sua aplicação. Escolha cenários de testes que demonstrem as principais histórias de usuário sendo realizadas. Neste tópico o grupo deve detalhar quais funcionalidades avaliadas, o grupo de usuários que foi escolhido para participar do teste e as ferramentas utilizadas.

> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)


## Cenários de Teste de Usabilidade

| Nº do Cenário | Descrição do cenário |
|---------------|----------------------|
| 1             | Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando. |
| 2             | Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço. |



## Registro de Testes de Usabilidade

Cenário 1: Você é uma pessoa que deseja comprar um iphone. Encontre no site um iphone e veja detalhes de localização e contato da loja que anunciando.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 27.87 segundos                  |
| 2       | SIM             | 5                    | 17.11 segundos                  |
| 3       | SIM             | 5                    | 39.09 segundos                  |
|  |  |  |  |
| **Média**     | 100%           | 5                | 28.02 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 8.66 segundos |


    Comentários dos usuários: Achei o site muito bom e intuitivo. 
    Não tive dificuldades e acho que ficou bem intuitivo.


Cenário 2: Você é uma pessoa que deseja comprar um smartphone até R$ 2.000,00. Encontre no site smartphone's nessa faixa de preço.

| Usuário | Taxa de sucesso | Satisfação subjetiva | Tempo para conclusão do cenário |
|---------|-----------------|----------------------|---------------------------------|
| 1       | SIM             | 5                    | 22.54 segundos                          |
| 2       | SIM             | 5                    | 31.42 segundos                          |
| 3       | SIM             | 4                    | 36.21 segundos                          |
|  |  |  |  |
| **Média**     | 100%           | 4.67                | 30.05 segundos                           |
| **Tempo para conclusão pelo especialista** | SIM | 5 | 13.57 segundos |


    Comentários dos usuários: O site é fácil de acessar, mas algumas páginas poderiam 
    redirecionar a gente automaticamente para outras. Senti a falta de mais opções de filtros, 
    tanto na hora da pesquisa, quanto depois dela, nos resultados.

## Avaliação dos Testes de Usabilidade

Tomando como base os resultados obtidos, foi possível verificar que a aplicação web apresenta bons resultados quanto à taxa de sucesso na interação dos usuários, tendo em vista que os cenários propostos foram concluídos com sucesso.

Além disso, a aplicação obteve também uma elevada satisfação subjetiva dos usuários no momento que realizavam os cenários propostos. Prova são as médias das avaliações em cada um dos cenários, que variou entre 4 (bom) e 5 (ótimo).

Com relação ao tempo para conclusão de cada tarefa/cenário, notamos discrepância entre a média de tempo dos usuários e o tempo do especialista/desenvolvedor em todos os cenários. Tal discrepância, em certa medida, é esperada, tendo em vista que o desenvolvedor já tem prévio conhecimento de toda a interface da aplicação, do posicionamento dos elementos, lógica de organização das páginas, etc.

Contudo, tendo em vista que a diferença foi relevante (por exemplo, 113 segundos — média usuários — contra 25 segundos — especialista — no cenário três), e ainda os comentários feitos por alguns usuários, entendemos haver oportunidades de melhoria na usabilidade da aplicação.



