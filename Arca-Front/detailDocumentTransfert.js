import { defineStore } from 'pinia';

export const useFileStore = defineStore({
  id: 'detail', // Unique identifier for the store
  state: () => ({
    file:{
      name: '',
      content: null,
      metadata: {
        _id: string,
        name: string,
        creator: string,
        createdAt: Date,
        updatedAt: Date,
        updatedBy: string,
        description: string,
        retranscription: string,
        date: Date,
        endDate: Date,
        people: string,
        categories: string,
        towns: string,
        score: number,
        filename: string
      }
    },
  }),
  actions: {
    setFile(file, metadata) {
      this.file = {
        name: file.name,
        content: file,
        metadata: metadata
      };
      console.log('file set');
    },
    clearFile() {
      this.file = {
        name: '',
        content: null,
        metadata: null
      };
    },
  },
  getters: {
    getFile: state => state.file,
    getMetadata: state => state.file.metadata,
    getFilename: state => state.file.name
  }
});
