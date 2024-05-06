<template>
<div class="flex flex-col items-center justify-center gap-6">
  <div class="w-full h-1/3" v-show="ismp3"></div>
    <MicrophoneIcon class="w-1/5 h-1/5 text-black-700" v-show="ismp3"></MicrophoneIcon>
    <div v-html="fileTag" v-show="ismp3"></div>
    <div v-html="fileTag" class="flex justify-center items-center" v-show="!ismp3"></div>

</div>
   
</template>

<script>
import { MicrophoneIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    MicrophoneIcon
  },
  props: {
    filePath: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      ismp3:this.getFileExtension(this.filePath) === 'mp3'
        };
  },
  computed: {
    fileTag() {
      ismp3:this.getFileExtension(this.filePath) === 'mp3';
      console.log(this.ismp3);
      return this.getFileTag(this.filePath);
    }
  },
  methods: {
    getFileTag(filePath) {
      const extension = filePath.split('.').pop().toLowerCase();
      let tag = '';

      switch(extension) {

        case 'mp4':
            tag = `<div class="flex items-center justify-center border border-black border-2 w-2/3 h-2/3 mt-0">
              <video controls class="w-full h-full object-contain">
                <source src="${filePath}" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              </div>`;
          break;
        case 'mp3':
            tag = `<div class="flex items-center justify-center">
              <audio controls>
              <source src="${filePath}" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
            </div>`;
          break;
        case 'pdf':
            case 'pdf':
                tag = `
                <embed src="${filePath}" type="application/pdf" class="h-full w-full object-contain" style="width:100%; height:100vh;" />`;
              break;
          break;
        case 'doc':
        case 'docx':
          const pdfPath = filePath.replace('.docx', '.pdf');
          tag = `<embed src="${pdfPath}" type="application/pdf" class="h-full w-full object-contain" style="width:100%; height:100vh;" />`;
          break;
        case 'xls':
        case 'xlsx':
        case 'csv':
          tag = `
            `;
          break;
        case 'jpg':
          tag = `<div class="flex items-center justify-center" style="max-height:100%">
                    <img src="${filePath}" alt="image" style="max-height:100%; overflow:auto;">
                </div>`;
          break;
        break;
      
        default:
          tag = `<p>Unsupported file type: ${extension}</p>`;
      }
      return tag;
      
    },
    getFileExtension(filePath) {
      return filePath.split('.').pop().toLowerCase();
    },
    
  }
}
</script>
