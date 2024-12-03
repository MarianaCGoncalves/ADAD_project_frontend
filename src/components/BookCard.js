import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BookCard(props) {
  const classes = ['text-center', 'font-weight-bold']
  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Body>
      <Card.Img variant="top" src= {props.thumbnailUrl}/>
        <h4>{props.title}</h4>
        <Card.Subtitle>{props.authors && props.authors.join(' & ')}</Card.Subtitle>
        <Card.Text>Categories: {props.categories && props.categories.join(' ')}</Card.Text>
        <Card.Text>Page Count: {props.pageCount}</Card.Text>
        <h4 class= 'text-center'>{props.price+'€'}</h4>
        <div class="col-md-12 text-center">
        <Button href={`http://localhost:3000/books/id/${props._id}` + props._id} variant="outline-primary" class="text-center">Open Book</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;