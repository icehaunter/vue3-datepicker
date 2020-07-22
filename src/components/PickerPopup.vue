<template>
  <div
    class="popout"
    :style="{ '--popout-column-definition': `repeat(${columnCount}, 1fr)` }"
  >
    <div class="popout-heading">
      <button
        class="heading-button"
        :disabled="leftDisabled"
        @click.stop.prevent="$emit('left')"
      >
        <slot name="arrow-left">
          <svg
            class="heading-button-icon"
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
        class="heading-center"
        @click.stop.prevent="$emit('heading')"
      >
        <slot name="heading" />
      </component>
      <button
        class="heading-button"
        :disabled="rightDisabled"
        @click.stop.prevent="$emit('right')"
      >
        <slot name="arrow-right">
          <svg
            class="heading-button-icon"
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
    <div class="popout-body">
      <template v-if="'subheading' in $slots">
        <div class="subheading">
          <slot name="subheading" />
        </div>
        <hr class="divider" />
      </template>
      <div class="elements">
        <slot name="body" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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
  },
})
</script>

<style scoped>
.popout {
  max-width: 17.5em;
  background-color: var(--bg-color);
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);
  padding: 8px 0 1em;
  color: inherit;
}

.popout * {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.popout-heading {
  width: 100%;
  display: flex;
  height: var(--heading-size);
  line-height: var(--heading-size);
  font-weight: var(--heading-weight);
}

.heading-button {
  background: none;
  border: none;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--heading-size);
}

button.heading-center:hover, .heading-button:not(:disabled):hover {
  background-color: var(--heading-hover-color);
}

.popout button:not(:disabled) {
  cursor: pointer;
}

.heading-center {
  flex: 1;
}

.heading-button-icon {
  height: 12px;
  stroke: var(--arrow-color);
}

button {
  background: none;
  border: none;
  outline: none;
}

.popout-body .subheading,
.popout-body .elements {
  display: grid;
  grid-template-columns: var(--popout-column-definition);
  font-size: var(--elem-font-size);
}

.popout-body .subheading {
  margin-top: 1em;
}

.popout-body .divider {
  border: 1px solid var(--divider-color);
  border-radius: 3px;
}

.popout-body .elements button:disabled {
  color: var(--elem-disabled-color);
}

.popout-body .elements button {
  padding: 0.3em 0.6em;
}

.popout-body .elements button span {
  display: block;
  line-height: 1.9em;
  height: 1.8em;
  border-radius: var(--elem-border-radius);
}

.popout-body .elements button:not(:disabled):hover span {
  background-color: var(--elem-hover-bg-color);
  color: var(--elem-hover-color);
}

.popout-body .elements button.selected span {
  background-color: var(--elem-selected-bg-color);
  color: var(--elem-selected-color);
}
</style>
