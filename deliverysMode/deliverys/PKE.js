const axios = require("axios");
const Mailer = require("../../mailer/index")
class PaqueteExpress {
   
  constructor(){
   this.path = "http://qaglp.paquetexpress.mx:7007/RadRestFul/api/rad"; //path de la api
   this.path_pdf =
    "http://qaglp.paquetexpress.mx:8083/wsReportPaquetexpress/GenCartaPorte?trackingNoGen/"; //path de donde se guardan los pdf
  }

  formatDocument(response,resServer) {
    this.token().then(token => {
      var data = {
        header: {
          security: {
            user: "WSACOTTON",
            type: 0,
            token: token,
          },
        },
        body: {
          request: {
            data: [
              {
                billRad: "REQUEST",
                billClntId: "5318520",
                pymtMode: "PAID",
                pymtType: "C",
                comt: "CON ATN PARA JUAN PEREZ",
                radGuiaAddrDTOList: [
                  {
                    addrLin1: "MEXICO",
                    addrLin3: "NUEVO LEON",
                    addrLin4: "APODACA",
                    addrLin5: "APODACA",
                    addrLin6: "PARQUE INDUSTRIAL MULTIPARK",
                    strtName: "AVE. MUNDIAL",
                    drnr: "144",
                    phno1: "11569900",
                    zipCode: "66633",
                    clntName: "CADECO SA DE CV",
                    email: "OJGARCIA@CADECO.COM.MX",
                    contacto: "RAD VOLUMEN RAULITO",
                    addrType: "ORIGIN",
                  },
                  {
                    addrLin1: "México",
                    addrLin3: "Chihuahua",
                    addrLin4: "Las Delicias",
                    addrLin5: "Las Delicias",
                    addrLin6: "Col. Puente de Cantera",
                    strtName: "Fracc. Puente de Alcantara",
                    drnr: "95",
                    phno1: "6391287101",
                    zipCode: "33000",
                    clntName: "CLINICA PRUEBA CHIHUAHUA",
                    email: "clinicaprueba@chihuahua.com.mx",
                    contacto: "DR. JOSE LOPEZ",
                    addrType: "DESTINATION",
                  },
                ],
                radSrvcItemDTOList: [
                  {
                    srvcId: "PACKETS",
                    weight: "2",
                    volL: "30",
                    volW: "20",
                    volH: "40",
                    cont: "VALVULAS",
                    qunt: "1",
                  },
                  {
                    srvcId: "PACKETS",
                    weight: "2",
                    volL: "10",
                    volW: "20",
                    volH: "30",
                    cont: "BOBINAS",
                    qunt: "2",
                  },
                ],
                listSrvcItemDTO: [
                  {
                    srvcId: "EAD",
                    value1: "",
                  },
                  {
                    srvcId: "RAD",
                    value1: "",
                  },
                ],
                typeSrvcId: "STD-T",
                listRefs: [
                  {
                    grGuiaRefr: "ARPEG562",
                  },
                ],
              },
            ],
            objectDTO: null,
          },
          response: null,
        },
      };

      let config = {
        method: "post",
        url: `${this.path}/v1/guia`,
        data: data,
      };

      axios(config)
          .then((res) => {
            var pdfArray = res.data.body.response.objectDTO.split(":");
            var pdf = pdfArray[1];
            console.log(pdfArray)
            new Mailer("PDF GENERADO EXITOSAMENTE","paquetexpress",`http://qaglp.paquetexpress.mx:8083/wsReportPaquetexpress/GenCartaPorte?trackingNoGen/${pdf}`,resServer)
          })
          .catch((e) => {
            console.log(e)
            resServer.json({"message":"error1"})
          });
    }).catch(e => {
      console.log(e)
      resServer.json({"message":"error2"})
    });

  }

  async token() {
    var data = JSON.stringify({
      header: { security: { user: "WSACOTTON", password: "MTIzNA==" } },
    });

    var config = {
      method: "post",
      url: "http://qaglp.paquetexpress.mx:7007/RadRestFul/api/rad/loginv1/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var token = await axios(config)
      .then(function (response) {
        return response.data.body.response.data.token;
      })
      .catch(function (error) {
        return "error";
      });

    return token;
  }
}

module.exports = PaqueteExpress;
