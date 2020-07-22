<template>
  <picker-popup
    headingClickable
    :columnCount="3"
    @left="previousPage"
    @right="nextPage"
    @heading="$emit('back')"
  >
    <template #heading>{{ heading }}</template>
    <template #body>
      <button
        v-for="{ month, value } in months"
        :key="month"
        @click.stop.prevent="$emit('select', value)"
      >
        <span>{{ month }}</span>
      </button>
    </template>
  </picker-popup>
</template>

<script setup="props, { emit }" lang="ts">
import { defineComponent, computed, ref, watchEffect, PropType } from 'vue'
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  getMonth,
  getYear,
  subYears,
  addYears,
  format,
  isSameMonth,
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
  format?: string
}

declare const emit: (event: string, data?: any) => void

const from = computed(() => startOfYear(props.pageDate))
const to = computed(() => endOfYear(props.pageDate))

export const months = computed(() =>
  eachMonthOfInterval({
    start: from.value,
    end: to.value,
  }).map((value) => ({
    value,
    month: format(value, props.format ?? 'MMM'),
    selected: props.selected && isSameMonth(props.selected, value),
  }))
)

export const heading = computed(() => getYear(from.value))

export const previousPage = () =>
  emit('update:pageDate', subYears(props.pageDate, 1))
export const nextPage = () =>
  emit('update:pageDate', addYears(props.pageDate, 1))
</script>
