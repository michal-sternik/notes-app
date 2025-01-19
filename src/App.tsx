
import './App.css'
import RootLayout from './RootLayout/RootLayout'
import { Provider } from 'react-redux';
import { store } from './Redux/store';

function App() {

  return (
    <Provider store={store}>

      <RootLayout />
    </Provider>
  )
}

export default App
