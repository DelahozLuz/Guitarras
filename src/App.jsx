import { useState,useEffect } from "react"
import Guitar from "./components/guitar"
import Header from "./components/Header"
import { db } from "./db/bd"




function App() {
const inicialcart =() => {
  const localStoragecart = localStorage.getItem('cart')
  return localStoragecart ? JSON.parse(localStoragecart) : []
}

const [data,setdata] = useState(db)
const [cart,setcart] = useState(inicialcart)
const minimo=1
 useEffect(() =>{
  localStorage.setItem('cart', JSON.stringify(cart))
 },[cart])

function addtocart(item) {
  const itemExists = cart.findIndex((guitar) => guitar.id === item.id);

  if (itemExists >= 0) {
    const updatedCart = [...cart];
    updatedCart[itemExists].quantity = (updatedCart[itemExists].quantity || 1) + 1;
   
    setcart(updatedCart);
  } else {
    const itemWithQuantity = { ...item, quantity: 1 };
    setcart((prevCart) => [...prevCart, itemWithQuantity]);
  }
  savelocalstorage()
}
//console.log(data)
function removefroncart(id){
  setcart(prevCart => prevCart.filter(guitar => guitar.id !== id))
}
function incrementando(id){
 const uupdtecart = cart.map(item =>{
  if(item.id ===id ){
    return{
      ...item,
      quantity: item.quantity +1
    }
  }
  return item
 })
 setcart(uupdtecart)
}
function disminuendo(id){
  const updatedCart = cart.map(item =>{
    if (item.id === id && item.quantity >minimo){
      return{
        ...item,
        quantity: item.quantity -1
      }
    }
    return item
  })
  setcart(updatedCart)
}
function eliminar(item) {
 setcart([])
 
}

  return (
    <>
   <Header
   cart={cart}
   removefroncart={removefroncart}
   incrementando={incrementando}
   disminuendo ={disminuendo}
   eliminar ={eliminar}
   />


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar)=> (
             <Guitar 
             key={guitar.id}
             guitar={guitar}
             setcart={setcart}
             addtocart={addtocart}
           
             />

          ))}
         
        
          
        </div>
    </main>
    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

     
    </>
  )
}

export default App
