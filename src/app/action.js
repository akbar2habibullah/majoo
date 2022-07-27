import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const addTask = createAction('ADD_TASK')
export const deleteTask = createAction('DELETE_TASK')
export const updateTask = createAction('UPDATE_TASK')
export const checkTask = createAction('CHECK_TASK')

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
	const response = await fetch('https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list')
	return await response.json()
})
