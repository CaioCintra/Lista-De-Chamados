## Instalação

Primeiramente execute um destes comandos para instalar as dependências:

```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

Com tudo instalado use um dos comandos a seguir para executar o sistema:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Acesse o sistema entrando em: [http://localhost:3000](http://localhost:3000) no seu navegador.

## Decisões de projeto

### Volume de dados
Por ser um projeto que pretende simular muitos dados foi usado o [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) para gerar novos cards e popular o sistema.
Para solucionar o problema de carregamento que essa alta carga de dados causaria, foi feita uma virtualização com o [react-virtuoso](https://www.npmjs.com/package/react-virtuoso), onde os dados não são carregados ao mesmo tempo e sim focando em carregar os que estão na página atual.

### Cadastro de chamados
Considerando que este projeto não tem um banco de dados verdadeiro, nem backend e os dados vem todos de mock data ou do faker-js uma decisão importante a ser tomada seria a de como registrar novos chamados, e por fim foi decidido que uma boa forma seria através de contexto, sendo assim quando o usuário cadastra um chamado novo pelo formulário ele é salvo com ajuda do ChamadoContext, isso faz com que ele possa ser visualizado mesmo sem ser registrado de vez, assim que ao reiniciar a cache o registro não estará mais lá.

### User Experience
A maior parte dos componetes usados pertencem ao [Ant Design](https://ant.design) facilitando assim o trabalho em se preocupar com a usabilidade individual de cada um deles, os componentes já são criados pensando em várias necessidades do usuário e deixando bem claro sobre suas funcionalidades.
Porém como a tabela principal de chamados foi feita em forma de cards clicáveis foi decidido que seria interessante se tivesse algum estimulo visual que demonstrasse que é possível clicar no card, para isso foi trocado o cursor quando ele passar por cima do card, se tornando um pointer (o mais comum usado para interfaces clicáveis) e um pequeno aumento no tamanho do card quando isso acontece.

Outra decisão foi de optar por ícones ao invés de texto em alguns botões (como é o caso do botão de adicionar chamado e o toggle de funções) mas caso o ícone não fique claro para o usuario ele pode passar o cursor por cima e ler o que esses botões fazem com o auxilio do tooltip inserido neles.

## O que eu faria com mais tempo
Com o tempo limitado eu não pude me atentar muito com o quão bonito está o sistema e seus componentes, eu poderia estilizar melhor, colocar mais animações tornando mais agradável visualmente com mais interações e melhorar a adaptação para mobile que foi apenas fazer os componentes se encaixarem em certas telas.
Além disso foram feitas apenas funcionalidades para listar, ver detalhes e cadastrar chamados, nada para editar (alterar nome, status, etc) ou para excluir um chamado, considerando um sistema que fosse para produção isso seria necessário.
Isso sem considerar um sistema de cadastro de usuário, tendo em vista que, no momento, qualquer um pode cadastrar um chamado.

## Perguntas conceituais

### Cache e mutação: Você tem a lista de chamados carregada via React Query com filtros ativos (status = "Aberto", área = "Refrigeração"). O usuário cria um novo chamado pelo formulário. Como você garante que a lista reflita o novo item imediatamente, sem refetch completo de todos os filtros? Descreva sua estratégia (optimistic update, invalidação seletiva, ou outra).

Ele é um optimistic update, assim ele adiciona item ao estado local antes de qualquer confirmação, com isso o usuário tem a lsita atualizada automaticamente com esse novo chamado sem precisar atualizar toda a base.

### Performance: Uma tabela de equipamentos com 5.000 linhas e 15 colunas está demorando 3 segundos para renderizar e trava ao filtrar. O usuário é um técnico de campo usando celular Android médio. Descreva, em ordem de prioridade, as abordagens que você aplicaria para resolver.

Primeiramente uma virtualização no frontend já ajudaria no tempo de resposta do sistema assim os dados seriam obtidos aos poucos, algo que também ajudaris seria uma paginação e um filtro pelo backend, assim ele filtra melhor não precisando renderizar dados desnecessários, o backend assim retornaria apenas o que o usuário pesquisar. Um uso de React.memo ou algum algoritmo de memorização poderia ajudar também, assim tirando a necessidade de renderizar o mesmo dado diversas vezes. Em casos mais extremos talvez reduzir a quantidade de dados que aparecem na versão mobile poderia ser uma opção, tendo em vista que o usuário vai querer ver a maior parte dos dados apenas nos chamados que ele clicar.

### Arquitetura de componentes: Você criou um <StatusBadge /> usado em 4 telas diferentes. Em uma tela ele precisa exibir um tooltip, em outra precisa abrir um dropdown ao clicar, e em uma terceira é apenas visual. Como você projeta esse componente para ser reutilizável sem virar um "mega-componente" cheio de props condicionais?

Eu faria o StatusBadge ser apenas a parte em comum entre todos eles e adicionaria outros componentes ligados a ele, quando ele estiver na versão de tooltip chama um componente para abrir em conjunto e quando for dropdown chama outro, mas em todos os casos usando o componente <StatusBadge />, já que ele é a base de tudo e tem propriedades em comum com todos.



