import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Inform a task'),
  minutesAmount: zod
    .number()
    .min(5, 'The cycle interval must be between 5 and 60 minutes')
    .max(60, 'The cycle interval must be between 5 and 60 minutes'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsPassed, setSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: { task: '', minutesAmount: 0 },
  })

  const handleCreateNewCycle = (data: NewCycleFormData) => {
    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const secondsLeft = activeCycle ? totalSeconds - secondsPassed : 0
  const minutesLeft = Math.floor(secondsLeft / 60)
  const timerSeconds = (secondsLeft % 60).toString().padStart(2, '0')
  const timerMinutes = minutesLeft.toString().padStart(2, '0')
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task">I&apos;ll work on</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Name your project"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Task 1" />
            <option value="Task 2" />
            <option value="Task 3" />
            <option value="Task 4" />
          </datalist>

          <label htmlFor="minutesAmount">during</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{timerMinutes[0]}</span>
          <span>{timerMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{timerSeconds[0]}</span>
          <span>{timerSeconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Start
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
