import { makeAutoObservable, observable, computed, toJS } from 'mobx'
import CommonStore from './common.store'
import ComposeStore from './pages/compose.store'

export class RootStore {
  common = new CommonStore()
  compose = new ComposeStore()

  constructor() {
    makeAutoObservable(this)
  }
}

const rootStore = new RootStore()
export default rootStore
