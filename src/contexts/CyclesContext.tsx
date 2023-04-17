import { createContext, ReactNode, useState, useReducer } from 'react'
import { Cycle, CyclesReducers } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'

interface CycleFormDataType {
  minutAmount: number
  task: string
}
interface CycleContextType {
  cycle: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId?: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setAmountseconds: (seconds: number) => void
  createdNewCicleContext: (data: CycleFormDataType) => void
  interruptedCyclesContext: () => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(CyclesReducers, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setAmountseconds(seconds: number) {
    setAmountsecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch(markCurrentCyclesAsFinishedAction())
  }

  const createdNewCicleContext = (data: CycleFormDataType) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutAmount: data.minutAmount,
      date: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
  }

  function interruptedCyclesContext() {
    dispatch(interruptCurrentCycleAction())
  }
  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setAmountseconds,
        createdNewCicleContext,
        interruptedCyclesContext,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
