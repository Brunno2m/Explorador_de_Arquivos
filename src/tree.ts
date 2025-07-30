// tree.ts

/**
 * Define o tipo de um nó na árvore. Pode ser 'folder' (pasta) ou 'file' (arquivo).
 */
export type NodeType = 'folder' | 'file';

/**
 * Interface que representa um nó na árvore.
 */
export interface TreeNode {
    id: string; // ID único para o nó
    name: string; // Nome do arquivo ou pasta
    type: NodeType; // Tipo do nó ('folder' ou 'file')
    children?: TreeNode[]; // Filhos do nó (apenas para pastas)
    parent?: TreeNode; // Referência ao nó pai
}

/**
 * Classe que implementa a estrutura de dados de uma árvore.
 */
export class FileTree {
    root: TreeNode; // O nó raiz da árvore

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
    addNode(parentId: string, name: string, type: NodeType): TreeNode | null {
        const parentNode = this.findNodeById(parentId);

        if (!parentNode || parentNode.type !== 'folder') {
            console.error('Pai não encontrado ou não é uma pasta.');
            return null;
        }

        if (!parentNode.children) {
            parentNode.children = [];
        }

        const newNode: TreeNode = {
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
    removeNode(nodeId: string): boolean {
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
    findNodeById(id: string, currentNode: TreeNode = this.root): TreeNode | null {
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
    getAbsolutePath(nodeId: string): string | null {
        let currentNode = this.findNodeById(nodeId);
        if (!currentNode) {
            return null;
        }

        const path: string[] = [];
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
    private generateUniqueId(): string {
        return Math.random().toString(36).substring(2, 9);
    }
}