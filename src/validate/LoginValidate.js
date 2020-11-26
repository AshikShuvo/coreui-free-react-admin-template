export const LoginValidate=(data)=>{
    //let eReg=new RegExp("^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")
    if(data==undefined|| data.userName==undefined||data.password==undefined){
        return {success:false,error:'All fields are required'}
    }else if(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.userName)!==true){
        return {success:false,error:'User name must be an valid email'}
    }else if(data.password.length<8){
        return {success:false,error:'Password must be more then 8 character'}
    }
    return {success:true, error:''};

}