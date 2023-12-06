import React, { Component } from 'react'
import { Table, Button, Input, UncontrolledCollapse } from 'reactstrap'
import ModalForm from '../Modals/Modal'
import SelectMenu from '../../../Components/selectMenu';
import ProjetoService from '../../../services/projetoService'
import currencyFormatter from 'currency-formatter'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GrGroup } from 'react-icons/gr';


class DataTable extends Component {
  constructor(props) {
    super(props);
    this.service = new ProjetoService();
  }

  showSuccesstMessage = (e) => {
    toast.success(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  showErrorMessage = (e) => {
    toast.error(e, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  deleteItem = id => {
    let confirmDelete = window.confirm('Remover registro?')
    
    if(confirmDelete){
        this.service.remover(id)
        .then(response => response.data)
        .then(  
            item => {
                this.props.deleteItemFromState(id);
                this.showSuccesstMessage('Registro removido com sucesso!')
        })
        .catch(err => this.showErrorMessage(err.response.data))
    }
  }

  render() {
    const risco = this.service.getRisco();
    const status = this.service.getStatus();

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id} >
          <th scope="row">{item.id}</th>
          <td>{item.nome}
            <UncontrolledCollapse toggler="#toggler">
                {item.membros.map( membro => {
                  return(
                    <div>
                      <Input type='text' value={membro.nome} />
                   </div>
                  ) 
                })}
            </UncontrolledCollapse>
          </td>
          <td><SelectMenu className="form-control" lista={status} value={item.status} disabled /></td>
          <td><SelectMenu className="form-control" lista={risco} value={item.risco} disabled /></td>
          <td>{currencyFormatter.format(item.orcamento, { locale: 'pt-BR' })}</td>
          <td>
            <div style={{width:"110px"}}>
              <ModalForm buttonLabel="Editar" item={item} updateState={this.props.updateState}  />
              {' '}
              <Button color="danger" onClick={() => this.deleteItem(item.id)}>Remover</Button>
              <ToastContainer style={{ width: "Auto" }} limit={1} />            
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
            <th>Status</th>
            <th>Risco</th>
            <th>Orçamento</th>
            <th id="toggler" onClick={() => {}} >Ações - <GrGroup /> </th>
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
