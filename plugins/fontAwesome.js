import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { 
    fas, faFilter, faChevronDown, faSort, faSortUp, faSortDown, faCircleXmark, faCircleCheck, faAngleLeft, faAngleRight
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false
// You can add your icons directly in this plugin
library.add(
    fas, faFilter, faChevronDown, faSort, faSortUp, faSortDown, faCircleXmark, faCircleCheck, faAngleLeft, faAngleRight
)

// Register the component globally
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
    nuxtApp.vueApp.component('FontAwesomeLayers', FontAwesomeLayers)
})