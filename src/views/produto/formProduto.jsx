import React from "react";
import InputMask from 'react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormCliente() {

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified' >

                    <h2> <span style={{ color: 'darkgray' }}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'
                                    maxLength="100"
                                    placeholder="Informe o código do produto">

                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.TextArea
                                    required
                                    fluid
                                    label='Descrição'
                                    maxLength="100"
                                    placeholder="Informe a descrição do produto">
                                </Form.TextArea>
                            </Form.Group>
                            
                            <Form.Group widths='equal' style={{ marginTop: '4%' }}>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor unitário'
                                    maxLength="100"
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Mínima em Minutos'
                                    maxLength="100"
                                    placeholder="30"
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='Tempo de Entrega Máxima em Minutos'
                                    maxLength="100"
                                    placeholder="40"
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
