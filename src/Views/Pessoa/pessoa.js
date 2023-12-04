import React, { Component } from 'react'
import { Container, Row, Col, Input } from 'reactstrap'
import ModalForm from './Modals/Modal'
import DataTable from './Tables/DataTable'
import { CSVLink } from "react-csv"
import Card from '../../Components/card'
import FormGroup from '../../Components/form-group'
import PessoaService from '../../services/pessoaService'

class Pessoa extends Component {
  state = {
    items: [],
    nome: '',
    cpf: '',
    menssagemErro: null
  }

  constructor(){
    super();
    this.service = new PessoaService()
  }

  getLimpar = () => {
    this.setState({ nome: '',  cpf: ''})
  }

  getItems(){
    this.service.findByAttributes({
      nome: this.state.nome,
      cpf: this.state.cpf.replace('-', '').replace('.', '').replace('.', '').trim()
    }).then(response =>  {  
      this.setState({items: response.data})
    })
    .catch(err => this.setState({ menssagemErro: err.response.data}) )
  };

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
      ...this.state.items.slice(0, itemIndex),
      item,
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    return (
      <Container className="Pessoa">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>Pessoa</h1>
          </Col>
        </Row>
        <Row>
          <Card title='Consulta'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='bc-component'>
                  <FormGroup htmlFor="imputNome" label="Nome">
                    <Input type="text" 
                           className="form-control" 
                           id="inputNome" 
                           aria-describedby="nomeHelp" 
                           placeholder="Digite o Nome" 
                           value={this.state.nome}
                           onChange={e => this.setState({nome: e.target.value})}/>
                  </FormGroup>
               </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <div className='bc-component'>
                  <FormGroup htmlFor="imputCpf" label="CPF">
                    <Input type="text" 
                           className="form-control" 
                           id="inputCpf" 
                           aria-describedby="cpfHelp" 
                           placeholder="Digite o CPF" 
                           value={this.state.cpf}
                           onChange={e => this.setState({cpf: e.target.value})} />
                  </FormGroup>
                </div>
              </div>
            </div>
            
  
                  <button type="button" className="btn btn-success" onClick={() => this.getItems()}>Buscar</button>
                  <button type="button" className="btn btn-danger" onClick={() => this.getLimpar()}>Limpar</button>




          </Card>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Cadastrar" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Pessoa
