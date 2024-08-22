import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from './app/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import FlexCenter from "./components/FlexCenter.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PersistGate loading={<FlexCenter><h2>Loading...</h2></FlexCenter>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);
