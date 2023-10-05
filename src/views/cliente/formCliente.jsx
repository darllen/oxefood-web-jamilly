import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom";
import MenuSistema from '../../menuSistema';
import axios from "axios";


export default function FormCliente() {

    const ENDERECO_API = 'http://localhost:8080/api/cliente/';

    const [idCliente, setIdCliente] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();

    const { state } = useLocation();

    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get(ENDERECO_API + state.id)

                .then((response) => {

                    setIdCliente(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                })
        }

    }, [state])

    function salvar() {

        let clienteRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo
        }

        if (idCliente != null) { //Alteração:

            axios.put(ENDERECO_API + idCliente, clienteRequest)
                .then((response) => { console.log('Cliente alterado com sucesso.') })
                .catch((error) => { console.log('Erro ao alter um cliente.') })

        } else { //Cadastro:

            axios.post(ENDERECO_API, clienteRequest)
                .then((response) => { console.log('Cliente cadastrado com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir o cliente.') })
        }

    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }

        const data = dataParam.toString();
        let arrayData = data.split(',');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    {idCliente === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCliente !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cliente &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'>
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    fluid
                                    label='Fone Celular'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                    width={6}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Data Nascimento'
                                    width={6}
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        maskChar={null}
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    maxLength="100"
                                    /* value={rua}
                                    onChange={e => setRua(e.target.value)} */
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Número'
                                    maxLength="100"
                                    width={4}
                                    /* value={numero}
                                    onChange={e => setNumero(e.target.value)} */
                                />
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Bairro'
                                    maxLength="100"
                                    /* value={bairro}
                                    onChange={e => setBairro(e.target.value)} */
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Cidade'
                                    /* value={cidade}
                                    onChange={e => setCidade(e.target.value)} */
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CEP'
                                    width={5}>
                                    <InputMask
                                        required
                                        mask="99999-999"
                                        /* value={cep}
                                        onChange={e => setCep(e.target.value)} */
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Select
                                    fluid
                                    label='UF'
                                    placeholder="Selecione"
                                    options={UFOptions}
                                    /* value={estado}
                                    //onChange={e => setUf(e.target.value)}
                                    onChange={(e, { value }) => { setEstado(value) }} */
                                />
                            </Form.Group>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    /* value={complemento}
                                    onChange={e => setComplemento(e.target.value)} */
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
                                <Link to={'/list-cliente'}>Voltar</Link>
                            </Button>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                <Link to={'/list-cliente'}>Salvar</Link>
                            </Button>

                        </div>

                    </div>

                </Container>
            </div>
        </div>

    );

}

const UFOptions = [
    { key: 'ac', value: 'Acre', text: 'Acre' },
    { key: 'al', value: 'Alagoas', text: 'Alagoas' },
    { key: 'ap', value: 'Amapá', text: 'Amapá' },
    { key: 'am', value: 'Amazonas', text: 'Amazonas' },
    { key: 'ba', value: 'Bahia', text: 'Bahia' },
    { key: 'ce', value: 'Ceará', text: 'Ceará' },
    { key: 'df', value: 'Distrito Federal', text: 'Distrito Federal' },
    { key: 'es', value: 'Espírito Santo', text: 'Espírito Santo' },
    { key: 'go', value: 'Goiás', text: 'Goiás' },
    { key: 'ma', value: 'Maranhão', text: 'Maranhão' },
    { key: 'mt', value: 'Mato Grosso', text: 'Mato Grosso' },
    { key: 'ms', value: 'Mato Grosso do Sul', text: 'Mato Grosso do Sul' },
    { key: 'mg', value: 'Minas Gerais', text: 'Minas Gerais' },
    { key: 'pa', value: 'Pará', text: 'Pará' },
    { key: 'pb', value: 'Paraíba', text: 'Paraíba' },
    { key: 'pr', value: 'Paraná', text: 'Paraná' },
    { key: 'pe', value: 'Pernambuco', text: 'Pernambuco' },
    { key: 'pi', value: 'Piauí', text: 'Piauí' },
    { key: 'rj', value: 'Rio de Janeiro', text: 'Rio de Janeiro' },
    { key: 'rn', value: 'Rio Grande do Norte', text: 'Rio Grande do Norte' },
    { key: 'rs', value: 'Rio Grande do Sul', text: 'Rio Grande do Sul' },
    { key: 'ro', value: 'Rondônia', text: 'Rondônia' },
    { key: 'rr', value: 'Roraima', text: 'Roraima' },
    { key: 'sc', value: 'Santa Catarina', text: 'Santa Catarina' },
    { key: 'sp', value: 'São Paulo', text: 'São Paulo' },
    { key: 'se', value: 'Sergipe', text: 'Sergipe' },
    { key: 'to', value: 'Tocantins', text: 'Tocantins' }
];
