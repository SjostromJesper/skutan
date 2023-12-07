import {defineStore} from "pinia";
import {ref} from "vue";

export const useCounterStore = defineStore('counter', () => {
    const passengerList = ref(null)

    const setPassengerList = (data) => (
        passengerList.value = data
    )

    return {
        passengerList,
        setPassengerList
    }
})