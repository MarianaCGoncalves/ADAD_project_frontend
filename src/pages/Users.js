import React, {useState, useEffect} from "react";
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import UserCard from "../components/UserCard";
import Button from 'react-bootstrap/Button';

export default function App() {
    let [users, setUsers] = useState([]);
    let [page, setPage] = useState(1);
    let [totalPgs, setTpgs] = useState([]);

    const getUsers = async (page) => {
      try {
        const response = await fetch('http://localhost:3000/users?page=${page}', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
          },
        });

        const data = await response.json();
        console.log('dados:', data)
        setUsers(data.users);
        setTpgs(data.pages.total);

      } catch (error) {
        console.error('Error:', error);
      }
    }


    useEffect(() => {
      console.log(`Página: ${page}`);
      getUsers(page);
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
      <h2>Users Page</h2>
      <CardGroup>
            <Row xs={1} md={2} className="d-flex justify-content-around">
            {users && users.map((user) => {
                return (
                    <UserCard 
                        key={user._id} 
                        {...user}
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