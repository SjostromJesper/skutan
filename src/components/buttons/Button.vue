<template>
  <button :class="type">{{text}}</button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: false,
    default: 'primary' // TODO: PRIMARY, SECONDARY
  }
})

</script>

<style scoped>
button {
  color: white;

  width: fit-content;
}

.red {
  background-color: red;
}

.primary {
  background-color: #747bff;
}
</style>