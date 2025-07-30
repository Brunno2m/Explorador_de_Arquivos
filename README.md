📁 Explorador de Arquivos (File Manager)
Este projeto simula um sistema de gerenciamento de arquivos e pastas, semelhante ao explorador de arquivos de um sistema operacional. Ele foi desenvolvido com foco na implementação de uma estrutura de dados em árvore para manipulação hierárquica de dados, utilizando tecnologias web modernas: HTML, CSS e TypeScript.

🚀 Funcionalidades
Criação de Pastas e Arquivos: Adicione novos itens à estrutura hierárquica.

Exibição em Árvore: Visualização intuitiva da hierarquia de arquivos e pastas com ícones.

Remoção de Itens: Exclua pastas ou arquivos da árvore.

Exibição de Caminho Absoluto: Veja o caminho completo de qualquer item selecionado, desde a raiz.

Seleção Interativa: Clique em um item para selecioná-lo e interagir com ele.

✨ Tecnologias Utilizadas
HTML5: Estrutura da interface de usuário.

CSS3: Estilização e design da aplicação.

TypeScript: Linguagem principal para a lógica de programação, com foco na implementação da estrutura de dados em árvore.

Node.js & npm: Ambiente de execução e gerenciamento de pacotes.

live-server: Servidor de desenvolvimento para recarregamento automático.

tsc (TypeScript Compiler): Para compilar o código TypeScript para JavaScript.

🏗️ Estrutura do Projeto
O projeto é organizado em arquivos para clareza e manutenção:

explorador-arquivos/
├── public/                 # Contém os arquivos estáticos (HTML, CSS)
│   ├── index.html          # Estrutura principal da página
│   └── style.css           # Estilos da aplicação
├── src/                    # Código fonte TypeScript
│   ├── app.ts              # Lógica de interação com a interface (DOM, eventos)
│   ├── file-manager.ts     # Ponto de entrada principal que orquestra tudo
│   └── tree.ts             # Implementação da estrutura de dados em árvore
├── dist/                   # Diretório de saída para os arquivos JavaScript compilados
├── package.json            # Metadados do projeto e dependências
├── tsconfig.json           # Configurações do compilador TypeScript
└── README.md               # Este arquivo!


Nota: A pasta public/ é uma sugestão para organizar seus arquivos estáticos. Se você manteve index.html e style.css na raiz do projeto, ajuste os caminhos conforme necessário (por exemplo, em index.html a referência ao style.css seria style.css e não public/style.css).

⚙️ Como Rodar o Projeto
Siga os passos abaixo para configurar e executar o Explorador de Arquivos em sua máquina local.

Pré-requisitos
Certifique-se de ter o Node.js (que inclui o npm) instalado em seu sistema.

Instalação
Clone o repositório:

Bash

git clone https://github.com/seu-usuario/nome-do-seu-repositorio.git
cd nome-do-seu-repositorio
(Substitua seu-usuario/nome-do-seu-repositorio.git pelo caminho real do seu repositório.)

Instale as dependências:

Bash

npm install
Execução
Após a instalação das dependências, você pode compilar o código TypeScript e iniciar o servidor de desenvolvimento:

Bash

npm start
Isso compilará os arquivos TypeScript para a pasta dist/ e abrirá o projeto automaticamente no seu navegador, geralmente em http://127.0.0.1:8080 ou similar.

💡 Estrutura de Dados (TypeScript)
A lógica central do projeto reside na implementação da árvore em TypeScript (src/tree.ts).

A interface TreeNode define a estrutura de cada nó (ID, nome, tipo, filhos e pai).

A classe FileTree gerencia a árvore, incluindo métodos para:

addNode(parentId, name, type): Adiciona um novo nó como filho de um parentId especificado.

removeNode(nodeId): Remove um nó da árvore.

findNodeById(id): Percorre a árvore (utilizando uma busca em profundidade - DFS) para encontrar um nó pelo seu ID.

getAbsolutePath(nodeId): Gera o caminho completo de um nó até a raiz.

🤝 Contribuição
Sinta-se à vontade para explorar o código, sugerir melhorias ou relatar issues.
