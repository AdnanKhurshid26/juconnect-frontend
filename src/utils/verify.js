export const verifyToken = ()=>{
    const token = localStorage.getItem("token");
    if(!token){
        return false
    }

    return true
}

