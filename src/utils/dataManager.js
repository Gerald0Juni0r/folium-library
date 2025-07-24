// Utilitário para gerenciar persistência e backup de dados do usuário

// Chaves do localStorage
const STORAGE_KEYS = {
  USER: "folium-usuario",
  LISTS: "folium-listas",
  BACKUP: "folium-backup",
};

// Salva listas com backup automático
export const saveLists = (lists, userId) => {
  try {
    const dataToSave = {
      lists,
      userId,
      timestamp: new Date().toISOString(),
    };
    
    // Salva dados principais
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(lists));
    
    // Cria backup com timestamp
    localStorage.setItem(STORAGE_KEYS.BACKUP, JSON.stringify(dataToSave));
    
    return true;
  } catch (error) {
    console.error("Erro ao salvar listas:", error);
    return false;
  }
};

// Carrega listas com fallback para backup
export const loadLists = (userId) => {
  try {
    // Tenta carregar dados principais
    const listsData = localStorage.getItem(STORAGE_KEYS.LISTS);
    
    if (listsData) {
      return JSON.parse(listsData);
    }
    
    // Fallback: tenta carregar do backup
    const backupData = localStorage.getItem(STORAGE_KEYS.BACKUP);
    if (backupData) {
      const backup = JSON.parse(backupData);
      
      // Verifica se o backup é do mesmo usuário
      if (backup.userId === userId) {
        console.log("Dados restaurados do backup");
        return backup.lists;
      }
    }
    
    // Retorna estrutura vazia se não há dados
    return {
      "quero-ler": [],
      lido: [],
      favorito: [],
    };
  } catch (error) {
    console.error("Erro ao carregar listas:", error);
    // Retorna estrutura vazia em caso de erro
    return {
      "quero-ler": [],
      lido: [],
      favorito: [],
    };
  }
};

// Limpa todos os dados do usuário
export const clearUserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.LISTS);
    localStorage.removeItem(STORAGE_KEYS.BACKUP);
    return true;
  } catch (error) {
    console.error("Erro ao limpar dados:", error);
    return false;
  }
};

// Exporta dados para download (funcionalidade futura)
export const exportUserData = (userId) => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    const listsData = localStorage.getItem(STORAGE_KEYS.LISTS);
    
    if (!userData || !listsData) {
      throw new Error("Dados não encontrados");
    }
    
    const exportData = {
      user: JSON.parse(userData),
      lists: JSON.parse(listsData),
      exportDate: new Date().toISOString(),
      version: "1.0",
    };
    
    return exportData;
  } catch (error) {
    console.error("Erro ao exportar dados:", error);
    return null;
  }
};

// Importa dados de backup (funcionalidade futura)
export const importUserData = (importData) => {
  try {
    if (!importData.user || !importData.lists) {
      throw new Error("Formato de dados inválido");
    }
    
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(importData.user));
    localStorage.setItem(STORAGE_KEYS.LISTS, JSON.stringify(importData.lists));
    
    return true;
  } catch (error) {
    console.error("Erro ao importar dados:", error);
    return false;
  }
};
