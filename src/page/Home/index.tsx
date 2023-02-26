import { Play } from 'phosphor-react'
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
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome ao seu projeto"
          />

          <label htmlFor="minutAmount">durante</label>
          <MinutAmountInput type="number" id="minutAmount" placeholder="00" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>
        <StartCountDownButton disabled type="submit">
          <Play size={24} />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
