import React, { Component } from 'react'
import { Table, Button, Input, UncontrolledCollapse } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import SelectMenu from '../../../Components/selectMenu';
import ProjetoService from '../../../services/projetoService'


class DataTable extends Component {
  constructor(props) {
    super(props);
    this.service = new ProjetoService();
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
    const risco = this.service.getRisco();
    const status = this.service.getStatus();

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.nome}
            <UncontrolledCollapse toggler="#toggler">
                {item.membros.map( membro => {
                  return(
                   
                    <div>
                      <p></p>
                   <p>{membro.nome}</p>
                   </div>
                  ) 
                }
                )}
            </UncontrolledCollapse>
          </td>
          <td><Input type="date" value={item.dataInicio} 
                    disabled/></td>
          <td> <Input type="date" value={item.dataFim} 
                    disabled/></td>
          <td><SelectMenu className="form-control" lista={status} value={item.status} disabled /></td>
          <td><SelectMenu className="form-control" lista={risco} value={item.risco} disabled /></td>
          <td>
            <div style={{width:"110px"}}>
            <Button color="primary"  id="toggler" style={{ marginBottom: '1rem' }}>Membros</Button>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState}  />
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
            <th>Data Início</th>
            <th>Data Fim</th>
            <th>Status</th>
            <th>Risco</th>
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
