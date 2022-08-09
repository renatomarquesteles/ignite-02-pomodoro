import { createContext, ReactNode, useState } from 'react'

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

export const CyclesContextProvider = ({
  children,
}: CyclesContextProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const markActiveCycleAsFinished = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedAt: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
  }

  const createNewCycle = (data: CreateCycleData) => {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
  }

  const stopActiveCycle = () => {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedAt: new Date() }
        }
        return cycle
      }),
    )
    setActiveCycleId(null)
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
