import { StrictMode } from "react";
import "./index.css";
import Todo from "./todo";
import "./todo.css";
import Taskbar from "./taskbar";
import { Provider } from "react-redux";
import { store } from './app/store'


const App = () => {
  
    return <Provider store={store}>
      <Todo />
    </Provider>
};
export default App;
