// app.ts

import { FileTree, TreeNode, NodeType } from './tree.js';

// Referências aos elementos do DOM
const treeDisplay = document.getElementById('treeDisplay') as HTMLDivElement;
const nodeNameInput = document.getElementById('nodeNameInput') as HTMLInputElement;
const nodeTypeSelect = document.getElementById('nodeTypeSelect') as HTMLSelectElement;
const addNodeBtn = document.getElementById('addNodeBtn') as HTMLButtonElement;
const removeNodeBtn = document.getElementById('removeNodeBtn') as HTMLButtonElement;
const absolutePathSpan = document.getElementById('absolutePath') as HTMLSpanElement;

// Instância da nossa árvore de arquivos
const fileTree = new FileTree();
let selectedNodeId: string | null = null; // ID do nó selecionado atualmente

/**
 * Renderiza a árvore recursivamente no DOM.
 * @param node O nó atual a ser renderizado.
 * @param parentElement O elemento pai no DOM onde o nó será adicionado.
 * @param depth A profundidade do nó na árvore (para indentação).
 */
function renderTree(node: TreeNode, parentElement: HTMLElement, depth: number = 0) {
    const nodeElement = document.createElement('div');
    nodeElement.className = `tree-node ${node.type} ${node.id === 'root' ? 'root-node' : ''}`;
    nodeElement.dataset.nodeId = node.id;
    nodeElement.style.paddingLeft = `${depth * 20}px`; // Indentação

    const iconSpan = document.createElement('span');
    iconSpan.className = 'tree-node-icon';
    nodeElement.appendChild(iconSpan);

    const nameSpan = document.createElement('span');
    nameSpan.className = 'tree-node-name';
    nameSpan.textContent = node.name;
    nodeElement.appendChild(nameSpan);

    nodeElement.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que o clique se propague para elementos pai
        selectNode(node.id);
    });

    parentElement.appendChild(nodeElement);

    if (node.children && node.children.length > 0) {
        // Criar um container para os filhos para melhor controle visual, se necessário
        // Ou simplesmente renderizar diretamente, como está agora
        node.children.forEach(child => renderTree(child, parentElement, depth + 1));
    }
}

/**
 * Atualiza a exibição completa da árvore.
 */
function refreshTreeDisplay() {
    treeDisplay.innerHTML = ''; // Limpa a exibição atual
    renderTree(fileTree.root, treeDisplay);
    updateAbsolutePath(); // Atualiza o caminho após a renderização
    updateRemoveButtonState(); // Atualiza o estado do botão de remover
}

/**
 * Seleciona um nó na interface.
 * @param nodeId O ID do nó a ser selecionado.
 */
function selectNode(nodeId: string) {
    // Remove a seleção de nós anteriores
    document.querySelectorAll('.tree-node.selected').forEach(el => {
        el.classList.remove('selected');
    });

    const newNodeElement = document.querySelector(`.tree-node[data-node-id="${nodeId}"]`);
    if (newNodeElement) {
        newNodeElement.classList.add('selected');
        selectedNodeId = nodeId;
    } else {
        selectedNodeId = null; // Caso o nó selecionado não exista mais
    }
    updateAbsolutePath();
    updateRemoveButtonState();
}

/**
 * Atualiza o texto do caminho absoluto com base no nó selecionado.
 */
function updateAbsolutePath() {
    if (selectedNodeId) {
        const path = fileTree.getAbsolutePath(selectedNodeId);
        absolutePathSpan.textContent = path || 'Nó não encontrado.';
    } else {
        absolutePathSpan.textContent = 'Nenhum nó selecionado.';
    }
}

/**
 * Atualiza o estado do botão "Remover Selecionado".
 * Habilita se um nó diferente da raiz estiver selecionado.
 */
function updateRemoveButtonState() {
    removeNodeBtn.disabled = !selectedNodeId || selectedNodeId === 'root';
}

// --- Event Listeners ---

addNodeBtn.addEventListener('click', () => {
    const nodeName = nodeNameInput.value.trim();
    const nodeType = nodeTypeSelect.value as NodeType;

    if (!nodeName) {
        alert('Por favor, insira um nome para o arquivo/pasta.');
        return;
    }

    // Se nenhum nó estiver selecionado, adiciona à raiz por padrão
    const parentId = selectedNodeId || fileTree.root.id;

    const newNode = fileTree.addNode(parentId, nodeName, nodeType);
    if (newNode) {
        nodeNameInput.value = ''; // Limpa o input
        refreshTreeDisplay();
        selectNode(newNode.id); // Seleciona o nó recém-criado
    } else {
        alert('Não foi possível criar o nó. Verifique se a pasta pai existe.');
    }
});

removeNodeBtn.addEventListener('click', () => {
    if (selectedNodeId && selectedNodeId !== 'root') {
        const nodeToRemove = fileTree.findNodeById(selectedNodeId);
        if (nodeToRemove) {
            if (confirm(`Tem certeza que deseja remover "${nodeToRemove.name}"?`)) {
                fileTree.removeNode(selectedNodeId);
                selectedNodeId = null; // Limpa a seleção após remoção
                refreshTreeDisplay();
            }
        }
    } else {
        alert('Por favor, selecione uma pasta ou arquivo para remover (a raiz não pode ser removida).');
    }
});

// Inicializa a exibição da árvore ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    refreshTreeDisplay();
    // Seleciona a raiz por padrão ao carregar
    selectNode(fileTree.root.id);
});

// Define o nó raiz como inicialmente selecionado e exibe seu caminho
selectNode(fileTree.root.id);