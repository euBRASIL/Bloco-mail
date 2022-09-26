import { makeAutoObservable, observable, computed, toJS } from 'mobx'
import CommonStore from './common.store'
import ComposeStore from './pages/compose.store'

export class RootStore {
  common = new CommonStore()
  compose = new ComposeStore()

  constructor() {
    makeAutoObservable(this)
  }

  resetStores() {
    this.common = new CommonStore()
    this.compose = new ComposeStore()
  }
}

const rootStore = new RootStore()
export default rootStore
