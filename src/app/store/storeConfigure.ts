import { createStore } from "redux"
import counterReducer from "../../features/ContactPage/counterReducer"

export const storeConfigure = () => {
  return createStore(counterReducer)
}
