import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function UserCard(props) {
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Body>
        <Card.Title>{props.first_name} {props.last_name}</Card.Title>
        <Card.Text>
          <div><strong>Profissão:</strong> {props.job}</div>
          <div><strong>Número de Avaliações:</strong> {props.reviews.length}</div>
        </Card.Text>
        <Link to={`/user/${props._id}`}>
          <Button variant="outline-primary">Open User</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
