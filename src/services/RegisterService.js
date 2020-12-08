import { data } from "jquery";
import http from "../http-common";
class RegisterService{
    
    saveUser=async(nom,prenom,email,phone,adresse,password,selectedFile)=>{
       const data={
            nom:nom,
            prenom:prenom,
            email:email,
            tel:phone,
            adresse:adresse,
            commune1:localStorage.getItem("commune1").toString(),
            commune2:localStorage.getItem("commune2").toString(),
            commune3:localStorage.getItem("commune3").toString(),
            password:password,
            id_piece_justif:0
        }
        this.UploadFile(selectedFile).then(response =>{
            console.log(response.data)
            data.id_piece_justif=parseInt(response.data);
            let resp=  http.post("/Register/postData",JSON.stringify(data))
            console.log(resp)
        });
      
    }
    UploadFile=async(selectedFile) =>{
        const fd = new FormData();
        fd.append('imageFile', selectedFile, selectedFile.name);
        return await  http.post("/Upload/uploadJustif",fd);
      }
}
export default new RegisterService();