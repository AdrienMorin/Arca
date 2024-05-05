<script>
import SearchComponent from "~/components/search/SearchComponent.vue";
import ResultsComponent from "~/components/search/ResultsComponent.vue";

definePageMeta({
  middleware: 'auth'
});

export default {
  components: {
    SearchComponent,
    ResultsComponent
  },
  data() {
    return {
      searchLinks: [
        { name: 'Rechercher', component: 'SearchComponent' },
        { name: 'Résultats de la recherche', component: 'ResultsComponent' },
      ],
      activeLink: 'SearchComponent',
      searchQuery: ''
    }
  },
  methods: {
    handleSearchEvent(query) {
      this.searchQuery = query;
      this.activeLink = 'ResultsComponent';
      console.log('search : ' + this.searchQuery);
    }
  }
}
</script>

<template>
  <div>
    <component :is="activeLink" @search-event="handleSearchEvent" :searchQuery="searchQuery"></component>
  </div>
</template>