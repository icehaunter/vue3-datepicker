<template>
  <picker-popup
    @left="previousPage"
    @right="nextPage"
    :columnCount="3"
    :leftDisabled="leftDisabled"
    :rightDisabled="rightDisabled"
  >
    <template #heading>{{ heading }}</template>
    <template #body>
      <button
        v-for="{ year, value, disabled } in years"
        :key="year"
        :disabled="disabled"
        @click.stop.prevent="$emit('select', value)"
      >
        <span>{{ year }}</span>
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
  isAfter,
  isBefore,
  getDecade,
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
  lowerLimit?: Date
  upperLimit?: Date
}
declare const emit: (event: string, data?: any) => void

const from = computed(() => startOfDecade(props.pageDate))
const to = computed(() => endOfDecade(props.pageDate))

const isEnabled = (target: Date, lower: Date | undefined, upper: Date | undefined) : boolean => {
  if (!lower && !upper) return true
  if (lower && getYear(target) < getYear(lower)) return false
  if (upper && getYear(target) > getYear(upper)) return false
  return true
}

export const years = computed(() =>
  eachYearOfInterval({
    start: from.value,
    end: to.value,
  }).map((value) => ({
    value,
    year: getYear(value),
    selected: props.selected && getYear(value) === getYear(props.selected),
    disabled: !isEnabled(value, props.lowerLimit, props.upperLimit)
  }))
)

export const heading = computed(() => {
  const start = getYear(from.value)
  const end = getYear(to.value)

  return `${start} - ${end}`
})

export const leftDisabled = computed(
  () =>
    props.lowerLimit &&
    (getDecade(props.lowerLimit) === getDecade(props.pageDate) ||
      isBefore(props.pageDate, props.lowerLimit))
)
export const rightDisabled = computed(
  () =>
    props.upperLimit &&
    (getDecade(props.upperLimit) === getDecade(props.pageDate) ||
      isAfter(props.pageDate, props.upperLimit))
)

export const previousPage = () =>
  emit('update:pageDate', subYears(props.pageDate, 10))
export const nextPage = () =>
  emit('update:pageDate', addYears(props.pageDate, 10))
</script>
