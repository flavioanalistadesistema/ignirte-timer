import {
  createContext,
  ReactNode,
  useState,
  useReducer,
  useEffect,
} from 'react'
import { Cycle, CyclesReducers } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCyclesAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CycleFormDataType {
  minutAmount: number
  task: string
}
interface CycleContextType {
  cycles: Cycle[]
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
  const [cycleState, dispatch] = useReducer(
    CyclesReducers,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateJSON = localStorage.getItem(
        '@ignite-timer:state-cycle-1.0.0',
      )
      if (storedStateJSON) {
        return JSON.parse(storedStateJSON)
      }
      return initialState
    },
  )

  const { cycles, activeCycleId } = cycleState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountsecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.date))
    }
    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cycleState)
    localStorage.setItem('@ignite-timer:state-cycle-1.0.0', stateJSON)
  }, [cycleState])

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
