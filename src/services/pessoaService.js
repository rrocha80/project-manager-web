import ApiService from "./apiservice";

class PessoaService extends ApiService{
    constructor(){
        super('/v1/pessoa')
    }

    findByAttributes(request){
        return this.post('/byattributes', request)
    }

    remover(id){
        return this.delete(`/delete/${id}`)
    }

    inserir(request){
        return this.post('/insert', request)
    }

    atualizar(request){
        return this.put('/update', request)
    }

    getGerentes(){
        return this.findByAttributes({ gerente: true })
    }

}

export default PessoaService