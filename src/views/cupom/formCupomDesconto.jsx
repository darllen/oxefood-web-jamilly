import axios from "axios";
import React, { useEffect, useState } from "react";
import InputMask from 'react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../menuSistema';
import { mensagemErro, notifyError, notifySuccess } from '../../views/util/Util';

export default function FormCupomDesconto(){

    const ENDERECO_API = 'http://localhost:8080/api/cupom/';

    const { state } = useLocation();

    //const [idCupomDesconto, setIdCupomDesconto] = useState();
    const [codigoDesconto, setCodigoDesconto] = useState();
    const [percentualDesconto, setPercentualDesconto] = useState();
    const [valorDesconto, setValorDesconto] = useState();
    const [valorMinimoPedidoPermitido, setValorMinimoPedidoPermitido] = useState();
    const [quantidadeMaximaUso, setQuantidadeMaximaUso] = useState();
    const [inicioVigencia, setInicioVigencia] = useState([]);
    const [fimVigencia, setFimVigencia] = useState();

    useEffect(() => {

        if (state != null && state.id != null) {
            axios.get(ENDERECO_API + state.id)
                .then((response) => {
                    //setIdCupomDesconto(response.data.id)
                    setCodigoDesconto(response.data.codigoDesconto)
                    setPercentualDesconto(response.data.percentualDesconto)
                    setValorDesconto(response.data.valorDesconto)
                    setValorMinimoPedidoPermitido(response.data.valorMinimoPedidoPermitido)
                    setQuantidadeMaximaUso(response.data.quantidadeMaximaUso)
                    setInicioVigencia(formatarData(response.data.inicioVigencia))
                    setFimVigencia(formatarData(response.data.fimVigencia))
                })
        }

    }, [state])

    function salvar() {
        let cupomDescontoRequest = {
            codigoDesconto: codigoDesconto,
            percentualDesconto: percentualDesconto,
            valorDesconto: valorDesconto,
            valorMinimoPedidoPermitido: valorMinimoPedidoPermitido,
            quantidadeMaximaUso: quantidadeMaximaUso,
            inicioVigencia: inicioVigencia,
            fimVigencia: fimVigencia,
        }

        axios.post( ENDERECO_API, cupomDescontoRequest)
            .then((response) => { notifySuccess('Cupom cadastrado com sucesso.') })
            .catch((error) => { 
                if (error.response) {
                    notifyError(error.response.data.errors[0].defaultMessage)
                } else {
                    notifyError(mensagemErro)
                }
             })
    }

    function formatarData(dataParam) {
        const data = dataParam.toString();

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = data.split(',');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }
    

    return (
        <div>
            <MenuSistema />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >
                    <h2> <span style={{ color: 'darkgray' }}> Cupom de Desconto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='flex' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Código'
                                    maxLength="100"
                                    value={codigoDesconto}
                                    width={9}
                                    onChange={e => setCodigoDesconto(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Percentual Desconto'
                                    maxLength="100"
                                    value={percentualDesconto}
                                    width={5}
                                    onChange={e => setPercentualDesconto(e.target.value)}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Valor Desconto'
                                    maxLength="100"
                                    value={valorDesconto}
                                    width={5}
                                    onChange={e => setValorDesconto(e.target.value)}>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Mínimo Permitido para o Pedido'
                                    maxLength="100"
                                    value={valorMinimoPedidoPermitido}
                                    onChange={e => setValorMinimoPedidoPermitido(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Quantidade Máxima de Uso por Cliente'
                                    maxLength="100"
                                    value={quantidadeMaximaUso}
                                    onChange={e => setQuantidadeMaximaUso(e.target.value)}>
                                </Form.Input>
                            </Form.Group>
                            <Form.Group widths='flex' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Início da Vigência'
                                    width={4}>
                                    <InputMask
                                        required
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/01/2005"
                                        value={inicioVigencia}
                                        onChange={e => setInicioVigencia(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fim da Vigência'
                                    width={4}>
                                    <InputMask
                                        required
                                        mask="99/99/9999"
                                        placeholder="Ex: 20/03/2005"
                                        value={fimVigencia}
                                        onChange={e => setFimVigencia(e.target.value)}
                                    />
                                </Form.Input>
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
                                    <Link to={'/list-cupom'}>Voltar</Link>
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
                                    <Link to={'/list-cupom'}>Salvar</Link>
                                </Button>
                            </div>
                        </div>
                </Container>
            </div>
        </div>

);


}