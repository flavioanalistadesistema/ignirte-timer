import { CountdownContainer, Separetor } from './styles'
import { useContext, useEffect, useState } from 'react'

import { CycleContext } from '../..'
import { differenceInSeconds } from 'date-fns'

export function CountDown() {
  const [amountSecondsPassed, setAmountsecondsPassed] = useState(0)
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CycleContext)
  const totalSeconds = activeCycle ? activeCycle.minutAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const amountMinutes = Math.floor(currentSeconds / 60)
  const amountSeconds = currentSeconds % 60

  const minutes = String(amountMinutes).padStart(2, '0')
  const seconds = String(amountSeconds).padStart(2, '0')

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiferents = differenceInSeconds(
          new Date(),
          activeCycle.date,
        )

        if (secondsDiferents >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountsecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setAmountsecondsPassed(secondsDiferents)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}: ${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <>
      <CountdownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separetor>:</Separetor>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
      </CountdownContainer>
    </>
  )
}
