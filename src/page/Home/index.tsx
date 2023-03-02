import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  FormContainer,
  HomeContainer,
  CountdownContainer,
  Separetor,
  StartCountDownButton,
  TaskInput,
  MinutAmountInput,
} from './styles'

export function Home() {
  const { register, handleSubmit, watch } = useForm()
  const handleCreatedNewCicle = (data: any) => {
    console.log(data)
  }

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

          <label htmlFor="minutAmount">durante</label>
          <MinutAmountInput
            type="number"
            id="minutAmount"
            placeholder="00"
            {...register('minutAmount', { valueAsNumber: true })}
          />

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
