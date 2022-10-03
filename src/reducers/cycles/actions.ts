import { Cycle } from './reducer'

/* eslint-disable no-unused-vars */
export enum ActionTypes {
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  STOP_ACTIVE_CYCLE = 'STOP_ACTIVE_CYCLE',
  MARK_ACTIVE_CYCLE_AS_FINISHED = 'MARK_ACTIVE_CYCLE_AS_FINISHED',
}
/* eslint-enable no-unused-vars */

export const createNewCycleAction = (newCycle: Cycle) => {
  return { type: ActionTypes.CREATE_NEW_CYCLE, payload: { newCycle } }
}

export const markActiveCycleAsFinishedAction = () => {
  return { type: ActionTypes.MARK_ACTIVE_CYCLE_AS_FINISHED }
}

export const stopActiveCycleAction = () => {
  return { type: ActionTypes.STOP_ACTIVE_CYCLE }
}
