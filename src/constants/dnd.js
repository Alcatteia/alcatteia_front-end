// src/constants/dnd.js

/**
 * Tipos de itens para drag and drop
 */
export const ItemTypes = {
  TASK: 'task',          // Para arrastar tarefas
  CATEGORY: 'category',  // Para arrastar categorias (se necessário)
  CARD: 'card'           // Alternativa genérica
};

/**
 * Configurações do DnD
 */
export const DnDConfig = {
  // Sensibilidade para dispositivos touch
  touch: {
    delay: 200,
    enableTouchEvents: true
  },
  // Configurações para mouse
  mouse: {
    enableMouseEvents: true
  }
};