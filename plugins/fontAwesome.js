import { defineNuxtPlugin } from "#app";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { 
    faFilter, faChevronDown, faSort, faSortUp, faSortDown, faCircleXmark, faCircleCheck, faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons'

// You can add your icons directly in this plugin
library.add(
    faFilter, faChevronDown, faSort, faSortUp, faSortDown, faCircleXmark, faCircleCheck, faAngleLeft, faAngleRight
)

// Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('FontAwesomeIcon', FontAwesomeIcon)
    nuxtApp.vueApp.component('FontAwesomeLayers', FontAwesomeLayers)
})