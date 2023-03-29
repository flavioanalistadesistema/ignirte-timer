import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
import * as zod from 'zod'

import {
  HomeContainer,
  StartCountDownButton,
  StoptCountDownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

const schema = zod.object({
  minutAmount: zod
    .number()
    .min(1, 'Ciclo deve ser minimo de 1 minutos')
    .max(60, 'Ciclo deve ser maximo 60 minutos'),
  task: zod
    .string()
    .min(2, 'Titulo deve ser de no minimut 2 caracteres')
    .max(10, 'Titulo deve ser de no máximo 10 caracteres'),
})

type NewCicleFormData = zod.infer<typeof schema>

interface Cycle {
  id: string
  task: string
  minutAmount: number
  date: Date
  interrupDate: Date
  finishedDate: Date
}
interface CycleContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setAmountseconds: (seconds: number) => void
}
export const CycleContext = createContext({} as CycleContextType)

export function Home() {
  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm
  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isDisableTask = !task

  const handleCreatedNewCicle = (data: NewCicleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutAmount: data.minutAmount,
      date: new Date(),
    }
    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountsecondsPassed(0)
    reset()
  }

  function setAmountseconds(seconds: number) {
    setAmountsecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycle((status) =>
      status.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function handleInterruptedcycles() {
    setCycle(
      cycle.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interrupDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatedNewCicle)}>
        <CycleContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setAmountseconds,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CycleContext.Provider>
        {activeCycle ? (
          <StoptCountDownButton onClick={handleInterruptedcycles} type="button">
            <HandPalm size={24} />
            Interromper
          </StoptCountDownButton>
        ) : (
          <StartCountDownButton disabled={isDisableTask} type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
