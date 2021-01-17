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
    SendData(stateObject){
        let type_bien
        let type_ops
        stateObject.AllTypeBien.forEach(elem=>{
            if(elem.type==stateObject.Annonce.type_bien){
                type_bien=elem.id
            }
        })
        stateObject.AllTypeOperation.forEach(elem=>{
            if(elem.type==stateObject.Annonce.type_operation){
                type_ops=elem.id
            }
        })
        const data={
            "type_bien":type_bien,
            "type_operation":type_ops,
            "surface":stateObject.Annonce.surface,
            "prix":stateObject.Annonce.prix,
            "description":stateObject.Annonce.description,
            "nom_complet_proprietaire":stateObject.Annonce.nom_complet_proprietaire,
            "telephone":stateObject.Annonce.telephone,
            "email":stateObject.Annonce.email,
            "lon":stateObject.Annonce.lon,
            "lat":stateObject.Annonce.lat
        }
        http.post("Annonce/PostData",JSON.stringify(data)).then(result=>{
         if(result.data!=null){
            stateObject.selectedFiles.map((item)=>{
                this.UploadFile(item,result.data)
            })
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
                cancelButtonText:'Annuler',
                cancelButtonColor: 'grey',
                confirmButtonText: 'Envoyer',
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
    GetDemandes(id){
        return http.get("Annonce/getDemandes",{
            params:{
                idannonce:id
            }
        })
    }
    ValiderDemande(id){
        Swal.fire({
            title: 'Voulez-vous vraiment valider cette demande ?',
            showDenyButton: true,
            confirmButtonText: `Oui`,
            denyButtonText: `Annuler`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                http.get("Annonce/ValiderDemande",{
                    params:{
                        iddeamande:id
                    }
                }).then(result=>{
                    Swal.fire('Succession !', '', 'success')
                })
             
            } 
          })
       
    }
    GetAllPictures(){
        return http.get("Upload/GetPhotoBien");
    }
}
export default new AnnonceService();