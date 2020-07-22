<template>
  <div class="popout">
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
        ><slot name="heading"
      /></component>
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
    <div class="body">
      <slot name="body" />
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
  },
})
</script>

<style scoped>
.popout {
  max-width: var(--popout-width, 250px);
}

.popout-heading {
  width: 100%;
  display: flex;
}

.heading-button {
  background: none;
  border: none;
}

.heading-button:not(:disabled) {
  cursor: pointer;
}

.heading-center {
  flex: 1;
}

.heading-button-icon {
  height: 12px;
  stroke: #000;
}

button {
  background: none;
  border: none;
}
</style>