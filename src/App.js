import './App.css';
import AddItem from './Components/AddItem';
import ContextProvider from './store/ContextProvider';

function App() {
  return (
    <ContextProvider>
     <AddItem/>
    </ContextProvider>
  );
}

export default App;
