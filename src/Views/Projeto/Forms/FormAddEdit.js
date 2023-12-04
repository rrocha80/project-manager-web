import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import SelectMenu from '../../../Components/selectMenu';
import ProjetoService from '../../../services/projetoService'
import PessoaService from '../../../services/pessoaService'


class AddEditForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: 0,
            nome: '',
            dataInicio: '',
            dataPrevisao: '',
            dataFim: '',
            descricao: '',
            status: '',
            orcamento: '',
            risco: '',
            gerente: '',
            gerentes: [],
            comboGerentes: [] 
        };
          this.handleChangeDate = this.handleChangeDate.bind(this);
          this.service = new ProjetoService();
          this.servicePessoa = new PessoaService();
      }

  handleChangeDate(event) {
    console.log("name>>>", event.target.name)
    console.log("value>>>", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onChange = (e) => {
    console.log('e.target.name', e.target.name)
    console.log('e.target.value', e.target.value)
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    this.service.inserir({
      nome: this.nome,
      dataInicio: this.dataInicio,
      dataPrevisao: this.dataPrevisao,
      dataFim: this.dataFim,
      descricao: this.descricao,
      status: this.status,
      orcamento: this.orcamento,
      risco: this.risco,
      gerente: this.state.gerente
   
    }).then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    this.service.atualizar( {
        id: this.state.id,
        nome: this.state.nome,
        dataInicio: this.state.dataInicio,
        dataPrevisao: this.state.dataPrevisao,
        dataFim: this.state.dataFim,
        descricao: this.state.descricao,
        status: this.state.status,
        orcamento: this.state.orcamento,
        risco: this.state.risco,
        gerente: { id: this.state.gerente.id}
    }).then(response => response.json())
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

  popularComboGerentes(){
    console.log('popular>>', this.state.gerentes)
    if(this.state.comboGerentes <= 0) {
      this.state.gerentes.forEach(element => {
        this.state.comboGerentes.push({label: element.nome, value: element.id})
      })
    }
  }

  getGerentes(){
    this.servicePessoa.findByAttributes({
      gerente: true})
      .then(response =>  {  
        this.setState({gerentes: response.data})
      })
      .catch(err => console.log(err))

  };

  componentDidMount(){
    if(this.props.item){
      const { id,
        nome,
        dataInicio,
        dataPrevisao,
        dataFim,
        descricao,
        status,
        orcamento,
        risco,
        gerente } = this.props.item
      this.setState({ id,
        nome,
        dataInicio,
        dataPrevisao,
        dataFim,
        descricao,
        status,
        orcamento,
        risco,
        gerente })
    }
    this.getGerentes()
    
  }

  render() {

    const risco = this.service.getRisco();
    const status = this.service.getStatus();
    this.popularComboGerentes()
    console.log('this.state.gerente>>', this.state.gerente)

    return (      
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="nome">Nome</Label>
          <Input type="text" name="nome" id="nome" onChange={this.onChange} value={this.state.nome === null ? '' : this.state.nome} />
        </FormGroup>
        <FormGroup>
          <Label for="dataInicio">Data de Início</Label>
          <Input name="dataInicio" id="dataInicio" type="date"
                    onChange={this.handleChangeDate}
                    value={this.state.dataInicio}
                    />
        </FormGroup>
        <FormGroup>
          <Label for="dataPrevisao">Data Previsão</Label>
          <Input name="dataPrevisao" id="dataPrevisao" type="date"
                    onChange={this.handleChangeDate}
                    value={this.state.dataPrevisao}
                    />
        </FormGroup>
        <FormGroup>
          <Label for="dataFim">Data Fim</Label>
          <Input name="dataFim" id="dataFim" type="date"
                    onChange={this.handleChangeDate}
                    value={this.state.dataFim}
                    />
        </FormGroup>
        <FormGroup>
          <Label for="cdescricaof">Descrição</Label>
          <Input type="text" name="descricao" id="descricao" onChange={this.onChange} value={this.state.descricao === null ? '' : this.state.descricao} />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <SelectMenu id="status" name="status" className="form-control" lista={status} value={this.state.status} onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="orcamento">Orçamento</Label>
          <Input type="text" name="orcamento" id="orcamento" onChange={this.onChange} value={this.state.orcamento === null ? '' : this.state.orcamento} />
        </FormGroup>
      
        <FormGroup htmlFor="inputRisco" Label="Risco">
          <Label for="risco">Risco</Label>
          <SelectMenu id="risco" name="risco" className="form-control" lista={risco} value={this.state.risco} onChange={this.onChange} />
        </FormGroup>

        <FormGroup>
          <Label for="gerente">Gerente</Label>
          <SelectMenu id="gerente" name="gerente" className="form-control" 
                      lista={this.state.comboGerentes} 
                      value={this.state.gerente.id} 
                      
                      onChange={this.onChange} />
         </FormGroup>
        
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm