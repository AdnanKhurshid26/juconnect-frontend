export const verifyToken = ()=>{
    const token = localStorage.getItem("token");
    console.log(token)
    if(!token){
        return false
    }

    return true
}

