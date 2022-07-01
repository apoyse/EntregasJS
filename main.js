class Usuario{
    constructor(nombre, apellido, libros, mascotas, ){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascotas(mascota){
        this.mascotas.push(mascota)
    }
    countMascotas(){
        return this.mascotas.length
    }
    addBook(nombre,autor){
        this.libros.push({
            nombre:nombre,
            autor:autor
        }
        )}
    
        getBookNames(){
            return this.libros.map(libro => libro.nombre)
        }

}
let persona = new Usuario('Andres','Poysegu',[],[])

persona.addMascotas('reyna')
persona.addBook({'Harry':"Potter"})
console.log(persona.mascotas)
console.log(persona.getBookNames())
console.log(persona.countMascotas())
