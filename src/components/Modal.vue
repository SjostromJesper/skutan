<template>
  <div class="modal">
    <div class="content">
      <div>
        <h2>{{ modalTitle }}</h2>
        <slot/>
      </div>
      <div class="button-row">
        <button @click="closeModal">Avbryt</button>
        <button v-if="accept" @click="accept">{{ acceptButtonText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modalTitle: {
    type: String,
    required: true
  },
  accept: {
    type: Function,
    required: false,
    default: null
  },
  acceptButtonText: {
    type: String,
    required: false,
    default: null
  },
  closeModal: {
    type: Function,
    required: true
  }
})


</script>

<style scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(91, 91, 91, 0.47);
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  min-width: 300px;
  min-height: 200px;

  padding: 10px;

  background-color: white;
  border-radius: 8px;
}

.button-row {
  display: flex;
  justify-content: space-between;
}
</style>