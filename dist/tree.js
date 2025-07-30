// tree.ts
/**
 * Classe que implementa a estrutura de dados de uma árvore.
 */
export class FileTree {
    constructor() {
        // Inicializa a árvore com uma pasta raiz padrão
        this.root = {
            id: 'root',
            name: 'Root',
            type: 'folder',
            children: []
        };
    }
    /**
     * Adiciona um novo nó (arquivo ou pasta) a um nó pai específico.
     * @param parentId O ID do nó pai onde o novo nó será adicionado.
     * @param name O nome do novo arquivo/pasta.
     * @param type O tipo do novo nó ('folder' ou 'file').
     * @returns O novo nó criado, ou null se o pai não for encontrado ou não for uma pasta.
     */
    addNode(parentId, name, type) {
        const parentNode = this.findNodeById(parentId);
        if (!parentNode || parentNode.type !== 'folder') {
            console.error('Pai não encontrado ou não é uma pasta.');
            return null;
        }
        if (!parentNode.children) {
            parentNode.children = [];
        }
        const newNode = {
            id: this.generateUniqueId(),
            name,
            type,
            parent: parentNode
        };
        if (type === 'folder') {
            newNode.children = [];
        }
        parentNode.children.push(newNode);
        return newNode;
    }
    /**
     * Remove um nó da árvore.
     * @param nodeId O ID do nó a ser removido.
     * @returns True se o nó foi removido com sucesso, false caso contrário.
     */
    removeNode(nodeId) {
        const nodeToRemove = this.findNodeById(nodeId);
        if (!nodeToRemove || !nodeToRemove.parent) {
            console.error('Nó não encontrado ou é o nó raiz.');
            return false;
        }
        const parentChildren = nodeToRemove.parent.children;
        if (parentChildren) {
            nodeToRemove.parent.children = parentChildren.filter(child => child.id !== nodeId);
            return true;
        }
        return false;
    }
    /**
     * Encontra um nó na árvore pelo seu ID (utiliza busca em profundidade - DFS).
     * @param id O ID do nó a ser encontrado.
     * @param currentNode O nó atual sendo visitado (para recursão, padrão é a raiz).
     * @returns O nó encontrado, ou null se não for encontrado.
     */
    findNodeById(id, currentNode = this.root) {
        if (currentNode.id === id) {
            return currentNode;
        }
        if (currentNode.children) {
            for (const child of currentNode.children) {
                const found = this.findNodeById(id, child);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }
    /**
     * Retorna o caminho absoluto de um nó na árvore.
     * @param nodeId O ID do nó para o qual o caminho será gerado.
     * @returns O caminho absoluto como uma string (ex: "Root/Documents/MyFile.txt"), ou null se o nó não for encontrado.
     */
    getAbsolutePath(nodeId) {
        let currentNode = this.findNodeById(nodeId);
        if (!currentNode) {
            return null;
        }
        const path = [];
        while (currentNode) {
            path.unshift(currentNode.name);
            // ALtere esta linha:
            // currentNode = currentNode.parent;
            // Para:
            currentNode = currentNode.parent ?? null; // Garante que se for undefined, vira null
        }
        return path.join('/');
    }
    /**
     * Gera um ID único simples para novos nós.
     * Poderia ser mais robusto em um ambiente de produção (UUIDs, etc.).
     */
    generateUniqueId() {
        return Math.random().toString(36).substring(2, 9);
    }
}
//# sourceMappingURL=tree.js.map