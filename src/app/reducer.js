import { createReducer } from '@reduxjs/toolkit'
import { addTask, deleteTask, updateTask, checkTask, fetchTasks } from './action'

export const taskReducer = createReducer([], (builder) => {
	builder.addCase(addTask, (state, action) => {
		return [...state, action.payload]
	})

	builder.addCase(deleteTask, (state, action) => {
		return state.filter((task) => task.id !== action.payload)
	})

	builder.addCase(updateTask, (state, action) => {
		return state.map((task) => {
			if (task.id === action.payload.id) {
				return action.payload
			}
			return task
		})
	})

	builder.addCase(checkTask, (state, action) => {
		return state.map((task) => {
			if (task.id === action.payload) {
				return { ...task, status: task.status === 0 ? 1 : 0 }
			}
			return task
		})
	})

	builder.addCase(fetchTasks.fulfilled, (state, action) => {
		return action.payload
	})
})
