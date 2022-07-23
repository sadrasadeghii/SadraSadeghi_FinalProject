// Action types
export const INCREMENT_COUNTER = "INCREMENT_COUNTER"
export const DECREMENT_COUNTER = "DECREMENT_COUNTER"

export interface ICounterReducer {
  counter: number;
  title: string;
}

const initialState: ICounterReducer = {
  counter: 12,
  title: "ردیوسر پروژه را در اینجا استفاده کردم"
}
export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DECREMENT_COUNTER:
      return {
        ...state,
        counter: state.counter - 1
      }
    default:
      return state
  }
}