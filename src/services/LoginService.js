import http from "../http-common";
class LoginService{
    postLogin(email,password){
        const data={
            "email":email,
            "mot_passe":password
        }
        return http.post("/Login/Senddata",JSON.stringify(data))
    } 
}
export default new LoginService();