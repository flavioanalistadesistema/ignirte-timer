import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../contexts/CyclesContext'
import { FormContainer, MinutAmountInput, TaskInput } from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        type="text"
        id="task"
        list="task-options"
        placeholder="Dê um nome ao seu projeto"
        disabled={!!activeCycle}
        {...register('task')}
      />

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

      <span>minutos.</span>
    </FormContainer>
  )
}
