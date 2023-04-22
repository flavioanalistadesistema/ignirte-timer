import { Cycle } from './reducer'

export enum ActionTypes {
  CREATED_NEW_CYCLE_CONTEXT = 'CREATED_NEW_CYCLE_CONTEXT',
  INTERRUPTED_CYCLES_CONTEXT = 'INTERRUPTED_CYCLES_CONTEXT',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.CREATED_NEW_CYCLE_CONTEXT,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return { type: ActionTypes.INTERRUPTED_CYCLES_CONTEXT }
}

export function markCurrentCyclesAsFinishedAction() {
  return { type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED }
}
