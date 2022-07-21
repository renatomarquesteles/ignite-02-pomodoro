import { HistoryContainer, HistoryList, Status } from './styles'

export const History = () => {
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
            <tr>
              <td>Task 3</td>
              <td>20 minutes</td>
              <td>6 minutes ago</td>
              <td>
                <Status status="in-progress">In progress</Status>
              </td>
            </tr>
            <tr>
              <td>Task 2</td>
              <td>25 minutes</td>
              <td>32 minutes ago</td>
              <td>
                <Status status="done">Done</Status>
              </td>
            </tr>
            <tr>
              <td>Task 1</td>
              <td>30 minutes</td>
              <td>2 hours ago</td>
              <td>
                <Status status="interrupted">Interrupted</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
