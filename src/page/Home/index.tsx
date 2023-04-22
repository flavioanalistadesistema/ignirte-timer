import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import * as zod from 'zod'

import {
  HomeContainer,
  LinkRepository,
  StartCountDownButton,
  StoptCountDownButton,
} from './styles'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'

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

export function Home() {
  const { activeCycle, createdNewCicleContext, interruptedCyclesContext } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCicleFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: '',
      minutAmount: 0,
    },
  })
  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreatedNewCycle(data: NewCicleFormData) {
    createdNewCicleContext(data)
    reset()
  }
  const task = watch('task')
  const isDisableTask = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatedNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />
        {activeCycle ? (
          <StoptCountDownButton
            onClick={interruptedCyclesContext}
            type="button"
          >
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

      <LinkRepository href="https://github.com/flavioanalistadesistema/ignirte-timer">
        Repositório do projeto
      </LinkRepository>
    </HomeContainer>
  )
}
