import {User, Product, TypeProduct} from '../shared/shareddtypes';


//Obtenemos la url de la apirest de Heroku o utilizamos localhost por defecto
let apiEndPoint:string ='http://localhost:5000/'
if(process.env.PORT) {
  apiEndPoint = 'http://dede-es3a-restapi.herokuapp.com/'
}

export async function addUser(user:User):Promise<boolean>{
    let response:Response = await fetch(apiEndPoint+'users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
       // body: JSON.stringify({'user':user.username, 'email':user.email})
      });
    if (response.status===200)
      return true;
    else
      return false;
}

export async function getUsers():Promise<User[]>{
    let response:Response = await fetch(apiEndPoint+'users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

/*
* Metodo que utilizaremos para comprobar si el usuario que intenta logearse, existe en base de datos.
*/
export async function getUser(username : string, password : string): Promise<User | null> {
  const apiPetition:string = apiEndPoint+'users/login/' + username + '/' + password;
  const response:Response = await fetch(apiPetition);
  if(response.status == 500) {
    return null;
  }
  return response.json();
}

export async function getProducts(): Promise<TypeProduct[]> {
  const response:Response = await fetch(apiEndPoint+'products/list');
  return response.json();
}

export async function getProduct(productId : string): Promise<TypeProduct> {
  const apiPetition:string = apiEndPoint+'producto/detalles/' + productId;
  const response:Response = await fetch(apiPetition);
  return response.json();
}