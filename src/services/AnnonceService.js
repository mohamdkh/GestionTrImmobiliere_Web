import http from "../http-common";
import Swal from 'sweetalert2'
class AnnonceService{
    GetAllTypeOperation(){
        return http.get('/Annonce/GetTypeOps')
    } 
    GetAllTypeBien(){
        return http.get('/Annonce/GetTypeBiens')
    } 
    UploadFile(selectedFile,id) {
        const fd = new FormData();
         fd.append('imageFile', selectedFile);
         fd.append('id_annonce',Number.parseInt(id));
         return   http.post("/Upload/uploadImageBien/",fd
           
        );
      }
    SendData(Annonce,AllTypeBien,AllTypeOperation){
        let type_bien
        let type_ops
        AllTypeBien.forEach(elem=>{
            if(elem.type==Annonce.type_bien){
                type_bien=elem.id
            }
        })
        AllTypeOperation.forEach(elem=>{
            if(elem.type==Annonce.type_operation){
                type_ops=elem.id
            }
        })
        const data={
            "id":Annonce.id,
            "type_bien":type_bien,
            "type_operation":type_ops,
            "surface":Annonce.surface,
            "prix":Annonce.prix,
            "description":Annonce.description,
            "nom_complet_proprietaire":Annonce.nom_complet_proprietaire,
            "telephone":Annonce.telephone,
            "email":Annonce.email
        }
        http.post("Annonce/PostData",JSON.stringify(data)).then(result=>{
            if(result==true){
                console.log("sucess")
            }
        })
      }
      GetAnnonces(id_intermmediaire){
          return http.get("Annonce/GetAnnonces",{
              params:{
                idintermmediaire:id_intermmediaire
              }
          })
      }
      GetImagesAnnonce(id_annonce){
        return http.get("Upload/getImageBien",{
            params:{
                idannonce:id_annonce
            }
        }) 
      }
      GetAnnonceDetail(id_annonce){
        return http.get("Annonce/GetAnnonce",{
            params:{
                idannonce:id_annonce
            }
        }) 
      }
      AffectationAnnonceToInterm(id_intermediaire,id_annonce){
        const data={
            "id_annonce":id_annonce,
            "id_intermediaire":id_intermediaire
        }
        http.post("Annonce/Affectation",JSON.stringify(data)).then(result=>{
            if(result.data==true){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "L'annonce N°"+id_annonce+" est affectée à vous! consulter vos annonces",
                    showConfirmButton: false,
                    timer: 2000
                  }).then(
                    window.location.reload(false)
                  )
            }
        })
      }
      GetAnnoncesIntermmadiaire(id_intermmediaire){
        return http.get("Annonce/GetAnnoncesIntermmediaire",{
            params:{
              idintermmediaire:id_intermmediaire
            }
        })
    }
    GetAllAnnonces(){
        return http.get("Annonce/GetAllAnnonces")
    }
    GetAcceptsAnnonces(){
        return http.get("Annonce/GetAcceptsAnnonces")
    }
    changeStatutAnnonce(id,status){
        const data={
            "id":id,
            "status":status
        }
        Swal.fire({
            title: 'êtes-vous sûr de vouloir continuer?',
            text: "Tu ne pourras pas revenir en arrière après cette opération!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: "annuler",
            confirmButtonText: 'Oui!'
        }).then((result) => {
            if (result.isConfirmed) {
                http.post("Annonce/ChangeStatusAnnonce",JSON.stringify(data)).then(
                    (result)=>{
                        if(result.data==true){
                            Swal.fire(
                                'Action detectée!',
                                "opération est bien passée",
                                'success'
                            ).then(
                                window.location.reload(false)
                            )
                        }
                    }
                )
               
            }
        })
       
    }
    DemandeAnnonce(id_annonce){
        let nom,tel,email
        Swal.fire({
            title: 'Envoyer une demande',
                focusConfirm: false,
                html: `
                    <input class="swal2-input" id="nom" type="text" placeholder="Votre nom et prénom" /><br />
                    <input class="swal2-input" id="tel" type="text" placeholder="Votre numéro de téléphone" /><br />
                    <input class="swal2-input" id="email" type="text" placeholder="Votre email" />
                `,
                type: 'warning',
                showCancelButton: true,
                cancelButtonColor: 'grey',
                confirmButtonText: 'Update!',
                allowOutsideClick: false,
                preConfirm: () => {
                    nom= document.getElementById('nom').value
                    tel=document.getElementById('tel').value
                    email= document.getElementById('email').value
                    const data={
                        "nom_demandeur":nom,
                        "tel":tel,
                        "email":email,
                        "id_annonce":id_annonce
                    }
                    http.post("Annonce/SendDemande",JSON.stringify(data)).then(
                        (result)=>{
                            if(result.data==true){
                                Swal.fire(
                                    'Action detectée!',
                                    "opération est bien passée",
                                    'success'
                                )
                            }
                        }
                    )
                    
                }
          })
    }
}
export default new AnnonceService();