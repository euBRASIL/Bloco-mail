import { makeAutoObservable, observable, computed, toJS } from 'mobx'
import CommonStore from './common.store'
import ComposeStore from './pages/compose.store'
import PresaleStore from './pages/presale.store'

export class RootStore {
  common = new CommonStore()
  compose = new ComposeStore()
  presale = new PresaleStore()

  constructor() {
    makeAutoObservable(this)
  }

  resetStores() {
    this.common = new CommonStore()
    this.compose = new ComposeStore()
    this.presale = new PresaleStore()
  }
}

const rootStore = new RootStore()
export default rootStore
