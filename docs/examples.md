<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref } from 'vue'
import { add } from 'date-fns'

// Ex 1
const picked = ref(new Date())

// Ex 2
const example2 = ref(new Date())
const example2_from = ref(add(new Date(), { days: -7 }))
const example2_to = ref(add(new Date(), { days: 7 }))

// Disabled dates example
const pickedDate = ref(new Date())
const disabledDate = ref(add(new Date(), { days: 1 }))

// Ex 3
const example3 = ref(new Date())
const startingView = ref('day')

</script>

# Examples

## Styling
For styling examples, see [Configuration section](/config#styling-example-and-playground).

## Basic usage

<datepicker v-model="picked" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const picked = ref(new Date())

  </script>

  <template>
    <datepicker v-model="picked" />
  </template>
  ```
</details>


## Upper and lower limits
:::tip
If limit is within the current "view" (e.g. a month), then view changing will be prohibited.
:::

Settings: 

- Upper limit: <datepicker v-model="example2_from" />
- Lower limit: <datepicker v-model="example2_to" />

Result:

<datepicker v-model="example2" :upper-limit="example2_to" :lower-limit="example2_from" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const example2 = ref(new Date())
  const example2_from = ref(new Date())
  const example2_to = ref(new Date())

  </script>

  <template>
    <datepicker
      v-model="example2"
      :upper-limit="example2_to"
      :lower-limit="example2_from"
    />
  </template>
  ```
</details>

## Disabled dates

Settings: 

- Disabled date: <datepicker v-model="disabledDate" />

Result:

<datepicker v-model="pickedDate" :disabledDates="{ dates: [disabledDate] }" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  import { add } from 'date-fns'
  const pickedDate = ref(new Date())
  const disabledDate = ref(add(new Date(), { days: 1 }))
  </script>

  <template>
    <datepicker
      v-model="pickedDate"
      :disabledDates="{ dates: [disabledDate] }"
    />
  </template>
  ```
</details>

## Starting view
Settings: 

- <label>Starting view: <code>time</code> <input type="radio" v-model="startingView" value="time"></label>
- <label>Starting view: <code>day</code> <input type="radio" v-model="startingView" value="day"></label>
- <label>Starting view: <code>month</code> <input type="radio" v-model="startingView" value="month"></label>
- <label>Starting view: <code>year</code> <input type="radio" v-model="startingView" value="year"></label>

Result:
<datepicker v-model="example3" :starting-view="startingView" :minimum-view="startingView === 'time' ? 'time' : 'day'" :inputFormat="startingView === 'time' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'" />

## Clearable

Settings:

- Clear date: <datepicker :clearable="true" />

Result:

<datepicker v-model="pickedDate" :clearable="true" />

<details>
  <summary>Code for this example</summary>

  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const pickedDate = ref(new Date())
  </script>

  <template>
    <datepicker
      v-model="pickedDate"
      :clearable="true"
    />
  </template>
  ```
</details>

:::tip
We can customize clearable view with `slot` for example:
:::
<details>
  <summary>Code for this example</summary>

  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const pickedDate = ref(new Date())
  </script>

  <template>
    <datepicker
      v-model="pickedDate"
      :clearable="true"
    >
      <template v-slot:clear="{ onClear }">
        <button @click="onClear">x</button>
      </template>
    </datepicker>
  </template>
  ```
</details>
