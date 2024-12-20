import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Book from "./pages/Book";
import User from './pages/User'; // Componente User
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/users" element={<Users />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/user/:id" element={<User />} /> {/* Página User */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
