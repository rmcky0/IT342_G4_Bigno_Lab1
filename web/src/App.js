import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* We will add Login and Protected Dashboard routes here */}
      </Routes>
    </Router>
  );
}

export default App;