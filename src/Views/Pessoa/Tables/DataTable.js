import React, { Component } from 'react'
import { Table, Button, Input } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import { cpfMask } from '../../../Utils/mask';
import PessoaService from '../../../services/pessoaService'


class DataTable extends Component {
  constructor(){
    super();
    this.service = new PessoaService();
  }

  deleteItem = id => {
    let confirmDelete = window.confirm('Remover registro?')
    
    if(confirmDelete){
        this.service.remover(id)
        .then(response => response.data)
        .then(  
            item => {
                this.props.deleteItemFromState(id)
        })
        .catch(err => console.log(err))
    }

  }

  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.nome}</td>
          <td>{cpfMask(item.cpf)}</td>
          <td> <Input type="date" value={item.dataNascimento} 
                    disabled/></td>
          <td> <Input type='checkbox' checked={item.funcionario}/></td>
          <td> <Input type='checkbox' checked={item.gerente}/></td>
           
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState}/>
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Remover</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Nascimento</th>
            <th>Funcionário</th>
            <th>Gerente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
