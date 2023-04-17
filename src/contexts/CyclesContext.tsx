import { createContext, ReactNode, useState, useReducer } from 'react'

interface CycleFormDataType {
  minutAmount: number
  task: string
}

interface Cycle {
  id: string
  task: string
  minutAmount: number
  date: Date
  interrupDate?: Date
  finishedDate?: Date
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

interface CycleState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cycleState, dispatch] = useReducer(
    (state: CycleState, action: any) => {
      switch (action.type) {
        case 'CREATED_NEW_CYCLE_CONTEXT':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'INTERRUPTED_CYCLES_CONTEXT':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interrupDate: new Date() }
              } else {
                return cycle
              }
            }),
            activeCycleId: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
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
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)
  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setAmountseconds(seconds: number) {
    setAmountsecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
  }

  const createdNewCicleContext = (data: CycleFormDataType) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutAmount: data.minutAmount,
      date: new Date(),
    }

    dispatch({
      type: 'CREATED_NEW_CYCLE_CONTEXT',
      payload: {
        newCycle,
      },
    })
  }

  function interruptedCyclesContext() {
    dispatch({
      type: 'INTERRUPTED_CYCLES_CONTEXT',
      payload: {
        activeCycleId,
      },
    })
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
