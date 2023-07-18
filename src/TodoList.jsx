/* eslint-disable no-unused-vars */
import React,{useState, useEffect} from 'react';
import './TodoList.css';
import Icone3 from './assets/icone3.png';


function TodoList() {

    const listaStorage = JSON.parse(localStorage.getItem('lista'));
  
    const [lista, setLista] = React.useState(listaStorage || []); //lista é o estado, setLista é a função que atualiza o estado
    const [novoItem, setNovoItem] = React.useState('');

    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    }, [lista]); //toda vez que a lista for atualizada, o useEffect é chamado, salvando a lista 

    function adicionaItem(event) { 
        event.preventDefault();
        if (novoItem !== '') {
            setLista([...lista,{text:novoItem, isCompleted:false}]);
            setNovoItem('');
            document.getElementById("input-entrada").focus();
        }
    }

    function clicou(index) {
        const copiaLista = [...lista];
        copiaLista[index].isCompleted = !copiaLista[index].isCompleted; //inverte o valor do isCompleted
        setLista(copiaLista); //atualiza a lista
    }

    function deleta(index) {
        const copiaLista = [...lista];
        copiaLista.splice(index, 1); //splice remove um item da lista
        setLista(copiaLista);
    }

    function deletaTudo() {
        const copiaLista = [...lista];
        copiaLista.splice(0, copiaLista.length); //splice remove um item da lista
        setLista(copiaLista);
    }

    return (
     <div>
        <h1>📍Lista de Tarefas📍</h1>
            <form onSubmit={adicionaItem}>
            <input 
                id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(event) => setNovoItem(event.target.value)} // atualiza o valor do input
                placeholder="Digite uma tarefa"
                />
                <button className="add" type="submit">ENVIAR</button>
            </form>
            <div className="listaTarefas">
                {
                    lista.length < 1 ? 
                    <img src={Icone3} alt="icone" className="icone"/>
                    :
                    lista.map((item, index) => (
                        <div 
                        key={index}
                        className={ item.isCompleted ? ' completo' : 'item'}
                        >
                        <span  onClick={()=>{clicou(index)}} className="item">{item.text} </span>
                        <button onClick={() =>{deleta(index)}} className="deletar">DELETAR</button>
                        </div> 
                    ))
                }
                {
                    lista.length > 0 &&
                    <button onClick={() => {deletaTudo()}} className="deletartodos">DELETAR TODOS ITENS</button>
                } 
            </div>
    </div>
    )
}
export default TodoList

