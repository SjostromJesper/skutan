import {defineStore} from "pinia";
import {ref} from "vue";
import {getPassengers} from "../api/firebase.js";

export const usePassengerStore = defineStore('passengerData', () => {
    const passengerList = ref(null)
    const eventId = ref(null)

    const setEventId = (id) => {
        eventId.value = id
    }

    const getPassengerList = async (eventID) => (
        passengerList.value = await getPassengers(eventID)
    )

    return {
        passengerList,
        eventId,
        getPassengerList,
        setEventId
    }
})