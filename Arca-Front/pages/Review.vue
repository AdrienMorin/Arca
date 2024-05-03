<template>
  <div class="w-full flex justify-center mt-14">
    <div class="w-4/5">
      <table class="table-auto w-full text-left">
        <thead>
          <tr class="bg-gray-100">
            <th class="w-1/5 px-4 py-2">Type</th>
            <th class="w-1/5 px-4 py-2">Titre</th>
            <th class="w-1/5 px-4 py-2">Lieu</th>
            <th class="w-1/5 px-4 py-2">Personnes</th>
            <th class="w-1/5 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in documents" :key="index">
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.extension }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.name }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.villes.join(', ') }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.personnes.join(', ') }}</td>
            <td class="border px-4 py-2 truncate max-w-xs">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DocumentService from '~/services/documentController';

export default {
  setup () {
    const documents = ref([]);

    const fetchDocuments = async () => {
      try {
        const tokenCookie = useCookie('token');
        const token = tokenCookie.value;
        documents.value = await DocumentService.getInstance().getDocuments(token);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }

    onMounted(fetchDocuments);

    return {
      documents,
      fetchDocuments
    };
  }
}
</script>
