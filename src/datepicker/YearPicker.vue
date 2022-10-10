<template>
  <picker-popup
    :columnCount="3"
    :leftDisabled="leftDisabled"
    :rightDisabled="rightDisabled"
    :items="years"
    @left="previousPage"
    @right="nextPage"
    @elementClick="$emit('select', $event)"
  >
    <template #heading>{{ heading }}</template>
  </picker-popup>
</template>

<script lang="ts">
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
  isValid,
} from 'date-fns'
import PickerPopup, { Item } from './PickerPopup.vue'

export default defineComponent({
  components: {
    PickerPopup,
  },
  emits: {
    'update:pageDate': (date: Date) => isValid(date),
    select: (date: Date) => isValid(date),
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
    const from = computed(() => startOfDecade(props.pageDate))
    const to = computed(() => endOfDecade(props.pageDate))

    const isEnabled = (
      target: Date,
      lower: Date | undefined,
      upper: Date | undefined
    ): boolean => {
      if (!lower && !upper) return true
      if (lower && getYear(target) < getYear(lower)) return false
      if (upper && getYear(target) > getYear(upper)) return false
      return true
    }

    const years = computed(() =>
      eachYearOfInterval({
        start: from.value,
        end: to.value,
      }).map(
        (value): Item => ({
          value,
          key: String(getYear(value)),
          display: getYear(value),
          selected:
            !!props.selected && getYear(value) === getYear(props.selected),
          disabled: !isEnabled(value, props.lowerLimit, props.upperLimit),
        })
      )
    )

    const heading = computed(() => {
      const start = getYear(from.value)
      const end = getYear(to.value)

      return `${start} - ${end}`
    })

    const leftDisabled = computed(
      () =>
        props.lowerLimit &&
        (getDecade(props.lowerLimit) === getDecade(props.pageDate) ||
          isBefore(props.pageDate, props.lowerLimit))
    )
    const rightDisabled = computed(
      () =>
        props.upperLimit &&
        (getDecade(props.upperLimit) === getDecade(props.pageDate) ||
          isAfter(props.pageDate, props.upperLimit))
    )

    const previousPage = () =>
      emit('update:pageDate', subYears(props.pageDate, 10))
    const nextPage = () => emit('update:pageDate', addYears(props.pageDate, 10))

    return {
      years,
      heading,
      leftDisabled,
      rightDisabled,
      previousPage,
      nextPage,
    }
  },
})
</script>
