import React, {useState, useEffect} from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import BookCard from "../components/BookCard";

export default function App() {
  let [books, setBooks] = useState([]);
  let [page, setPage] = useState(1);
  let [totalPgs, setTpgs] = useState([]);

  const getBooks = async (page) => {
    try {
      const response = await fetch(`http://localhost:3000/books?page=${page}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
      });
      
      const data = await response.json();
      console.log(data)
      setBooks(data.books);
      setTpgs(data.pages.total);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getBooks(page);
  }, [page]);

  const handlePreviousPg = () => { 
    if (page > 1) {
       setPage(page - 1); } 
  } 

  const handleNextPg = () => { 
    if (page < totalPgs) {
       setPage(page + 1); } 
  }

  return (
    <div className="container pt-5 pb-5">
        <h2>Books</h2>
        <CardGroup>
            <Row xs={1} md={2} className="d-flex justify-content-around">
            {books && books.map((book) => {
                return (
                    <BookCard 
                        key={book._id} 
                        {...book}
                    />
                );
            })}
            </Row>
        </CardGroup>
        <div className="d-flex justify-content-between mt-3"> 
        <Button onClick={handlePreviousPg} disabled={page == 1}>Página Anterior</Button> 
        <span>Página {page} de {totalPgs}</span> 
        <Button onClick={handleNextPg} disabled={page == totalPgs}>Próxima página</Button>
        </div>
    </div>
  )
}