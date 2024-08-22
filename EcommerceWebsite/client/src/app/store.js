import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['setIsLoggedInTrue', 'setIsLoggedInFalse', 'setIsAdminFalse', 'setIsAdminTrue', 'toggleTheme',]
}

const persistedReducer = persistReducer(persistConfig, counterReducer)

const store = configureStore(persistedReducer)

const persistor = persistStore(store)

export { store, persistor }