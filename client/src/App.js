import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ExpensePage from './pages/ExpensePage';
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ExpensePage />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
