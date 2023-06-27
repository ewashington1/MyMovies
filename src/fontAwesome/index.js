import { library } from '@fortawesome/fontawesome-svg-core'
import { faSquareCheck as unfilledCheck } from '@fortawesome/free-regular-svg-icons'
import { faSquareCheck as filledCheck } from '@fortawesome/free-solid-svg-icons'
import {faStar as unfilledStar} from '@fortawesome/free-regular-svg-icons'
import {faStar as filledStar} from '@fortawesome/free-solid-svg-icons'
import {faCaretDown as filledDropdown} from "@fortawesome/free-solid-svg-icons"


export const importLogos = () => {
    library.add(unfilledCheck, filledCheck, unfilledStar, filledStar, filledDropdown);
}

