import http from "../http-common";
class StatistiqueService{
    StatJournaliereAnnonce(typebien,typeops){
        return  http.get("/Statistique/StatJournaliereAnnonce",{
            params:{
              "typebien":typebien,
              "typeops":typeops
            }
          })
    }
    StatMonsuelAnnonce(typebien,typeops){
      return  http.get("/Statistique/StatMonsuelAnnonce",{
          params:{
            "typebien":typebien,
            "typeops":typeops
          }
        })
  }

  StatJournaliereDemande(){
    return  http.get("/Statistique/StatJournaliereDemande")
}
StatMonsuelDemande(){
  return  http.get("/Statistique/StatMonsuelDemande")
}
StatReaprtition(categorie){
  return  http.get("/Statistique/StatReaprtition",{
      params:{
        "categorie":categorie
      }
    })
}
}
export default new StatistiqueService();