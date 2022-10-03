import { createContext, ReactNode, useReducer } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startedAt: Date
  finishedAt?: Date
  interruptedAt?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextInterface {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  cycles: Cycle[]
  markActiveCycleAsFinished: () => void
  createNewCycle: (data: CreateCycleData) => void
  stopActiveCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextInterface)

interface CyclesContextProviderProps {
  children: ReactNode
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            activeCycleId: action.payload.newCycle.id,
          }
        case 'STOP_ACTIVE_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, interruptedAt: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }
        case 'MARK_ACTIVE_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.activeCycleId) {
                return { ...cycle, finishedAt: new Date() }
              }
              return cycle
            }),
            activeCycleId: null,
          }
        default:
          return state
      }
    },
    {
      cycles: [],
      activeCycleId: null,
    },
  )

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markActiveCycleAsFinished = () => {
    dispatch({
      type: 'MARK_ACTIVE_CYCLE_AS_FINISHED',
      payload: { activeCycleId },
    })
  }

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatch({ type: 'CREATE_NEW_CYCLE', payload: { newCycle } })
  }

  const stopActiveCycle = () => {
    dispatch({ type: 'STOP_ACTIVE_CYCLE', payload: { activeCycleId } })
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        cycles,
        markActiveCycleAsFinished,
        createNewCycle,
        stopActiveCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
