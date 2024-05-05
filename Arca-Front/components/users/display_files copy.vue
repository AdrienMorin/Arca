<template>
  <div class="flex flex-col items-center justify-centerw-full h-full   ">
    <div v-if="Audio">
      <div class="flex items-center justify-center">
              <audio controls>
              <source :src="fileUrl" type="audio/mpeg">
              Your browser does not support the audio element.
              </audio>
            </div>
    </div>
    <div v-else-if="Video" class="h-full w-full flex items-center justify-center">
      <div class=" ">
              <video controls class="min-w-1/2 min-h-1/2 w-auto h-auto object-contain">
                <source :src="fileUrl" type="video/mp4">
                Your browser does not support the video tag.
              </video>
              </div>
    </div>
    <div v-else-if="PDF" class="w-full h-full flex justify-center items-center">
      <embed :src="fileUrl" type="application/pdf" class="h-full w-full object-contain "/>
     
    </div>
    <div v-else-if="Photo" class="w-full h-full flex justify-center items-center overflow-auto ">
      <embed :src="fileUrl" type="image" class="object-contain max-h-full max-w-full min-h-1/2 border min-h-1/2" />
    </div>
    <!-- Add other cases for different file types if needed -->
    <div v-else>
      <p>Unsupported file type</p>
    </div>
  </div>
</template>

<script>
  import { useFileStore } from '~/fileTransfer.js';

export default {
  props: {
   
  },
  mounted() {
   // console.log('file:', this.file);
    this.getDocument();
    this.readFile();
  },
  data() {
    return {
      fileUrl: '',
      File:null,
      Audio: false,
      Video: false,
      PDF: false,
      Photo: false,
    };
  },
  methods: {
    getDocument() {
      console.log('Checking document for display...');
      const fileStore = useFileStore();
      const test=fileStore.getFile;
      this.File=test.content;
      this.titreDoc=test.name;
      console.log("displatfile",this.File.name);
      this.isAudio();
      this.isVideo();
      this.isPDF();
      this.isPhoto();
    },
    isAudio() {
    this.Audio=this.getFileExtension(this.File.name) === 'mp3';
    console.log(this.Audio);
    },
    isVideo() {
      this.Video=this.getFileExtension(this.File.name) === 'mp4';
      console.log(this.Video);
    },
    isPDF() {
      this.PDF=this.getFileExtension(this.File.name) === 'pdf';
      console.log(this.PDF);
    },
    // Add computed properties for other file types if needed
    isPhoto() {
      this.Photo=this.getFileExtension(this.File.name) === 'jpg' || this.getFileExtension(this.File.name) === 'jpeg' || this.getFileExtension(this.File.name) === 'png';
      console.log(this.Photo);
    },
    readFile() {
      console.log(this.File);
      console.log('reading file')
      const reader = new FileReader();
      reader.onload = (event) => {
      this.fileUrl = event.target.result;
      console.log('fileUrl:', this.fileUrl);
      };
      reader.readAsDataURL(this.File);
    },
    getFileExtension(filename) {
      return filename.split('.').pop().toLowerCase();
    }
  }
};
</script>
