import { defineStore } from 'pinia';

export const useFileStore = defineStore({
  id: 'file', // Unique identifier for the store
  state: () => ({
    file:{
      name: '',
      content: null,
    },
  }),
  actions: {
    setFile(file) {
      this.file = {
        name: file.name,
        content: file,
      };
      console.log('file set');
    },
    clearFile() {
      this.file = {
        name: '',
        content: null,
      };
    },
  },
  getters: {
    getFile: state => state.file,

  }
});
