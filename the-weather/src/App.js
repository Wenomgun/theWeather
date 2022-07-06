import './App.css';
import {WeatherDisplay} from "./features/counter/WeatherDisplay";
import {Provider} from "react-redux";
import store from "./store/store"

function App() {
  return (
      <Provider store={store}>
        <div className="App">
          <WeatherDisplay />
        </div>
      </Provider>
  );
}

export default App;
