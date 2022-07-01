const {promises:fs} = require('fs');

class Container{
    constructor(ruta){
        this.ruta = ruta;
    }


    async save(obj){
        const objs = await this.getAll();
        let newId;

        if (objs.Length == 0){
            newId = 1;
        }else {
            newId= objs[objs.length - 1].id + 1;
            const newObjs = {...obj, id: newId};
            objs.push(newObjs);
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 3));
                return newId;
            } catch (error) {
                throw new Error(`Error al guardar: ${error}`);
            }
        }
    }       
    async getByID(id){
        const objs = await this.getAll();
        const obj = objs.find(x => x.id == id);
        return obj;
    }
    async getAll(){
        try{
            const objs = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(objs);
        }catch(error){
            return [];
        }
    }
    async deleteByID(id){
        let collection = [];
        await fs.readFile(`./${this.ruta}`,'utf-8')
        .then( contenido => {
            let col = JSON.parse(contenido)
            for (const ob of col) {
                if(ob.id != id) {
                    collection.push(ob)
                }
            }
        })
        .catch( error => console.log(error));
        await fs.writeFile(`./${this.ruta}`, JSON.stringify(collection));
        console.log('Object delete');
        console.log('==================');

    }
    async deleteAll(){
        await fs.writeFile(`./${this.ruta}`,'');   
        console.log('All objects delete');
    }
}
module.exports= Container;