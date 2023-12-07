<template>
  <div class="passenger">
    <p class="name">{{ passengerData.name }}</p>
    <button class="item-btn" @click="passengerPurchaseList.boat++">{{ passengerPurchaseList.boat }}</button>
    <button class="item-btn" @click="passengerPurchaseList.beer++">{{ passengerPurchaseList.beer }}</button>
    <button class="item-btn" @click="passengerPurchaseList.drink++">{{ passengerPurchaseList.drink }}</button>
    <button class="item-btn" @click="passengerPurchaseList.wine++">{{ passengerPurchaseList.wine }}</button>
    <button class="item-btn" @click="passengerPurchaseList.soda++">{{ passengerPurchaseList.soda }}</button>
  </div>

</template>

<script setup>
import {computed, reactive, ref, watch} from "vue";
import {updateData} from "../api/firebase.js";

const props = defineProps({
  passengerData: {
    type: Object,
    required: true
  }
})

const passenger = ref('Sven Wollter')

const passengerPurchaseList = reactive({
  boat: 0,
  beer: 0,
  drink: 0,
  wine: 0,
  soda: 0
})

const calc = computed(() => {
  const boatCost = passengerPurchaseList.boat * 1000
  const beerCost = passengerPurchaseList.beer * 80
  const drinkCost = passengerPurchaseList.drink * 100
  const wineCost = passengerPurchaseList.wine * 100
  const sodaCost = passengerPurchaseList.soda * 50

  const total = boatCost + beerCost + drinkCost + wineCost + sodaCost

  return {
    boatCost: boatCost,
    beerCost: beerCost,
    drinkCost: drinkCost,
    wineCost: wineCost,
    sodaCost: sodaCost,
    total: total
  }
})

watch(passengerPurchaseList, () => {
  const data = {
    name: passenger.value,
    boat: {
      amount: passengerPurchaseList.boat,
      cost: calc.value.boatCost
    },
    beer: {
      amount: passengerPurchaseList.beer,
      cost: calc.value.beerCost
    },
    drink: {
      amount: passengerPurchaseList.drink,
      cost: calc.value.drinkCost
    },
    wine: {
      amount: passengerPurchaseList.wine,
      cost: calc.value.wineCost
    },
    soda: {
      amount: passengerPurchaseList.soda,
      cost: calc.value.sodaCost
    }
  }

  updateData(data)
})

</script>

<style scoped>
.passenger {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.item-btn {
  height: 50px;
  width: 50px;
}
</style>