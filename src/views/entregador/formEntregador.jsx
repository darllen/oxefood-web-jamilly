import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import { Link, useLocation } from "react-router-dom";
import MenuSistema from '../../menuSistema';
import axios from "axios";
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

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



export default function FormEntregador() {

    const [idEntregador, setIdEntregador] = useState();
    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [rg, setRg] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [qEntregasRealizadas, setQEntregasRealizadas] = useState();
    const [valorPorFrete, setValorPorFrete] = useState();
    const [statusAtivo, setStatusAtivo] = useState();
    const [rua, setRua] = useState();
    const [bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [numero, setNumero] = useState();


    const { state } = useLocation();

    useEffect(() => {

        if (state != null && state.id != null) {

            axios.get("http://localhost:8080/api/entregador/" + state.id)

                .then((response) => {

                    setIdEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setRg(response.data.rg)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setQEntregasRealizadas(response.data.qEntregasRealizadas)
                    setValorPorFrete(response.data.valorPorFrete)
                    setRua(response.data.rua)
                    setBairro(response.data.bairro)
                    setCidade(response.data.cidade)
                    setCep(response.data.cep)
                    setUf(response.data.uf)
                    setComplemento(response.data.complemento)
                    setStatusAtivo(response.data.statusAtivo)
                    setNumero(response.data.numero)
                })
        }

    }, [state])

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
            numero: numero,
        }

        if (idEntregador != null) { //Alteração:

            axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
                .then((response) => { notifySuccess('Entregador alterado com sucesso.') })
                .catch((error) => { error.response ? notifyError(error.response.data.errors[0].defaultMessage) : notifyError(mensagemErro);
                })

        } else { //Cadastro:

            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
                .then((response) => { notifySuccess('Entregador cadastrado com sucesso.') })
                .catch((error) => { error.response ? notifyError(error.response.data.errors[0].defaultMessage) : notifyError(mensagemErro);})
        }

    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }

        const data = dataParam.toString();
        let arrayData = data.split(',');
        let arrayDataFormatada = [];

        arrayData.forEach((str) => {
            if (str.length === 1){
                str = '0' + str;
            }
            arrayDataFormatada.push(str)
          });
        return arrayDataFormatada[2] + '/' + arrayDataFormatada[1] + '/' + arrayDataFormatada[0];
    }


    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified' >

                    {idEntregador === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idEntregador !== undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }



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
                                        value={formatarData(dataNascimento)}
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
                                    //onChange={e => setUf(e.target.value)}
                                    onChange={(e, { value }) => { setUf(value) }}
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
                                <Link to={'/list-entregador'}>Voltar</Link>
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
                                <Link to={'/list-entregador'}>Salvar</Link>
                            </Button>
                        </div>
                    </div>
                </Container>
            </div >
        </div >



    );

}