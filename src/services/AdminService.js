import http from "../http-common";
class AdminService{
    GetDemandesUsers(status){
        return http.get("/Register/GetDemandes",{
            params:{
                "status":status
              }
        });
       }
    ChangeStatus(id,status){
        http.get("/Register/Changestatus",{
            params:{
                "id":id,
                "status":status
              }
        })
       }
     GetUserInfos(id){
        return  http.get("/Register/GetUserInfos",{
          params:{
            "id":id.toString()
          }
        })
      }
      GetJustificationUser(id){
        return  http.get("/Upload/getJustif",{
          params:{
            "id":id.toString()
          }
        })
      }
      GetMessagesByCategory(categorie){
        return  http.get("/Discussion/getMails",{
          params:{
            status:categorie.toString()
          }
        })
      }
      GetSpecificMessage(id){
        return  http.get("/Discussion/getMailByID",{
          params:{
            "id":id
          }
        });
      }
      MessageLu(id){
        return  http.get("/Discussion/changeStatus",{
          params:{
            "id":id
          }
        })
      }}
export default new AdminService();