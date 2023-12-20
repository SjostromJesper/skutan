import {defineStore} from "pinia";
import {ref} from "vue";
import {getAllEvents} from "../api/firebase.js";

export const useEventStore = defineStore('eventData', () => {
    const eventList = ref(null)


    const getEventList = async () => (
        eventList.value = await getAllEvents()
    )

    return {
        eventList,
        getEventList
    }
})