import ApiService from "./apiservice";

class ProjetoService extends ApiService{
    constructor(){
        super('/v1/projeto')
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

    getRisco(){ 
        return [
            { label: '--Selecione--', value: '' },
            { label: 'Baixo', value: 'BAIXO_RISCO' },
            { label: 'Médio', value: 'MEDIO_RISCO' },
            { label: 'Alto', value: 'ALTO_RISCO' },
        ]
    }

    getStatus(){ 
        return [
            { label: '--Selecione--', value: '' },
            { label: 'Em análise', value: 'EM_ANALISE' },
            { label: 'Análise realizada', value: 'ANALISE_REALIZADA' },
            { label: 'Análise aprovada', value: 'ANALISE_APROVADA' },
            { label: 'Iniciado', value: 'INICIADO' },
            { label: 'Planejado', value: 'PLANEJADO' },
            { label: 'Em andamento', value: 'EM_ANDAMENTO' },
            { label: 'Encerrado', value: 'ENCERRAMENTO' },
            { label: 'Cancelado', value: 'CANCELADO' },
        ]
    }

}

export default ProjetoService