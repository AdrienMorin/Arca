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
          <tr v-for="(item, index) in documents" :key="index" @click="handleRowClick(item.id)">
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
import { useFileStore } from "~/detailDocumentTransfert.js";
import { useRouter } from 'vue-router';

export default {
  setup() {
    const documents = ref([]);
    const router = useRouter();
    let metadata = "";

    const fetchDocuments = async () => {
      try {
        const tokenCookie = useCookie('token');
        const token = tokenCookie.value;
        console.log("ok")
        documents.value = await DocumentService.getInstance().getDocuments(token);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }

    const handleRowClick = async (id) => {
      try {
        const tokenCookie = useCookie('token');
        const token = tokenCookie.value;
        metadata = await DocumentService.getInstance().getDocumentById(token, id);
        console.log('Document Metadata:', metadata);
        fileDownloadAndTransfer();
        router.push('/ModifDocument');
      } catch (error) {
        console.error('Error fetching document metadata:', error);
      }
    }

    const fileDownloadAndTransfer = async () =>{
      // mettre un argument filename et get le fichier sur s3
      // Mettre le file et sa metadata dans le store
      console.log('File download and transfer initiated...');
      let response = metadata;
      console.log(response)
      
      // Store in pinia
      const fileStore = useFileStore();
      console.log('reading file from url');
      console.log("pretest")
      const fileFetched = await fetch('/_nuxt/temp/'+response.filename)
      console.log("test")
      console.log('file read frorrrrrm url', fileFetched);
      const blob = await fileFetched.blob()
      console.log(blob)
      const file = new File([blob], response.filename, {type: blob.type});
      console.log(file)
      console.log('fileCreated:', file);

      // ou utiliser l'action setFile
      fileStore.setFile(file, response);
      const test=fileStore.getFile;
      const testmeta=fileStore.getMetadata;
      console.log('testname : ',test);
      console.log('testmetadata : ',testmeta);
    }

    onMounted(fetchDocuments);

    return {
      documents,
      fetchDocuments,
      handleRowClick,
      fileDownloadAndTransfer
    };
  }
};
</script>