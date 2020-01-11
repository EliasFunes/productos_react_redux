import React from 'react';
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

//redux
import {useDispatch} from "react-redux";
import {borrarProductoAction} from "../actions/productosActions";


const Producto = ({producto}) => {

    const dispatch = useDispatch();

    const handleDelete = id => {
        Swal.fire({
            title: 'Está seguro?',
            text: "No podrá revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {

                Swal.fire(
                    'Eliminado!',
                    'El producto fue eliminado.',
                    'success'
                )

                dispatch(borrarProductoAction(id));
            }
        })
    }

    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">${producto.precio}</span></td>
            <td className="acciones">
                <Link
                    to={`/productos/editar/${producto.id}`}
                    className="btn btn-primary mr-2"
                >Editar</Link>
                <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(producto.id)}
                >Eliminar</button>
            </td>
        </tr>
    );
};

export default Producto;
