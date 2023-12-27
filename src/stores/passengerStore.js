import {defineStore} from "pinia";
import {ref} from "vue";
import {getPassengers, removePassenger as rmPassenger} from "../api/firebase.js";

export const usePassengerStore = defineStore('passengerData', () => {
    const passengerList = ref([])
    const eventId = ref(null)

    const setEventId = (id) => {
        eventId.value = id
    }

    const getPassengerList = async (eventID) => {
        passengerList.value = await getPassengers(eventID)



        function compare( a, b ) {
            if ( a.data.date.seconds < b.data.date.seconds ){
                return -1;
            }
            if ( a.data.date.seconds > b.data.date.seconds ){
                return 1;
            }
            return 0;
        }

        passengerList.value.sort( compare );


        // passengerList.value.sort((a,b) => (a.data.date.seconds < b.data.date.seconds) ? 1 : ((b.date.date.seconds < a.data.date.seconds) ? -1 : 0))
    }



    const removePassenger = async (passengerID) => {
        console.log()
        await rmPassenger(passengerID)
        await getPassengerList(eventId.value)
    }

    return {
        passengerList,
        eventId,
        getPassengerList,
        setEventId,
        removePassenger
    }
})