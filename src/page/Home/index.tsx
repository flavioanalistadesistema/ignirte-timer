import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import { useState } from 'react'
import * as zod from 'zod'

import {
  FormContainer,
  HomeContainer,
  CountdownContainer,
  Separetor,
  StartCountDownButton,
  TaskInput,
  MinutAmountInput,
} from './styles'

const schema = zod.object({
  minutAmount: zod
    .number()
    .min(10, 'Ciclo deve ser minimo de 11 minutos')
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
}

export function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewCicleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutAmount: 0,
    },
  })

  const [cycle, setCycle] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const handleCreatedNewCicle = (data: NewCicleFormData) => {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutAmount: data.minutAmount,
    }
    setCycle((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset()
  }

  const activeCycle = cycle.find((cycle) => cycle.id === activeCycleId)
  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const amountMinutes = Math.floor(currentSeconds / 60)
  const amountSeconds = currentSeconds % 60

  const minutes = String(amountMinutes).padStart(2, '0')
  const seconds = String(amountSeconds).padStart(2, '0')

  const task = watch('task')
  const isDisableTask = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatedNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome ao seu projeto"
            {...register('task')}
          />
          {errors.task?.message && <p>{errors.task?.message}</p>}

          <label htmlFor="minutAmount">durante</label>
          <MinutAmountInput
            type="number"
            id="minutAmount"
            placeholder="00"
            {...register('minutAmount', { valueAsNumber: true })}
          />
          {errors.minutAmount?.message && <p>{errors.minutAmount?.message}</p>}

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separetor>:</Separetor>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>
        <StartCountDownButton disabled={isDisableTask} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
