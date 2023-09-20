import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom";
import MenuSistema from '../../menuSistema';
import axios from "axios";

export default function FormProduto() {

    const ENDERECO_API = 'http://localhost:8080/api/produto';

    const { state } = useLocation();

    const [idProduto, setIdProduto] = useState();
    const [titulo, setTitulo] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [valorUnitario, setValorUnitario] = useState();
    const [tempoEntregaMin, setTempoEntregaMin] = useState();
    const [tempoEntregaMax, setTempoEntregaMax] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            
            axios.get(ENDERECO_API + state.id)
                .then((response) => {
                    setIdProduto(response.data.id)
                    setTitulo(response.data.titulo)
                    setCodigo(response.data.codigo)
                    setDescricao(response.data.descricao)
                    setValorUnitario(formatarMoeda(response.data.valorUnitario))
                    setTempoEntregaMin(response.data.tempoEntregaMin)
                    setTempoEntregaMax(response.data.tempoEntregaMax)
                })
        }
    }, [state])


    function salvar() {

        let produtoRequest = {
            titulo: titulo,
            codigo: codigo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMin: tempoEntregaMin,
            tempoEntregaMax: tempoEntregaMax
        }

        if (idProduto = ! null) {
            axios.put(ENDERECO_API + idProduto, produtoRequest)
                .then((response) => { console.log('produto alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um produto.') })
        } else {
            axios.post(ENDERECO_API, produtoRequest)
                .then((response) => { console.log('produto cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o produto.') })
        }

    }

    function formatarMoeda(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined || dataParam === 0) { return '' }

        return dataParam.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >


                    {idProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idProduto !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    placeholder="Informe o título do produto"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'
                                    maxLength="100"
                                    placeholder="Informe o código do produto"
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}>
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.TextArea
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    placeholder="Informe a descrição do produto"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                >
                                </Form.TextArea>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor unitário'
                                    maxLength="100"
                                    value={valorUnitario}
                                    onChange={e => setValorUnitario(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Mínima em Minutos'
                                    maxLength="100"
                                    placeholder="30"
                                    value={tempoEntregaMin}
                                    onChange={e => setTempoEntregaMin(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Máxima em Minutos'
                                    maxLength="100"
                                    placeholder="40"
                                    value={tempoEntregaMax}
                                    onChange={e => setTempoEntregaMax(e.target.value)}
                                />
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                <Link to={'/list-produto'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()} >
                                <Icon name='save' /> Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div >
        </div >

    );

}
