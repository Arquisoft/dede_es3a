import React from 'react';
import { render, screen } from "@testing-library/react";
import { TypeProduct } from '../../shared/shareddtypes';
import Shoes from '../../components/Home/Shoes';
import {ObjectId} from 'bson';

test('check that Shoes is rendering propertly', async() => {
    const strObject : ObjectId = new ObjectId("62598df82841d14b30fbd6b1");
    const products: TypeProduct[] = [{
        _objectId: strObject,
        id: "1b",
        imagen: "https://i.imgur.com/dHfRXIu.jpg",
        nombre: "Adidas Pixar",
        precio: 119.99,
        descripcion: "Zapatilla con personajes de Pixar animacion"
    }];
    
    render(<Shoes products={products}/>);

    const nombre = screen.getAllByText(products[0].nombre);
    expect(nombre).toBeInTheDocument();
    const precio1 = screen.getAllByText("Precio:");
    expect(precio1).toBeInTheDocument();
    const precio2 = screen.getAllByText(products[0].precio);
    expect(precio2).toBeInTheDocument();
});