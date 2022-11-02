
import { createStore } from 'framework7'

import GamblingSystem from './utilities/headers'

const system = new GamblingSystem()

const store = createStore({
  state: {
    gambling_system: system,
    result: []
  },
  getters: {
    system({ state }) {
      return state.gambling_system
    },
    history({ state }) {
      return state.gambling_system.history
    },
    money({ state }) {
      return state.gambling_system.money
    },
    assets({ state }) {
      return state.gambling_system.items
    },
    tally({ state }) {
      return state.gambling_system.tally
    },
    rarity({ state }) {
      return state.gambling_system.rarity
    },
    categories({ state }) {
      return state.gambling_system.categories
    },
    result({ state }) {
      return state.result
    },
  },
  actions: {
    roll({ state }) {
      state.result = state.gambling_system.roll()
    },
    empty({ state }) {
      state.result = []
    },
    rollOne({ state }) {
      state.result = state.gambling_system.rollOne()
    },
    rollTen({ state }) {
      state.result = state.gambling_system.rollTen()
    },
    rollMultiple({ state }, limit) {
      state.result = state.gambling_system.rollMultiple(limit)
    },
    addMoney({ state }, mod) {
      state.gambling_system.addMoney(mod)
      state.gambling_system = state.gambling_system
    },
    pay({ state }) {
      state.gambling_system.pay()
      state.gambling_system = state.gambling_system
    },
    payTimes({ state }, mod) {
      state.gambling_system.payTimes(mod <= 0 ? 1 : mod)
      state.gambling_system = state.gambling_system
    },
    save({ state }) {
      state.gambling_system.save()
    },
  },
})


export default store;
