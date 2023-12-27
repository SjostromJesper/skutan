<template>
  <div class="passenger">

    <p class="name">{{ passengerData.name }}</p>
    <button class="item-btn" @click="passengerPurchaseList.boatSmall++">{{ passengerPurchaseList.boatSmall }}</button>
    <button class="item-btn" @click="passengerPurchaseList.boatLarge++">{{ passengerPurchaseList.boatLarge }}</button>
    <button class="item-btn" @click="passengerPurchaseList.beer++">{{ passengerPurchaseList.beer }}</button>
    <button class="item-btn" @click="passengerPurchaseList.drink++">{{ passengerPurchaseList.drink }}</button>
    <button class="item-btn" @click="passengerPurchaseList.wine++">{{ passengerPurchaseList.wine }}</button>
    <button class="item-btn" @click="passengerPurchaseList.soda++">{{ passengerPurchaseList.soda }}</button>
    <p class="total">{{calc.total}}</p>
  </div>

</template>

<script setup>
import {computed, onMounted, reactive, ref, watch} from "vue";
import {updateData} from "../api/firebase.js";

const props = defineProps({
  passengerId: {
    type: String,
    required: true
  },
  passengerData: {
    type: Object,
    required: true
  }
})

onMounted(() => {

  props.passengerData.boatSmall ? passengerPurchaseList.boatSmall = props.passengerData.boatSmall.amount : 0
  props.passengerData.boatLarge ? passengerPurchaseList.boatLarge = props.passengerData.boatLarge.amount : 0
  props.passengerData.beer ? passengerPurchaseList.beer = props.passengerData.beer.amount : 0
  props.passengerData.drink ? passengerPurchaseList.drink = props.passengerData.drink.amount : 0
  props.passengerData.soda ? passengerPurchaseList.soda = props.passengerData.soda.amount : 0
  props.passengerData.wine ? passengerPurchaseList.wine = props.passengerData.wine.amount : 0

})


const passengerPurchaseList = reactive({
  boatSmall: 0,
  boatLarge: 0,
  beer: 0,
  drink: 0,
  wine: 0,
  soda: 0
})

const calc = computed(() => {
  const boatSmallCost = passengerPurchaseList.boatSmall * 700
  const boatLargeCost = passengerPurchaseList.boatLarge * 1000
  const beerCost = passengerPurchaseList.beer * 80
  const drinkCost = passengerPurchaseList.drink * 100
  const wineCost = passengerPurchaseList.wine * 100
  const sodaCost = passengerPurchaseList.soda * 50

  const total = boatSmallCost + boatLargeCost + beerCost + drinkCost + wineCost + sodaCost

  return {
    boatSmallCost,
    boatLargeCost,
    beerCost,
    drinkCost,
    wineCost,
    sodaCost,
    total
  }
})

watch(passengerPurchaseList, () => {
  const data = {
    name: props.passengerData.name,
    boatSmall: {
      amount: passengerPurchaseList.boatSmall,
      cost: calc.value.boatSmallCost
    },
    boatLarge: {
      amount: passengerPurchaseList.boatLarge,
      cost: calc.value.boatLargeCost
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

  updateData(props.passengerId, data)
})

</script>

<style scoped>
.passenger {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid black;
}

.item-btn, .name, .total {
  height: 75px;
  width: 75px;

  font-weight: 600;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-btn {
  background-color: #747bff;
  color: white;
  font-size: 1.2em;
}

.item-btn:hover {
  background-color: #d5d5d5;
}

.total {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 30px;
  background-color: #84d084;
}

</style>