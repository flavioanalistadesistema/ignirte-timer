import { produce } from 'immer'
import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutAmount: number
  date: Date
  interrupDate?: Date
  finishedDate?: Date
}

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function CyclesReducers(state: CycleState, action: any) {
  switch (action.type) {
    case ActionTypes.CREATED_NEW_CYCLE_CONTEXT:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   activeCycleId: action.payload.newCycle.id,
      // }

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPTED_CYCLES_CONTEXT:
      {
        // return {
        //   ...state,
        //   cycles: state.cycles.map((cycle) => {
        //     if (cycle.id === state.activeCycleId) {
        //       return { ...cycle, interrupDate: new Date() }
        //     } else {
        //       return cycle
        //     }
        //   }),
        //   activeCycleId: null,
        // }

        const currentCycleIndex = state.cycles.findIndex((cycle) => {
          return cycle.id === state.activeCycleId
        })

        console.log('currentCycleIndex', state.cycles[currentCycleIndex])

        if (currentCycleIndex < 0) {
          return state
        }
      }
      return produce(state, (draft) => {
        draft.activeCycleId = null
        console.log('aqui')
        console.log('draft', draft.cycles[currentCycleIndex])
        // draft.cycles[currentCycleIndex].interrupDate = new Date()
      })
    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null,
      }
    default:
      return state
  }
}
