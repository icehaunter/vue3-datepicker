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

<script lang="ts">
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
  isValid,
} from 'date-fns'
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
    /**
     * Currently selected date, needed for highlighting
     */
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
      default: 'MMM',
    },
    lowerLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
    upperLimit: {
      type: Date as PropType<Date>,
      required: false,
    },
  },
  setup(props, { emit }) {
    const from = computed(() => startOfYear(props.pageDate))
    const to = computed(() => endOfYear(props.pageDate))

    const isEnabled = (
      target: Date,
      lower: Date | undefined,
      upper: Date | undefined
    ): boolean => {
      if (!lower && !upper) return true
      if (lower && isBefore(target, startOfMonth(lower))) return false
      if (upper && isAfter(target, endOfMonth(upper))) return false
      return true
    }

    const months = computed(() =>
      eachMonthOfInterval({
        start: from.value,
        end: to.value,
      }).map((value) => ({
        value,
        display: format(value, props.format),
        key: format(value, props.format),
        selected: props.selected && isSameMonth(props.selected, value),
        disabled: !isEnabled(value, props.lowerLimit, props.upperLimit),
      }))
    )

    const heading = computed(() => getYear(from.value))

    const leftDisabled = computed(
      () =>
        props.lowerLimit &&
        (isSameYear(props.lowerLimit, props.pageDate) ||
          isBefore(props.pageDate, props.lowerLimit))
    )
    const rightDisabled = computed(
      () =>
        props.upperLimit &&
        (isSameYear(props.upperLimit, props.pageDate) ||
          isAfter(props.pageDate, props.upperLimit))
    )

    const previousPage = () =>
      emit('update:pageDate', subYears(props.pageDate, 1))
    const nextPage = () => emit('update:pageDate', addYears(props.pageDate, 1))

    return {
      months,
      heading,
      leftDisabled,
      rightDisabled,
      previousPage,
      nextPage,
    }
  },
})
</script>
