import { configureStore } from '@reduxjs/toolkit'
import codereducer from '../redux/slice'

export const store = configureStore({
      reducer : codereducer
})