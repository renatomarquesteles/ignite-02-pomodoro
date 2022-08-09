import { useContext, useEffect, useState } from 'react'

import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../../../contexts/CyclesContext'

import { CountdownContainer, Separator } from './styles'

export const Countdown = () => {
  const [secondsPassed, setSecondsPassed] = useState(0)
  const { activeCycle, activeCycleId, markActiveCycleAsFinished } =
    useContext(CyclesContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const secondsLeft = activeCycle ? totalSeconds - secondsPassed : 0
  const minutesLeft = Math.floor(secondsLeft / 60)
  const timerSeconds = (secondsLeft % 60).toString().padStart(2, '0')
  const timerMinutes = minutesLeft.toString().padStart(2, '0')

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {
        if (secondsLeft > 0) {
          setSecondsPassed(
            differenceInSeconds(new Date(), activeCycle.startedAt),
          )
        } else {
          markActiveCycleAsFinished()
          clearInterval(interval)
        }
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [activeCycle, markActiveCycleAsFinished, secondsLeft])

  useEffect(() => {
    setSecondsPassed(0)
  }, [activeCycleId])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${timerMinutes}:${timerSeconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [activeCycle, timerSeconds, timerMinutes])

  return (
    <CountdownContainer>
      <span>{timerMinutes[0]}</span>
      <span>{timerMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{timerSeconds[0]}</span>
      <span>{timerSeconds[1]}</span>
    </CountdownContainer>
  )
}
