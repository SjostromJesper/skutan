import {defineStore} from "pinia";
import {ref} from "vue";
import {getAllEvents, removeEvent as rmEvent} from "../api/firebase.js";

export const useEventStore = defineStore('eventData', () => {
    const eventList = ref(null)


    const getEventList = async () => (
        eventList.value = await getAllEvents()
    )

    const removeEvent = async (eventID) => {
        await rmEvent(eventID)
        await getEventList()
    }

    return {
        eventList,
        getEventList,
        removeEvent
    }
})