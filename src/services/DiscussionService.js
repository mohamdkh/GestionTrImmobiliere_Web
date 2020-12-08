import http from "../http-common";
class Discussion{
    SendEmail(nom,email,tel,message){
        const request={
            "nom":nom,
            "email":email,
            "tel":tel,
            "message":message
        }
        return http.post("/Discussion/Send",JSON.stringify(request))
    } 
}
export default new Discussion();