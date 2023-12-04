import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import PessoaService from '../../../services/pessoaService';


class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            nome: '',
            cpf: '',
            dataNascimento: new Date(),
            funcionario: '',
            gerente: ''    
        };
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.service = new PessoaService();
      }

  setGerente = (e) => {
    const teste = document.getElementById(e.target.name).checked;
    this.setState({ gerente: teste });
  }  

  setFuncionario = (e) => {
    const teste = document.getElementById(e.target.name).checked;
    this.setState({ funcionario: teste });
  } 

  handleChangeDate(event) {
    console.log("event", this.state.dataNascimento)
    this.setState({
      dataNascimento: event.target.value
    });
  }

  onChange = (e) => {
    console.log('value>> ', e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    this.service.inserir({
        nome: this.state.nome,
        cpf: this.state.cpf,
        dataNascimento: this.state.dataNascimento,
        funcionario: this.state.funcionario,
        gerente: this.state.gerente
   
    }).then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      }).catch(err => console.log(err))

  }

  submitFormEdit = e => {
    e.preventDefault()
    this.service.atualizar({
        id: this.state.id,
        nome: this.state.nome,
        cpf: this.state.cpf,
        dataNascimento: this.state.dataNascimento,
        funcionario: this.state.funcionario,
        gerente: this.state.gerente
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))

  }

  componentDidMount(){
    if(this.props.item){
      const { id, nome, cpf, dataNascimento, gerente, funcionario } = this.props.item
      this.setState({ id, nome, cpf, dataNascimento, gerente, funcionario })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
        </FormGroup>
        <FormGroup>
          <Label for="cpf">CPF</Label>
          <Input type="text" name="cpf" id="cpf" onChange={this.onChange} value={this.state.cpf === null ? '' : this.state.cpf} placeholder="ex. 000.000.000-00"  />
        </FormGroup>
        <FormGroup>
          <Label for="dataNascimento">Data de Nascimento</Label>
          <Input name="dataNascimento" id="dataNascimento" type="date"
                    onChange={this.handleChangeDate}
                    value={this.state.dataNascimento} 
                    //onSelect={this.state.dataNascimento}
                    />
        </FormGroup>
        <FormGroup>
          <Label for="funcionario">Funcionário</Label>
          <Input type="checkbox"
                 checked={this.state.funcionario}  
                 name="funcionario" id="funcionario" 
                 onChange={e => this.setFuncionario(e)}
                 value={this.state.funcionario}  />
        </FormGroup>
        <FormGroup>
          <Label for="gerente">Gerente</Label>
          <Input type="checkbox" 
                 checked={this.state.gerente}
                 name="gerente" id="gerente" 
                 onChange={e => this.setGerente(e)}
                 value={this.state.gerente}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm