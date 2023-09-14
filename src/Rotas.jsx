import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/formCliente';
import FormEntregador from './views/entregador/formEntregador';
import ListEntregador from './views/entregador/listEntregador';
import ListCliente from './views/cliente/listCliente';
import Home from './views/home/home';
import FormProduto from './views/produto/formProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="form-entregador" element={<FormEntregador />} />
                <Route path="list-entregador" element={ <ListEntregador/> } />
            </Routes>
        </>
    )
}

export default Rotas
