

<template>
  <UPopover :popper="{ placement: 'bottom-start' }" class="mb-5">
    <UButton icon="i-heroicons-calendar-days-20-solid">
      {{ format(selected.start, 'd MMM, yyy') }} - {{ format(selected.end, 'd MMM, yyy') }}
    </UButton>

    <template #panel="{ close }">
      <div class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
        <DatePicker v-model="selected" @click="getDatePicker()" @close="close" class="w-full" />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">

import { sub, format, isSameDay, type Duration, setDate } from 'date-fns'
import { ref, defineProps, defineEmits, onMounted } from 'vue'
const selected = ref({ start: sub(new Date(), { days: 14 }), end: new Date() })
import DatePicker from "~/components/users/DatePicker.vue";

const props = defineProps<{
  start?: Date,
  end?: Date
}>()

onMounted(() => {
  // Set the selected value based on the start and end props
  if (props.start && props.end) {
    selected.value = { start: props.start, end: props.end };
  }
})

function isRangeSelected(duration: Duration) {
  return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date())
}

function selectRange(duration: Duration) {
  selected.value = { start: sub(new Date(), duration), end: new Date() }
}

const emit = defineEmits(['search-event'])

function emitSearchEvent() {
  emit('search-event', selected.value);
  close
}

function setDateRange(start,end) {
  selected.value = { start: start, end: end };
  console.log('selected-range emitted',selected.value);
}

function getDatePicker() {
  // Emit the 'selected-range' event with the current selected value
  emit('selected-range', selected.value);
  console.log('selected-range emitted',selected.value);
}
</script>