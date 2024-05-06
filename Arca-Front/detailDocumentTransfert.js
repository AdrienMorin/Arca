import { defineStore } from 'pinia';

export const useFileStore = defineStore({
  id: 'detail', // Unique identifier for the store
  state: () => ({
    file:{
      name: '',
      content: null,
      metadata: {
        _id: '',
        name: '',
        creator: '',
        createdAt: null,
        updatedAt: null,
        updatedBy: '',
        description: '',
        retranscription: '',
        date: null,
        endDate: null,
        people: '',
        categories: '',
        towns: '',
        score: null,
        filename: null
      }
    },
  }),
  actions: {
    setFile(file, metadata) {
      this.file = {
        name: file.name,
        content: file,
        metadata: {
          _id: metadata._id,
          name: metadata.name,
          creator: metadata.creator,
          createdAt: metadata.createdAt,
          updatedAt: metadata.updatedAt,
          updatedBy: metadata.updatedBy,
          description: metadata.description,
          retranscription: metadata.retranscription,
          date: metadata.date,
          endDate: metadata.endDate,
          people: metadata.people,
          categories: metadata.categories,
          towns: metadata.towns,
          score: metadata.score,
          filename: metadata.filename
        }
      };
      console.log('file set: ', this.file);
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
  }
});
