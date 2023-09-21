import React, { useEffect, useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom";
import MenuSistema from '../../../menuSistema';
import axios from "axios";

export default function FormCategoriaProduto() {

    const ENDERECO_API = 'http://localhost:8080/api/produto/categoria/';

    const { state } = useLocation();

    const [idCategoria, setIdCategoria] = useState();
    const [descricao, setDescricao] = useState();

    useEffect(() => {
        if (state !== null && state.id !== null) {

            axios.get(ENDERECO_API + state.id)
                .then((response) => {
                    setIdCategoria(response.data.id)
                    setDescricao(response.data.descricao)
                })
        }
    }, [state])

    function salvar() {

        let categoriaProdutoRequest = {
            descricao: descricao
        }

        if (idCategoria === undefined) { //Cadastro:

            axios.post(ENDERECO_API, categoriaProdutoRequest)
                .then((response) => { console.log('Categoria cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir a categoria.') })

        } else { //Alteração:
            axios.put(ENDERECO_API + idCategoria, categoriaProdutoRequest)
                .then((response) => { console.log('Categoria alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alterar uma categoria.') })
        }
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCategoria === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoria !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    placeholder="Informe uma categoria"
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
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
                                <Link to={'/list-categoria'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()} >
                                <Icon name='save' />
                                <Link to={'/list-categoria'}>Salvar</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div >
        </div >

    );

}