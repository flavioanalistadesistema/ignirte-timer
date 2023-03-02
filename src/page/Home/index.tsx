import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

export function Home() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  })

  const handleCreatedNewCicle = (data: any) => {
    console.log('teste aqui')
  }
  console.log(errors)

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
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountDownButton disabled={isDisableTask} type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
