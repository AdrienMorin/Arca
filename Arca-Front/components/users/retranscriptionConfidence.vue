<template>
  <div class="md:p-4 mx-auto max-w-lg my-12 mt-36 border-2 border-black p-4 rounded-lg  justify-center text-md">
    <span v-for="(word, index) in words" :key="index" :class="getColor(word)" contenteditable="true" @input="updateText">
      {{ getWord(word)+" " }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "$gIs $rgood $otoday"
    }
  },
  computed: {
    words() {
      return this.text.split(' ');
    }
  },
  methods: {
    getColor(word) {
      switch (word.charAt(1)) {
        case 'g':
          return 'text-black';
        case 'r':
          return 'text-red-500';
        case 'o':
          return 'text-orange-500';
        default:
          return 'text-black';
      }
    },
    getWord(word) {
      return word.substring(2);
    },
        updateText(event) {
      this.editableText = event.target.textContent;
    },
  }
}
</script>