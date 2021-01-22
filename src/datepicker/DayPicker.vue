<template>
  <picker-popup
    headingClickable
    :leftDisabled="leftDisabled"
    :rightDisabled="rightDisabled"
    :items="days"
    @left="previousPage"
    @right="nextPage"
    @heading="$emit('back')"
    @elementClick="$emit('select', $event)"
  >
    <template #heading>{{ heading }}</template>
    <template #subheading>
      <span v-for="day in weekDays" :key="day"> {{ day }} </span>
    </template>
  </picker-popup>
</template>

<script lang="ts">
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
  isValid,
} from 'date-fns'
import { formatWithOptions } from 'date-fns/fp'
import PickerPopup from './PickerPopup.vue'

export default defineComponent({
  components: {
    PickerPopup,
  },
  emits: {
    'update:pageDate': (date: Date) => isValid(date),
    select: (date: Date) => isValid(date),
    back: () => true,
  },
  props: {
    selected: {
      type: Date as PropType<Date>,
      required: false,
    },
    pageDate: {
      type: Date as PropType<Date>,
      required: true,
    },
    format: {
      type: String,
      required: false,
      default: 'dd',
    },
    headingFormat: {
      type: String,
      required: false,
      default: 'LLLL yyyy',
    },
    weekdayFormat: {
      type: String,
      required: false,
      default: 'EE',
    },
    locale: {
      type: Object as PropType<Locale>,
      required: false,
    },
    weekStartsOn: {
      type: Number as PropType<1 | 2 | 3 | 4 | 5 | 6 | 0>,
      required: false,
      default: 1,
      validator: (i: unknown): boolean =>
        typeof i === 'number' && Number.isInteger(i) && i >= 0 && i <= 6,
    },
    lowerLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
    upperLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
    disabledDates: {
      type: Object as PropType<{ dates?: Date[] }>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const format = computed(() =>
      formatWithOptions({
        locale: props.locale,
        weekStartsOn: props.weekStartsOn,
      })
    )

    const monthStart = computed(() => startOfMonth(props.pageDate))
    const monthEnd = computed(() => endOfMonth(props.pageDate))
    const currentMonth = computed(() => ({
      start: monthStart.value,
      end: monthEnd.value,
    }))

    const displayedInterval = computed(() => ({
      start: startOfWeek(monthStart.value, {
        weekStartsOn: props.weekStartsOn,
      }),
      end: endOfWeek(monthEnd.value, {
        weekStartsOn: props.weekStartsOn,
      }),
    }))

    const weekDays = computed(() => {
      const initial = props.weekStartsOn
      const dayFormat = format.value(props.weekdayFormat)
      return Array.from(Array(7))
        .map((_, i) => (initial + i) % 7)
        .map((v) =>
          setDay(new Date(), v, {
            weekStartsOn: props.weekStartsOn,
          })
        )
        .map(dayFormat)
    })

    const isEnabled = (
      target: Date,
      lower?: Date,
      upper?: Date,
      disabledDates?: { dates?: Date[] }
    ): boolean => {
      if (disabledDates?.dates?.some(date => isSameDay(target, date))) return false
      if (!lower && !upper) return true
      if (lower && isBefore(target, startOfDay(lower))) return false
      if (upper && isAfter(target, endOfDay(upper))) return false
      return true
    }

    const days = computed(() => {
      const dayFormat = format.value(props.format)
      return eachDayOfInterval(displayedInterval.value).map((value) => ({
        value,
        display: dayFormat(value),
        selected: props.selected && isSameDay(props.selected, value),
        disabled:
          !isWithinInterval(value, currentMonth.value) ||
          !isEnabled(value, props.lowerLimit, props.upperLimit, props.disabledDates),
        key: format.value('yyyy-MM-dd', value),
      }))
    })

    const heading = computed(() =>
      format.value(props.headingFormat)(props.pageDate)
    )
    const leftDisabled = computed(
      () =>
        props.lowerLimit &&
        (isSameMonth(props.lowerLimit, props.pageDate) ||
          isBefore(props.pageDate, props.lowerLimit))
    )
    const rightDisabled = computed(
      () =>
        props.upperLimit &&
        (isSameMonth(props.upperLimit, props.pageDate) ||
          isAfter(props.pageDate, props.upperLimit))
    )

    const previousPage = () =>
      emit('update:pageDate', subMonths(props.pageDate, 1))
    const nextPage = () => emit('update:pageDate', addMonths(props.pageDate, 1))

    return {
      weekDays,
      days,
      heading,
      leftDisabled,
      rightDisabled,
      previousPage,
      nextPage,
    }
  },
})
</script>

<style></style>
