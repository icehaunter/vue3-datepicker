<template>
  <picker-popup
    headingClickable
    :columnCount="3"
    :items="months"
    :leftDisabled="leftDisabled"
    :rightDisabled="rightDisabled"
    @left="previousPage"
    @right="nextPage"
    @heading="$emit('back')"
    @elementClick="$emit('select', $event)"
  >
    <template #heading>{{ heading }}</template>
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
  isBefore,
  isAfter,
  isSameYear,
  startOfMonth,
  endOfMonth,
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
  lowerLimit?: Date
  upperLimit?: Date
}

declare const emit: (event: string, data?: any) => void

const from = computed(() => startOfYear(props.pageDate))
const to = computed(() => endOfYear(props.pageDate))

const isEnabled = (target: Date, lower: Date | undefined, upper: Date | undefined) : boolean => {
  if (!lower && !upper) return true
  if (lower && isBefore(target, startOfMonth(lower))) return false
  if (upper && isAfter(target, endOfMonth(upper))) return false
  return true
}


export const months = computed(() =>
  eachMonthOfInterval({
    start: from.value,
    end: to.value,
  }).map((value) => ({
    value,
    display: format(value, props.format ?? 'MMM'),
    key: format(value, props.format ?? 'MMM'),
    selected: props.selected && isSameMonth(props.selected, value),
    disabled: !isEnabled(value, props.lowerLimit, props.upperLimit)
  }))
)

export const heading = computed(() => getYear(from.value))

export const leftDisabled = computed(
  () =>
    props.lowerLimit &&
    (isSameYear(props.lowerLimit, props.pageDate) ||
      isBefore(props.pageDate, props.lowerLimit))
)
export const rightDisabled = computed(
  () =>
    props.upperLimit &&
    (isSameYear(props.upperLimit, props.pageDate) ||
      isAfter(props.pageDate, props.upperLimit))
)


export const previousPage = () =>
  emit('update:pageDate', subYears(props.pageDate, 1))
export const nextPage = () =>
  emit('update:pageDate', addYears(props.pageDate, 1))
</script>
