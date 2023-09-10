import React, { useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../menuSistema';
import axios from "axios";


export default function FormEntregador() {
    const UFOptions = [
        { key: 'ac', value: 'ac', text: 'Acre' },
        { key: 'al', value: 'al', text: 'Alagoas' },
        { key: 'ap', value: 'ap', text: 'Amapá' },
        { key: 'am', value: 'am', text: 'Amazonas' },
        { key: 'ba', value: 'ba', text: 'Bahia' },
        { key: 'ce', value: 'ce', text: 'Ceará' },
        { key: 'df', value: 'df', text: 'Distrito Federal' },
        { key: 'es', value: 'es', text: 'Espírito Santo' },
        { key: 'go', value: 'go', text: 'Goiás' },
        { key: 'ma', value: 'ma', text: 'Maranhão' },
        { key: 'mt', value: 'mt', text: 'Mato Grosso' },
        { key: 'ms', value: 'ms', text: 'Mato Grosso do Sul' },
        { key: 'mg', value: 'mg', text: 'Minas Gerais' },
        { key: 'pa', value: 'pa', text: 'Pará' },
        { key: 'pb', value: 'pb', text: 'Paraíba' },
        { key: 'pr', value: 'pr', text: 'Paraná' },
        { key: 'pe', value: 'pe', text: 'Pernambuco' },
        { key: 'pi', value: 'pi', text: 'Piauí' },
        { key: 'rj', value: 'rj', text: 'Rio de Janeiro' },
        { key: 'rn', value: 'rn', text: 'Rio Grande do Norte' },
        { key: 'rs', value: 'rs', text: 'Rio Grande do Sul' },
        { key: 'ro', value: 'ro', text: 'Rondônia' },
        { key: 'rr', value: 'rr', text: 'Roraima' },
        { key: 'sc', value: 'sc', text: 'Santa Catarina' },
        { key: 'sp', value: 'sp', text: 'São Paulo' },
        { key: 'se', value: 'se', text: 'Sergipe' },
        { key: 'to', value: 'to', text: 'Tocantins' }
    ];

    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qEntregasRealizadas, setQEntregasRealizadas] = useState();
    const [valorPorFrete, setValorPorFrete] = useState();
    const [rua, setRua] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [statusAtivo, setStatusAtivo] = useState();
    const [numero, setNumero] = useState();

    function salvar() {

        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qEntregasRealizadas: qEntregasRealizadas,
            valorPorFrete: valorPorFrete,
            rua: rua,
            bairro: bairro,
            cidade: cidade,
            cep: cep,
            uf: uf,
            complemento: complemento,
            statusAtivo: statusAtivo,
        }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.')
            })
            .catch((error) => {
                console.log('Erro ao incluir o um entregador.')
            })
    }

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
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

                                <Form.Input
                                    required
                                    fluid
                                    label='RG'>
                                    <InputMask
                                        required
                                        mask="9999999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                >
                                    <InputMask
                                        required
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/1985"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                    width={30}>
                                    <InputMask
                                        mask="(99) 9999.9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone fixo'
                                    maxLength="100"
                                    width={30}
                                    value={foneFixo}
                                    onChange={e => setFoneFixo(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    value={qEntregasRealizadas}
                                    onChange={e => setQEntregasRealizadas(e.target.value)}

                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                    maxLength="100"
                                    value={valorPorFrete}
                                    onChange={e => setValorPorFrete(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Rua'
                                    maxLength="100"
                                    value={rua}
                                    onChange={e => setRua(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Número'
                                    maxLength="100"
                                    width={4}
                                    value={numero}
                                    onChange={e => setNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Bairro'
                                    maxLength="100"
                                    value={bairro}
                                    onChange={e => setBairro(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Cidade'
                                    value={cidade}
                                    onChange={e => setCidade(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CEP'
                                    width={5}>
                                    <InputMask
                                        required
                                        mask="99999-999"
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Select
                                    fluid
                                    label='UF'
                                    placeholder="Selecione"
                                    options={UFOptions}
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    value={complemento}
                                    onChange={e => setComplemento(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group style={{ marginTop: '4%', paddingLeft: '1%' }}>
                                <h5>Ativo:</h5>
                                <Form.Radio
                                    fluid
                                    label='Sim'
                                    value={statusAtivo}
                                    onChange={e => setStatusAtivo(e.target.value)}
                                />
                                <Form.Radio
                                    fluid
                                    label='Não'
                                    value={statusAtivo}
                                    onChange={e => setStatusAtivo(e.target.value)}
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
                                Voltar
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
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div >
        </div >



    );

}
