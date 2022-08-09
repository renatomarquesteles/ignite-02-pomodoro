import { useContext } from 'react'

import { formatDistanceToNow } from 'date-fns/esm'

import { CyclesContext } from '../../contexts/CyclesContext'

import { HistoryContainer, HistoryList, Status } from './styles'

export const History = () => {
  const { cycles } = useContext(CyclesContext)

  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Start</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutes</td>
                <td>
                  {formatDistanceToNow(cycle.startedAt, { addSuffix: true })}
                </td>
                <td>
                  {cycle.finishedAt && <Status status="done">Done</Status>}

                  {cycle.interruptedAt && (
                    <Status status="interrupted">Interrupted</Status>
                  )}

                  {!cycle.finishedAt && !cycle.interruptedAt && (
                    <Status status="in-progress">In progress</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
