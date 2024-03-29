import { useContext } from 'react'
import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CycleContext } from '../../contexts/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu Historico</h1>
      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <>
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutAmount}</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.date), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="green">Concluido</Status>
                      )}
                      {cycle.interrupDate && (
                        <Status statusColor="red">Interrompido</Status>
                      )}
                      {!cycle.finishedDate && !cycle.interrupDate && (
                        <Status statusColor="yellow">Em andamento</Status>
                      )}
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
