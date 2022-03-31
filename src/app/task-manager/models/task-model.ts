export type Locals = 'en' | 'en-US'

export interface IPiorites {
  label: string,
  value: string
}

export interface ITask {
  idTask?: string,
  taskTitle?: string,
  description?: string,
  duoDate?: string,
  piority?: string,
}
