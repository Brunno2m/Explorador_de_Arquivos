

---

<div align="center">
  <h1>📁 Explorador de Arquivos</h1>
  <p>
    <strong>Simule um explorador de arquivos moderno, visual e interativo no seu navegador!</strong>
  </p>
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/HTML5-e34f26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572b6?style=for-the-badge&logo=css3&logoColor=white" />
</div>

---

## 🚀 Funcionalidades

- **Criação de Pastas e Arquivos:** Adicione itens à estrutura hierárquica facilmente.
- **Visualização em Árvore:** Veja arquivos e pastas organizados, com ícones intuitivos.
- **Remoção de Itens:** Exclua pastas ou arquivos da árvore com um clique.
- **Exibição de Caminho Absoluto:** Veja o caminho completo de qualquer item.
- **Seleção Interativa:** Selecione e interaja com qualquer elemento da árvore.

---

## ✨ Tecnologias Utilizadas

- **TypeScript**: Lógica e estrutura de dados
- **HTML5**: Interface do usuário
- **CSS3**: Visual moderno e responsivo
- **Node.js & npm**: Execução e gerenciamento de dependências
- **live-server**: Servidor local com recarregamento automático
- **tsc**: Compilador TypeScript

---

## 🏗️ Estrutura do Projeto

```plaintext
explorador-arquivos/
├── public/
│   ├── index.html
│   └── style.css
├── src/
│   ├── app.ts
│   ├── file-manager.ts
│   └── tree.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Como Rodar

1. **Pré-requisitos:**  
   Tenha o [Node.js](https://nodejs.org/) instalado.

2. **Clone o repositório:**
   ```bash
   git clone https://github.com/Brunno2m/Explorador_de_Arquivos.git
   cd Explorador_de_Arquivos
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o projeto:**
   ```bash
   npm start
   ```
   O projeto abrirá no navegador em [http://127.0.0.1:8080](http://127.0.0.1:8080).

---

## 💡 Estrutura de Dados

A lógica central está em `src/tree.ts`:

- **Interface `TreeNode`:** Estrutura de cada nó (id, nome, tipo, filhos, pai).
- **Classe `FileTree`:** Gerencia a árvore com métodos para adicionar, remover, buscar e obter caminhos absolutos.

---




