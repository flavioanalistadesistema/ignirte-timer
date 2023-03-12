// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { createContext, useState } from 'react'
// import * as zod from 'zod'

import {
  // FormContainer,
  HomeContainer,
  StartCountDownButton,
  StoptCountDownButton,
} from './styles'
import { CountDown } from './components/CountDown'

// const schema = zod.object({
//   minutAmount: zod
//     .number()
//     .min(1, 'Ciclo deve ser minimo de 1 minutos')
//     .max(60, 'Ciclo deve ser maximo 60 minutos'),
//   task: zod
//     .string()
//     .min(2, 'Titulo deve ser de no minimut 2 caracteres')
//     .max(10, 'Titulo deve ser de no máximo 10 caracteres'),
// })

// type NewCicleFormData = zod.infer<typeof schema>

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
  markCurrentCycleAsFinished: () => void
}
export const CycleContext = createContext({} as CycleContextType)

export function Home() {
  // const {
  //   // register,
  //   // handleSubmit,
  //   // watch,
  //   // reset,
  // } = useForm<NewCicleFormData>({
  //   resolver: zodResolver(schema),
  //   defaultValues: {
  //     task: '',
  //     minutAmount: 0,
  //   },
  // })

  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)

  // const task = watch('task')
  // const isDisableTask = !task

  // const handleCreatedNewCicle = (data: NewCicleFormData) => {
  //   const id = String(new Date().getTime())

  //   const newCycle: Cycle = {
  //     id,
  //     task: data.task,
  //     minutAmount: data.minutAmount,
  //     date: new Date(),
  //   }
  //   setCycle((state) => [...state, newCycle])
  //   setActiveCycleId(id)
  //   setAmountsecondsPassed(0)
  //   reset()
  // }

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
      <form /* onSubmit={handleSubmit(handleCreatedNewCicle)} */>
        {/* <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-options"
            placeholder="Dê um nome ao seu projeto"
            disabled={!!activeCycle}
            {...register('task')}
          />
          {errors.task?.message && <p>{errors.task?.message}</p>}

          <datalist id="task-options">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
          </datalist>

          <label htmlFor="minutAmount">durante</label>
          <MinutAmountInput
            type="number"
            id="minutAmount"
            placeholder="00"
            disabled={!!activeCycle}
            {...register('minutAmount', { valueAsNumber: true })}
          />
          {errors.minutAmount?.message && <p>{errors.minutAmount?.message}</p>}

          <span>minutos.</span>
        </FormContainer> */}
        <CycleContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <CountDown />
        </CycleContext.Provider>
        {activeCycle ? (
          <StoptCountDownButton onClick={handleInterruptedcycles} type="button">
            <HandPalm size={24} />
            Interromper
          </StoptCountDownButton>
        ) : (
          <StartCountDownButton /* disabled={isDisableTask} */ type="submit">
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
