import React, { Component } from 'react';
import './App.css';
import PokemonList from './PokemonList'
import { sort, show } from './PokemonList'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import InputGroup from 'react-bootstrap/InputGroup'

class App extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Hallo Remon',
      content: <PokemonList />,
      zahl: 0
    }
  }
  handleSubmit() {
    const z = this.state.zahl
    if (z > 0) {
     // show(z)
      this.setState(state => ({
        content: <PokemonList />
      }));
    }
  }
  handlechange(event) {
    const z = event.target.value
    if (z > 0) {
      this.setState(state => ({
        zahl: z
      }));
      show(z)
    }
  }
  handleOnClick_Sort(s) {
    sort(s)
    let str
    if (s == "id") { str = "ID" }
    else if (s == "name") { str = "Name" }
    else if (s == "type") {
      str = "Typ"
    }
    this.setState(state => ({
      message: 'Die Pokemons werden nach ' + str + ' sortiert!',
      content: <PokemonList />
    }));
  }
  render() {
    const { content } = this.state
    return (
      <div>
        <Navbar className="bg-light justify-content-between">
          <Form inline >
            <Form.Control name='zahl' type="text" placeholder="Anzahl der Pokemons" className="mr-sm-2" onChange={this.handlechange.bind(this)} />
            <Button variant="outline-success"
              onClick={this.handleSubmit.bind(this)}
            >Submit</Button>
          </Form>
          <Form >
            <InputGroup>
              <InputGroup.Prepend className="mb-2">
                <InputGroup.Text aria-label="Small" aria-describedby="inputGroup-sizing-sm"><h4>{this.state.message}</h4></InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
            <ButtonToolbar inline='true'>
              <Button variant="outline-success"
                onClick={this.handleOnClick_Sort.bind(this, "id")}
              ><h4>sortiere nach ID</h4></Button>
              <Button variant="outline-success"
                onClick={this.handleOnClick_Sort.bind(this, "name")}
              ><h4>sortiere nach Name</h4></Button>
              <Button variant="outline-success"
                onClick={this.handleOnClick_Sort.bind(this, "type")}
              ><h4>sortiere nach Typ</h4></Button>
            </ButtonToolbar>
          </Form>
        </Navbar>
        <Container>
          <Row className="row-list">
            <Col >
              <div className="App">
                <section className="poke-list">
                  {content}
                </section>
              </div>
            </Col>
          </Row>
        </Container >
      </div>



    );
  }
}


export default App;
