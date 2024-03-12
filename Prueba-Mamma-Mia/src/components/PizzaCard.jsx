import { useContext } from "react"
import { Button, Card, CardGroup, ListGroup } from "react-bootstrap"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"


const PizzaCard = ({pizza, from}) => {
  const {img, ingredients, name, price} = pizza
  const {cart, setCart, formatName} = useContext(AppContext)

  const navigate = useNavigate()

  const addCart = () => {
    const pizzaIndex = cart.findIndex(item => item.id === pizza.id)
    if (pizzaIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === pizzaIndex ? { ...item, count: item.count + 1  } : item
      );
      setCart(updatedCart);
    } else {
      const updatedPizza = { ...pizza, count: 1 };
      const updatedCart = [...cart, updatedPizza ];
      setCart(updatedCart);
    }
  }

  const handleDetail = (name) => {
    navigate(`./${name}`)
  }

  if(from == 'home'){
    return(
      <Card className="h-100">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title className="m-0">{formatName(name)} - ${price}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          {ingredients.map((ing, index) => {
            return (
            <ListGroup.Item key={index}>
              {formatName(ing)}
            </ListGroup.Item>)}
          )}
        </ListGroup>
      </Card>
    )
  }

  if(from == 'pizzas'){
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{formatName(name)}</Card.Title>
            <ul>
              {ingredients.map((ing, index) => {
                return (
                <li key={index}>
                  {formatName(ing)}
                </li>)}
              )}
            </ul>
        </Card.Body>
        <Card.Footer className="text-center d-flex justify-content-between">
          <h4>${price}</h4>
          <div>
            <Button 
              onClick={() => handleDetail(name)}
              size="sm"
              className="me-1 text-white"
              variant="secondary">
                Ver detalles
            </Button>
            <Button onClick={() => addCart()} className='text-white'>
              <i className='bx bxs-cart-add fs-5'></i> Añadir
            </Button>
          </div>
        </Card.Footer>
      </Card>
    )
  }
}

export default PizzaCard