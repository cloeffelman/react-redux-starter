import {combineReducers} from 'redux'

const initData = (state = null, action) => {
  switch(action.type){
    default:
      return state
  }
}

const indexReducer = combineReducers({
  initData
})

export {indexReducer}