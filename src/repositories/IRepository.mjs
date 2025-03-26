class IRepository{

obtenerPorID(id) {
    throw new Error("Método 'obtenerPorId()' no implementado");
}

obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' no implementado");
}
buscarPorAtributo(atributo, valor){
    throw new Error("Método `buscarPorAtributo()` no implementado");
}

obtenerMayoresDe30(){
    throw new Error("Método 'obtenerMayoresDe30()' no implementado");
    }       

}
export default IRepository;

