function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionToggle(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Accordion.Toggle
     
   
      onClick={decoratedOnClick}
    >
      {children}
    </Accordion.Toggle>
  );
}

function Example() {
  return (
    <Accordion >
      <Card>
      
          <CustomToggle eventKey="0">Click me!</CustomToggle>
 
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
          <CustomToggle eventKey="1">Click me!</CustomToggle>
        <Accordion.Collapse eventKey="1">
          <Card.Body>Hello! I'm another body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

render(<Example />);