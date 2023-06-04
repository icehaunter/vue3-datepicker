<template>
  <div
    class="v3dp__popout"
    :class="`v3dp__popout-${viewMode}`"
    :style="{ ['--popout-column-definition' as any]: `repeat(${columnCount}, 1fr)` }"
    @mousedown.prevent
  >
    <div class="v3dp__heading">
      <button
        class="v3dp__heading__button v3dp__heading__button__left"
        :disabled="leftDisabled"
        @click.stop.prevent="$emit('left')"
      >
        <slot name="arrow-left">
          <svg
            class="v3dp__heading__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 8"
          >
            <g fill="none" fill-rule="evenodd">
              <path stroke="none" d="M-9 16V-8h24v24z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 0L1 4l4 4"
              />
            </g>
          </svg>
        </slot>
      </button>
      <component
        :is="headingClickable ? 'button' : 'span'"
        class="v3dp__heading__center"
        @click.stop.prevent="$emit('heading')"
      >
        <slot name="heading" />
      </component>
      <button
        class="v3dp__heading__button v3dp__heading__button__right"
        :disabled="rightDisabled"
        @click.stop.prevent="$emit('right')"
      >
        <slot name="arrow-right">
          <svg
            class="v3dp__heading__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 6 8"
          >
            <g fill="none" fill-rule="evenodd">
              <path stroke="none" d="M15-8v24H-9V-8z" />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M1 8l4-4-4-4"
              />
            </g>
          </svg>
        </slot>
      </button>
    </div>
    <div class="v3dp__body">
      <template v-if="'subheading' in $slots">
        <div class="v3dp__subheading">
          <slot name="subheading" />
        </div>
        <hr class="v3dp__divider" />
      </template>
      <div class="v3dp__elements">
        <slot name="body">
          <button
            v-for="item in items"
            :key="item.key"
            :disabled="item.disabled"
            :class="[
              {
                selected: item.selected,
                current: item.current,
              },
              `v3dp__element__button__${viewMode}`,
            ]"
            @click.stop.prevent="$emit('elementClick', item.value)"
          >
            <span>{{ item.display }}</span>
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { isValid } from 'date-fns'
import { defineComponent, PropType, computed } from 'vue'

export interface Item {
  key: string
  value: Date
  display: number | string
  disabled: boolean
  selected: boolean
  current?: boolean
}

export type ViewMode = 'year' | 'month' | 'day' | 'time' | 'custom'
const VIEW_MODES = ['year', 'month', 'day', 'time', 'custom']

export default defineComponent({
  emits: {
    elementClick: (value: Date) => isValid(value),
    left: () => true,
    right: () => true,
    heading: () => true,
  },
  props: {
    headingClickable: {
      type: Boolean,
      default: false,
    },
    leftDisabled: {
      type: Boolean,
      default: false,
    },
    rightDisabled: {
      type: Boolean,
      default: false,
    },
    columnCount: {
      type: Number,
      default: 7,
    },
    items: {
      type: Array as PropType<Item[]>,
      default: (): Item[] => [],
    },
    viewMode: {
      type: String as PropType<ViewMode>,
      required: true,
      validate: (x: unknown) => typeof x === 'string' && VIEW_MODES.includes(x),
    },
  },
})
</script>

<style scoped>
.v3dp__popout {
  z-index: 10;
  position: absolute;
  /* bottom: 0; */
  text-align: center;
  width: 17.5em;
  background-color: var(--popout-bg-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 8px 0 1em;
  color: var(--text-color);
}

.v3dp__popout * {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.v3dp__popout :deep(button) {
  background: none;
  border: none;
  outline: none;
}

.v3dp__popout :deep(button:not(:disabled)) {
  cursor: pointer;
}

.v3dp__heading {
  width: 100%;
  display: flex;
  height: var(--heading-size);
  line-height: var(--heading-size);
  font-weight: var(--heading-weight);
}

.v3dp__heading__button {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--heading-size);
}

button.v3dp__heading__center:hover,
.v3dp__heading__button:not(:disabled):hover {
  background-color: var(--heading-hover-color);
}

.v3dp__heading__center {
  flex: 1;
}

.v3dp__heading__icon {
  height: 12px;
  stroke: var(--arrow-color);
}

.v3dp__heading__button:disabled .v3dp__heading__icon {
  stroke: var(--elem-disabled-color);
}

.v3dp__subheading,
.v3dp__elements {
  display: grid;
  grid-template-columns: var(--popout-column-definition);
  font-size: var(--elem-font-size);
}

.v3dp__subheading {
  margin-top: 1em;
}

.v3dp__divider {
  border: 1px solid var(--divider-color);
  border-radius: 3px;
}

.v3dp__elements :deep(button:disabled) {
  color: var(--elem-disabled-color);
}

.v3dp__elements :deep(button) {
  padding: 0.3em 0.6em;
}

.v3dp__elements :deep(button span) {
  display: block;
  line-height: 1.9em;
  height: 1.8em;
  border-radius: var(--elem-border-radius);
}

.v3dp__elements :deep(button:not(:disabled):hover span) {
  background-color: var(--elem-hover-bg-color);
  color: var(--elem-hover-color);
}

.v3dp__elements :deep(button.selected span) {
  background-color: var(--elem-selected-bg-color);
  color: var(--elem-selected-color);
}

.v3dp__elements :deep(button.current span) {
  font-weight: var(--elem-current-font-weight);
  outline: 1px solid var(--elem-current-outline-color);
}
</style>
