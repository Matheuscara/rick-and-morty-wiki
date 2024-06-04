
<div align="center">
  <img src="https://i.imgur.com/GmtIDIW.png" width="150">
</div>
<div align="center">
    Rick and Morty Wiki 
</div>

## Projeto

Crie uma SPA utilizando a API Rick & Morty para consumo de dados. Qualquer funcionalidade extra é bem-vinda e será um diferencial.
O layout e a arquitetura são por sua conta, apenas atente-se aos requisitos propostos. 
    - API: https://rickandmortyapi.com/

### Tecnologias Utilizadas

- Angular v17+: 
    - Utilizado para desenvolver a aplicação devido à sua robustez e suporte contínuo. A versão 17 traz melhorias de desempenho e novas funcionalidades que ajudam a criar uma SPA moderna e eficiente.
- Tailwind CSS: 
    - Utilizado para a estilização das páginas. Tailwind CSS permite uma maneira rápida e eficiente de criar estilos personalizados sem sair do HTML, resultando em um desenvolvimento mais rápido e um design mais consistente.
- Nx:  
    - Nx foi escolhido para o gerenciamento do projeto, incluindo testes unitários e melhor controle do projeto. Ao invés de usar apenas a CLI Angular, Nx oferece benefícios adicionais como:
        - **Armazenamento em cache de tarefas**: Acelera o tempo de execução armazenando em cache os resultados de tarefas.
        - **Execução de tarefas afetadas**: Executa apenas tarefas afetadas por uma alteração de código, otimizando o fluxo de trabalho.
        - **Divisão de arquivos de configuração**: Permite dividir um grande angular.json em vários arquivos project.json, facilitando a gestão de projetos maiores.
        - **Integração com ferramentas modernas**: Suporte a diversas ferramentas modernas e um processo de atualização controlável.
- State com Signals: 
    - O estado da aplicação é gerenciado com `Subject Service` utilizando signals para compartilhamento de dados entre os componentes. Isso proporciona um gerenciamento de estado reativo e eficiente.
- Imgur: 
    - Utilizado para o deploy das imagens necessárias. Imgur é uma plataforma confiável e fácil de usar para hospedar imagens, garantindo que as imagens estejam sempre disponíveis e acessíveis.
- npx-infinite-scroll: 
    - Utilizado para implementar o scroll infinito no projeto. NPX Infinite Scroll é uma solução prática para carregar dados de forma contínua à medida que o usuário rola a página, melhorando a experiência do usuário.

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Instalar dependencias
Para instalar todas as dependencias, execute:
```
npm install
```

## Iniciar a aplicação
Para iniciar o servidor de desenvolvimento execute: 
```
npx nx serve rick-and-morty-wiki
```

## Para rodar os testes unitarios
Para iniciar o servidor de testes execute: 
```
npx nx run rick-and-morty-wiki:test
```

## Para rodar os testes E2E com cypress

Para executar os testes com o cypress rodando standBy
```
npx nx run rick-and-morty-wiki-e2e:e2e
```

Para abrir e visualizar os testes:
```
npx nx run rick-and-morty-wiki-e2e:open-cypress
```

## Construir para produção
Para construir a aplicação, execute
```
npx nx build rick-and-morty-wiki
```
Os artefatos de construção são armazenados no diretório de saída (por exemplo, dist/ ou build/), prontos para serem implantados.

## Explorar o gráfico de dependencias
Para mostrar o gráfico do workspace, execute:
```
npx nx graph
```
Ele mostrará as tarefas que você pode executar com Nx.

