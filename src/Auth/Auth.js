export  const isAuth=()=>{
    //it will check is any token stored in local storage
    //is the token valid
    //if all login credential matches then return true else false

    if(localStorage.getItem('w_auth')!==null){
        return true;
    }
    return false;
}