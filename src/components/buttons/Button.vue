<template>
  <button>{{text}}</button>
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
  background-color: #747bff;
  color: white;

  width: fit-content;
}
</style>