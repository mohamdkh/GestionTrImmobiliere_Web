import http from "../http-common";
class CommuneService{
    GetCommune(id){
        console.log(id)
        return http.get('/DataCommune/GetData/'+id)
    } 
}
export default new CommuneService();