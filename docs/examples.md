<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref } from 'vue'
import { add } from 'date-fns'

// Ex 1
const picked = ref(new Date())

const typeable = ref(null)

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

// Ex 4
const example4 = ref(new Date())
const minimumView = ref('day')

</script>

# Examples

## Styling

For styling examples, see [Configuration section](/config#styling-example-and-playground).

## Basic usage

<Datepicker v-model="picked" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const picked = ref(new Date())

  </script>

  <template>
    <Datepicker v-model="picked" />
  </template>
  ```
</details>

## Typeable input

<Datepicker v-model="typeable" typeable  inputFormat="yyyy-MM-d" />

<details>
  <summary>Code for this example</summary>
  
  ```vue
  <script setup>
  import Datepicker from '../src/datepicker/Datepicker.vue'
  import { ref } from 'vue'
  const picked = ref(new Date())

  </script>

  <template>
    <Datepicker v-model="typeable" typeable />
  </template>
  ```
</details>
## Upper and lower limits

:::tip
If limit is within the current "view" (e.g. a month), then view changing will be prohibited.
:::

Settings:

- Lower limit: <datepicker v-model="example2_from" />
- Upper limit: <datepicker v-model="example2_to" />

Result:

<Datepicker v-model="example2" :upper-limit="example2_to" :lower-limit="example2_from" />

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
    <Datepicker
      v-model="example2"
      :upper-limit="example2_to"
      :lower-limit="example2_from"
    />
  </template>
  ```
</details>

## Disabled dates

Settings:

- Disabled date: <Datepicker v-model="disabledDate" />

Result:

<Datepicker v-model="pickedDate" :disabledDates="{ dates: [disabledDate] }" />

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
    <Datepicker
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
<Datepicker v-model="example3" :starting-view="startingView" :minimum-view="startingView === 'time' ? 'time' : 'day'" :inputFormat="startingView === 'time' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'" />

## Mininimal view

Settings:

- <label>Minimum view: <code>time</code> <input type="radio" v-model="minimumView" value="time"></label>
- <label>Minimum view: <code>day</code> <input type="radio" v-model="minimumView" value="day"></label>
- <label>Minimum view: <code>month</code> <input type="radio" v-model="minimumView" value="month"></label>
- <label>Minimum view: <code>year</code> <input type="radio" v-model="minimumView" value="year"></label>

Result:
<Datepicker v-model="example4" :minimum-view="minimumView" :inputFormat="minimumView === 'time' ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'" />

## Clearable

<Datepicker v-model="pickedDate" :clearable="true" />

<details>
  <summary>Code for this example</summary>

```vue
<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref } from 'vue'
const pickedDate = ref(new Date())
</script>

<template>
  <Datepicker v-model="pickedDate" :clearable="true" />
</template>
```

</details>

:::tip
We can customize clearable view with `slot` for example:
:::

<Datepicker v-model="pickedDate" :clearable="true" placeholder="placeholder">
  <template v-slot:clear="{ onClear }">
    <button @click="onClear" style="color: red">x</button>
  </template>
</Datepicker>

<details>
  <summary>Code for this example</summary>

```vue
<script setup>
import Datepicker from '../src/datepicker/Datepicker.vue'
import { ref } from 'vue'
const pickedDate = ref(new Date())
</script>

<template>
  <Datepicker v-model="pickedDate" :clearable="true" placeholder="placeholder">
    <template v-slot:clear="{ onClear }">
      <button @click="onClear" style="color: red">x</button>
    </template>
  </Datepicker>
</template>
```

</details>
