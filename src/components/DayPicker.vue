<template>
  <picker-popup
    headingClickable
    :leftDisabled="leftDisabled"
    :rightDisabled="rightDisabled"
    @left="previousPage"
    @right="nextPage"
    @heading="$emit('back')"
  >
    <template #heading>{{ heading }}</template>
    <template #subheading>
      <span v-for="day in weekDays" :key="day"> {{ day }} </span>
    </template>
    <template #body>
      <button
        v-for="{ day, value, disabled, selected, key } in days"
        :class="{ selected }"
        :key="key"
        :disabled="disabled"
        @click.stop.prevent="$emit('select', value)"
      >
        <span>{{ day }}</span>
      </button>
    </template>
  </picker-popup>
</template>

<script setup="props, { emit }" lang="ts">
import { defineComponent, computed, ref, watchEffect, PropType } from 'vue'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  startOfWeek,
  endOfWeek,
  isSameDay,
  setDay,
  isWithinInterval,
  isBefore,
  isAfter,
  isSameMonth,
  endOfDay,
  startOfDay,
} from 'date-fns'
import { formatWithOptions } from 'date-fns/fp'
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
  headingFormat?: string
  weekdayFormat?: string
  locale?: Locale
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  lowerLimit?: Date
  upperLimit?: Date
}

const format = computed(() =>
  formatWithOptions({
    locale: props.locale,
    weekStartsOn: props.weekStartsOn ?? 1,
  })
)

declare const emit: (event: string, data?: any) => void

const monthStart = computed(() => startOfMonth(props.pageDate))
const monthEnd = computed(() => endOfMonth(props.pageDate))

const currentMonth = computed(() => ({
  start: monthStart.value,
  end: monthEnd.value,
}))
const displayedInterval = computed(() => ({
  start: startOfWeek(monthStart.value),
  end: endOfWeek(monthEnd.value),
}))

export const weekDays = computed(() => {
  const initial = props.weekStartsOn ?? 1
  const dayFormat = format.value(props.weekdayFormat ?? 'EE')

  return Array.from(Array(7))
    .map((_, i) => (initial + i) % 7)
    .map((v) =>
      setDay(new Date(), v, {
        weekStartsOn: props.weekStartsOn ?? 1,
      })
    )
    .map(dayFormat)
})

const isEnabled = (
  target: Date,
  lower: Date | undefined,
  upper: Date | undefined
): boolean => {
  if (!lower && !upper) return true
  if (lower && isBefore(target, startOfDay(lower))) return false
  if (upper && isAfter(target, endOfDay(upper))) return false
  return true
}

export const days = computed(() => {
  const dayFormat = format.value(props.format ?? 'dd')

  return eachDayOfInterval(displayedInterval.value).map((value) => ({
    value,
    day: dayFormat(value),
    selected: props.selected && isSameDay(props.selected, value),
    disabled:
      !isWithinInterval(value, currentMonth.value) ||
      !isEnabled(value, props.lowerLimit, props.upperLimit),
    key: format.value('yyyy-MM-dd', value),
  }))
})

export const heading = computed(() =>
  format.value(props.headingFormat ?? 'MMMM yyyy')(props.pageDate)
)

export const leftDisabled = computed(
  () =>
    props.lowerLimit &&
    (isSameMonth(props.lowerLimit, props.pageDate) ||
      isBefore(props.pageDate, props.lowerLimit))
)
export const rightDisabled = computed(
  () =>
    props.upperLimit &&
    (isSameMonth(props.upperLimit, props.pageDate) ||
      isAfter(props.pageDate, props.upperLimit))
)

export const previousPage = () =>
  emit('update:pageDate', subMonths(props.pageDate, 1))
export const nextPage = () =>
  emit('update:pageDate', addMonths(props.pageDate, 1))
</script>

<style></style>
