import { Button, Card } from "keep-react";

const Product = ({ productData }) => {
  const { title, description, thumbnail, price } = productData;
  return (
    <Card>
      <Card.Header>
        <img src={thumbnail} alt="image" width={600} height={400} />
      </Card.Header>
      <Card.Content className="space-y-3">
        <Card.Title>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Button size="sm" color="primary">
          Buy Now ${price}
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Product;
