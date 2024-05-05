<script>
import SearchComponent from "~/components/search/SearchComponent.vue";
import ResultsComponent from "~/components/search/ResultsComponent.vue";
import DetailDocument from "~/components/search/DetailDocument.vue";

definePageMeta({
  middleware: 'auth'
});

export default {
  components: {
    SearchComponent,
    ResultsComponent,
    DetailDocument
  },
  data() {
    return {
      searchLinks: [
        { name: 'Rechercher', component: 'SearchComponent' },
        { name: 'Résultats de la recherche', component: 'ResultsComponent' },
        { name: 'Détail du document', component: 'DetailDocument'}
      ],
      activeLink: 'SearchComponent',
      searchQuery: '',
      docName: ''
    }
  },
  methods: {
    handleSearchEvent(query) {
      this.searchQuery = query;
      this.activeLink = 'ResultsComponent';
      console.log('search : ' + this.searchQuery);
    },
    handleDetailDocumentEvent(name) {
      this.docName = name;
      this.activeLink = 'DetailDocument';
      console.log('docName : ' + this.docName);
    },
    handleShowSearchResult() {
      this.activeLink = 'ResultsComponent';
    }
  }
}
</script>


<template>
  <div>
    <component :is="activeLink" @search-event="handleSearchEvent" @detail-event="handleDetailDocumentEvent" @showSearchResult-event="handleShowSearchResult" :nomDoc="docName" :searchQuery="searchQuery"></component>
  </div>
</template>