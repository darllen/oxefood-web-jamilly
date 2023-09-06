import React from 'react';
import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/formCliente';
import FormEntregador from './views/entregador/formEntregador';
import Home from './views/home/home';
import FormProduto from './views/produto/formProduto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="form-entregador" element={<FormEntregador />} />
            </Routes>
        </>
    )
}

export default Rotas
