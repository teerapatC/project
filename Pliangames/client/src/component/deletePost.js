import Axios from "axios"
const deletePost = (id,image) =>{
    Axios.delete(`/deletepost/${id}/${image}`)
    .then(res => {
        console.log(res)
        window.location.reload()
    })
    .catch(err => console.log(err))
}

export default deletePost