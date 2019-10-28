import React, { Component } from 'react';
import './App.css';
import Pokemon from './Pokemon';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
var str = ''
var n = 150
var isCall = true
var isCached = true
var isLittle = n
var isMore = n
var fixedCach = n
var xxx = 0
function Sort(s) {
    str = s
}
function Show(zahl) {
    //isCall = true
    n = zahl
    if (zahl <= fixedCach) {
        isLittle = zahl
    }
    if (zahl > fixedCach) {
        isMore = zahl
        isCached = true
    }
}
class PokemonList extends Component {
    constructor(data) {
        super(data);
        this.state = {
            cachedPokemonen: [],
            cachedResults: [],
            pokemonen: [],
            results: [],
            pokemon: {},
            isLittle: false,
            isMore: false
        };
    }
    render() {
        if (isCall) {
            this.setState(state => ({
                results: [],
                pokemonen: []
            }));
            fetch(`https://pokeapi.co/api/v2/pokemon?limit=${n}`).then(res => res.json())
                .then((data) => {
                    this.setState(state => ({
                        results: data.results
                    }));
                });
            isCall = false
        }
        if (this.state.results.length > 0) {
            const { results, pokemonen } = this.state;
            results.map((data) => fetch(`${data.url}`).then(res => res.json())
                .then((p) => {
                    const pokemon = new Pokemon(p);
                    this.setState({ pokemon });
                    pokemonen.push(this.state.pokemon)
                }))
            this.setState(state => ({
                results: [],
                cachedPokemonen: pokemonen
            }));
        }
        //////////////Cached objects/////////////////

        if (isLittle <= fixedCach) {
            this.setState(state => ({
                isLittle: true
            }));
            isLittle = fixedCach + 1
        }
        if (isMore > fixedCach) {
            this.setState(state => ({
                isMore: true
            }));
            isMore = fixedCach - 1
        }
        if (this.state.isLittle) { // n < fixedCach
            const p = this.state.pokemonen
            this.setState(state => ({
                cachedPokemonen: []
            }));
            this.setState(state => ({
                cachedPokemonen: p.slice(0, n),
                isLittle: false
            }));
        }
        if (this.state.isMore) { // n > fixedCach
            const c = n - fixedCach
            if(isCached){
                fetch(`https://pokeapi.co/api/v2/pokemon?offset=${fixedCach}&limit=${c}`).then(res => res.json())
                .then((data) => {
                    this.setState(state => ({
                        cachedPokemonen : [],
                        cachedResults : data.results
                    }));
                });
                isCached = false
            }
            if(this.state.cachedResults.length > 0){
                const { cachedResults, pokemonen } = this.state;
               cachedResults.map((data) => fetch(`${data.url}`).then(res => res.json())
                .then((p) => {
                    const pokemon = new Pokemon(p);
                    this.setState({ pokemon });
                    pokemonen.push(this.state.pokemon)
                }))
                this.setState(state => ({
                    cachedPokemonen: pokemonen,
                    cachedResults : [],
                    isMore: false
                }));
            }
           
            
            fixedCach = n
            isLittle = n + 1
            isMore = n - 1
        }
        ///////////////////////////////
        const pokemonen = this.state.cachedPokemonen;

        if (str == "name") {
            pokemonen.sort((a, b) => a.name > b.name)
            str = ''
        }
        if (str == "id") {
            pokemonen.sort((a, b) => a.id > b.id)
            str = ''
        }
        if (str == "type") {
            pokemonen.sort((a, b) => a.type > b.type)
            str = ''
        }
        const content = pokemonen.map((p) =>
            <Card bg="warning" className="detail-view">
                <Card.Img variant="top" className="sprite-image" src={p.sprite} />
                <Card.Body>
                    <Card.Title ><h1 class="text-left"><Badge variant="danger" >Pokemon details</Badge> </h1></Card.Title>
                    <Card.Text>
                        <Container>
                            <Row className='row-card'>
                                <Col xs lg="4"><h2 class="text-left"><Badge variant="secondary">ID:</Badge></h2></Col>
                                <Col><h2 class="text-left"><Badge variant="info">{p.id}</Badge></h2></Col>
                            </Row>
                            <Row>
                                <Col xs lg="4">
                                    <h2 class="text-left"><Badge variant="secondary">Name:</Badge></h2></Col>
                                <Col>
                                    <h2 class="text-left">  <Badge variant="info">{p.name}</Badge></h2></Col>
                            </Row>
                            <Row>
                                <Col xs lg="4"> <h2 class="text-left"><Badge variant="secondary">Typ:</Badge></h2> </Col>
                                <Col> <h2 class="text-left"> <Badge variant="info">{p.type}</Badge></h2></Col>
                            </Row>
                        </Container>

                    </Card.Text>
                </Card.Body>
            </Card>
        )
        return content;
    }
}

export default PokemonList;
export const sort = (e) => { Sort(e) }
export const show = (e) => { Show(e) }