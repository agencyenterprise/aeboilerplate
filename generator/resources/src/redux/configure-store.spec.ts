import { configureStore } from './configure-store'

describe('configure store', () => {
  it('lists all reducers registered when getting state', () => {
    const store = configureStore()

    expect(Object.keys(store.getState()).length).toBeGreaterThanOrEqual(1)
  })
})
