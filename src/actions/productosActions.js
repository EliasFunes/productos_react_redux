import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGAR_PRODUCTOS_EXITOSA,
    DESCARGAR_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    PRODUCTO_EDITAR_EXITO,
    PRODUCTO_EDITAR_ERROR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';

//crear funcion principal - crear un nuevo producto
export function crearNuevoProductoAction(producto) {
    return (dispatch) => {
        dispatch(nuevoProducto());

        //insertar en la api
        clienteAxios.post('/libros', producto)
            .then(respuesta => {
                // Si se inserta correctamente
                dispatch(agregarProductoExito(producto));
            })
            .catch(error => {
                dispatch(agregarProductoError());
            });
    }
}

export const nuevoProducto = () => ({
    type: AGREGAR_PRODUCTO
});

export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});

export const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
});

//Obtener lista de productos (consultar API)

export function obtenerProductosAction() {
    return dispatch => {
        dispatch(obtenerProductosComienzo());

        //consultar la API
        clienteAxios.get('/libros')
            .then(respuesta => {
                dispatch(descargaProductosExitosa(respuesta.data));
            })
            .catch(error => {
                dispatch(descargaProductosError());
            });
    }
}

export const obtenerProductosComienzo = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const descargaProductosExitosa = productos => ({
   type: DESCARGAR_PRODUCTOS_EXITOSA,
   payload: productos
});

export const descargaProductosError = () => ({
    type:DESCARGAR_PRODUCTOS_ERROR
});

//Eliminar productos

export function borrarProductoAction(id) {
    return dispatch => {
        dispatch(obtenerProductoEliminar());

        clienteAxios.delete(`/libros/${id}`)
            .then(respuesta => {
                dispatch(eliminarProductoExito(id));
            })
            .catch(error => {
                dispatch(eliminarProductoError());
            });
    }
}

export const obtenerProductoEliminar = () => ({
    type:OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
    type: PRODUCTO_ELIMINADO_EXITO,
    payload: id
});

export const eliminarProductoError = () => ({
   type: PRODUCTO_ELIMINADO_ERROR
});

//Editar producto

export function obtenerProductoEditarAction(id) {
    return dispatch => {
        dispatch(obtenerProductoEditar());

        clienteAxios.get(`/libros/${id}`)
            .then(respuesta => {
                dispatch(obtenerProductoEditarExito(respuesta.data));
            })
            .catch(error => {
                dispatch(obtenerProductoEditarError());
            });
    }
}

export const obtenerProductoEditar = () => ({
    type: OBTENER_PRODUCTO_EDITAR
});

export const obtenerProductoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const obtenerProductoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
});

/** Modifica un producto en la API y STATE **/
export function editarProductoAction(producto) {
    return dispatch => {
        dispatch(comenzarEdicionProducto());

        clienteAxios.put(`/libros/${producto.id}`, producto)
            .then(respuesta => {
                dispatch(productoEditarExito(respuesta.data));

                Swal.fire('Almacenado',
                    'El producto se actualizó correctamente',
                    'success'
                );

            })
            .catch(error => {
                dispatch(productoEditarError());
            })
    }
}

export const comenzarEdicionProducto = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS
});

export const productoEditarExito = producto => ({
    type: PRODUCTO_EDITAR_EXITO,
    payload: producto
});

export const productoEditarError = () => ({
    type: PRODUCTO_EDITAR_ERROR
});



