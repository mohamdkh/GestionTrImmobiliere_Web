import http from "../http-common";
class IntermediaireService{
    ChangePassword(id,password){
        const data={
            "id":id,
            "mot_passe":password
        }
        return http.post("/Login/ChangePassword",JSON.stringify(data))
    } 
}
export default new IntermediaireService();