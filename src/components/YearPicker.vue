<template>
  <picker-popup @left="previousPage" @right="nextPage">
    <template #heading>{{ heading }}</template>
    <template #body>
      <button
        v-for="{ year, value } in years"
        :key="year"
        @click.stop.prevent="$emit('select', value)"
      >
        {{ year }}
      </button>
    </template>
  </picker-popup>
</template>

<script setup="props, { emit }" lang="ts">
import { defineComponent, computed, ref, watchEffect, PropType } from 'vue'
import {
  startOfDecade,
  endOfDecade,
  eachYearOfInterval,
  getYear,
  subYears,
  addYears,
} from 'date-fns'
import PickerPopup from './PickerPopup.vue'

export default {
  components: {
    PickerPopup,
  },
}

declare const props: {
  /**
   * Currently selected date, needed for highlighting
   */
  selected?: Date
  pageDate: Date
}
declare const emit: (event: string, data?: any) => void

const from = computed(() => startOfDecade(props.pageDate))
const to = computed(() => endOfDecade(props.pageDate))

export const years = computed(() =>
  eachYearOfInterval({
    start: from.value,
    end: to.value,
  }).map((value) => ({
    value,
    year: getYear(value),
    selected: props.selected && getYear(value) === getYear(props.selected)
  }))
)

export const heading = computed(() => {
  const start = getYear(from.value)
  const end = getYear(to.value)

  return `${start} - ${end}`
})

export const previousPage = () =>
  emit('update:pageDate', subYears(props.pageDate, 10))
export const nextPage = () =>
  emit('update:pageDate', addYears(props.pageDate, 10))
</script>
