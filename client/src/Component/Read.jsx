import { useState } from "react"
import { useEffect } from "react"
import Swal from 'sweetalert2';


const Read = () => {

    const [user,setUser] = useState([])

    const InputHAndel = e =>{
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const result = {name,email}
        console.log(result);
        
        fetch('http://localhost:5000/users',{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
        },
          body: JSON.stringify(result) 
        })
        .then(res => res.json())
        .then( data =>{
            console.log(data);
        })
    }

    useEffect(()=>{
        fetch('http://localhost:5000/users',{
          method: "GET",
        })
        .then(res => res.json())
        .then( data =>{
            console.log(data);
            setUser(data);
        })
    },[])
    const DEleteItem = id =>{
         Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this!",
      icon: "warning",
      showCancelButton: true, 
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Coffee has been deleted.",
                "success"
              );
            }
          })
          .catch(error => {
            console.error(error);
            Swal.fire(
              "Error!",
              "Something went wrong.",
              "error"
            );
          });
      }
    });
        
    }

  return (
    <div>
        <form onSubmit={InputHAndel}>
            <input type="text" name="name"  /><br />
            <input type="text" name="email"  /><br />
            <input type="submit" value="add" />
        </form>

        <div>
            <h2>item length : {user.length}</h2>
            {
                user.map( item => (
                    <h3 key={item._id}>
                        {item.name} <button onClick={() => DEleteItem(item._id)}>x</button>
                        
                    </h3>
                ))
            }
        </div>
    </div>
  )
}

export default Read