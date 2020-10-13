import 'core-js/stable'; 

import React from 'react'; 
import ReactDom from 'react-dom'; 

import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'; 
import storage from 'redux-persist/lib/storage'; 
import { Provider } from 'react-redux'; 
import thunk from 'redux-thunk'; 
import { PersistGate } from 'redux-persist/integration/react'; 

import reducer from 'shared/store/index'; 

const middleware = [thunk]; 

const persistConfig = { 
    key: 'root', 
    storage
}

const persistedReducer = persistReducer(persistConfig, reducer); 

const store = createStore(
    persistedReducer, 
    applyMiddleware(...middleware)
)

let persistor = persistStore(store); 

import App from 'App'; 

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, 
document.getElementById('root')); 