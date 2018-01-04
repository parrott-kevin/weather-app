import { Dispatch } from 'redux'
import { IExtendedError } from './api'
export const SERVER_ERROR = 'SERVER_ERROR'
export const REQUEST_WEATHER = 'REQUEST_WEATHER'
export const RECEIVE_WEATHER = 'RECEIVE_WEATHER'
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS'
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS'
export const QUERY_LOCATION = 'QUERY_LOCATION'
export const CLEAR_QUERY = 'CLEAR_QUERY'

interface IGatherActions {
  request: string,
  receive: string,
  error?: string
}

export function gather (actions: IGatherActions, apiPromise: Promise<object>) {
  actions.error = SERVER_ERROR
  return (dispatch: Dispatch<any>) => {
    dispatch(request(actions.request))
    return apiPromise
      .then((json: object) => {
        return dispatch(receive(actions.receive, json))
      })
      .catch((err: IExtendedError) => {
        dispatch(serverError(err))
      })
  }
}

export function request (type: string) {
  return { type }
}

export interface IReceive {
  type: string,
  response: any,
  receivedAt: string
}
export function receive (type: string, response: object) {
  return {
    type,
    response,
    receivedAt: (new Date()).toJSON().toString(),
  }
}

export function serverError ({ ok, status, message }: IExtendedError) {
  return {
    type: SERVER_ERROR,
    ok,
    status,
    message,
  }
}

export interface IQueryLocation {
  type: string,
  query: string
}
export function queryLocation (query: string) {
  return {
    type: QUERY_LOCATION,
    query,
  }
}

export function clearQuery () {
  return { type: CLEAR_QUERY }
}
