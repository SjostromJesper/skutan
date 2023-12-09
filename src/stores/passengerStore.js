import {defineStore} from "pinia";
import {ref} from "vue";
import {getPassengers} from "../api/firebase.js";

export const usePassengerStore = defineStore('passengerData', () => {
    const passengerList = ref(null)

    const getPassengerList = async (eventID) => (
        passengerList.value = await getPassengers(eventID)
    )

    return {
        passengerList,
        getPassengerList
    }
})