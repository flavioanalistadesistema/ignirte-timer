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
  activeCycleId: string | null
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
  const [cycle, dispatch] = useReducer((state, action) => {
    console.log(state)
    console.log(action)

    if (action.type === 'CREATED_NEW_CYCLE_CONTEXT')
      return [...state, action.payload.newCycle]

    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)
  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

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
    // setCycle((status) =>
    //   status.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
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
    // setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountsecondsPassed(0)
  }

  function interruptedCyclesContext() {
    dispatch({
      type: 'INTERRUPTED_CYCLES_CONTEXT',
      payload: {
        activeCycleId,
      },
    })

    // setCycle(
    //   cycle.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interrupDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
  }
  return (
    <CycleContext.Provider
      value={{
        cycle,
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
