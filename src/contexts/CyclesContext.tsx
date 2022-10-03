import { createContext, ReactNode, useEffect, useReducer } from 'react'

import {
  createNewCycleAction,
  markActiveCycleAsFinishedAction,
  stopActiveCycleAction,
} from '../reducers/cycles/actions'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

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

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storedStateAsJSON = localStorage.getItem(
        '@pomodoro-timer:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@pomodoro-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markActiveCycleAsFinished = () => {
    dispatch(markActiveCycleAsFinishedAction())
  }

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    dispatch(createNewCycleAction(newCycle))
  }

  const stopActiveCycle = () => {
    dispatch(stopActiveCycleAction())
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
