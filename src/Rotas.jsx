import React from 'react';
import { Route, Routes } from "react-router-dom";

import Home from './views/home/home';
import FormCliente from './views/cliente/formCliente';
import ListCliente from './views/cliente/listCliente';
import FormEntregador from './views/entregador/formEntregador';
import ListEntregador from './views/entregador/listEntregador';
import FormProduto from './views/produto/formProduto';
import ListProduto from './views/produto/listProduto';
import FormCategoriaProduto from './views/produto/categoria/formCategoriaProduto';
import ListCategoriaProduto from './views/produto/categoria/listCategoriaProduto';
import FormCupomDesconto from './views/cupom/formCupomDesconto';
import ListCupomDesconto from './views/cupom/listCupomDesconto';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="form-cliente" element={<FormCliente />} />
                <Route path="form-entregador" element={<FormEntregador />} />
                <Route path="form-produto" element={<FormProduto />} />
                <Route path="form-categoria" element={<FormCategoriaProduto />} />
                <Route path="form-cupom" element={<FormCupomDesconto />} />

                <Route path="list-cliente" element={<ListCliente />} />
                <Route path="list-entregador" element={<ListEntregador />} />
                <Route path="list-produto" element={<ListProduto />} />
                <Route path="list-categoria" element={<ListCategoriaProduto />} />
                <Route path="list-cupom" element={<ListCupomDesconto />} />
            </Routes>
        </>
    )
}

export default Rotas
