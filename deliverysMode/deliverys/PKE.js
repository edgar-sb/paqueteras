const axios = require("axios");
const Mailer = require("../../mailer/index");
class PaqueteExpress {
  keyword = "odm"; //nombre clave de la paquetera

  path = "http://qaglp.paquetexpress.mx:7007/RadRestFul/api/rad"; //path de la api
  path_pdf =
    "http://qaglp.paquetexpress.mx:8083/wsReportPaquetexpress/GenCartaPorte?trackingNoGen/"; //path de donde se guardan los pdf

  formatDocument(response, resServer) {
    let addres = response.shippingData.address;
    var deliverys = response.shippingData.logisticsInfo;
    this.token()
      .then((token) => {
        deliverys.map((i)=>{
          let dimensions = response.items[deliverys[i].itemIndex].additionalInfo.dimension;
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
                        addrLin1: "México",
                        addrLin3: "CIUDAD DE MÉXICO",
                        addrLin4: "",
                        addrLin5: "",
                        addrLin6: "MEX Doctor José María Vertiz 1168 1",
                        strtName: "INDEPENDENCIA",
                        drnr: "S/N",
                        phno1: "",
                        zipCode: "03630",
                        clntName: "EUROCOTTON",
                        email: "pruebas@eurocotton.com",
                        contacto: "",
                        addrType: "ORIGIN",
                      },
                      {
                        addrLin1: "",
                        addrLin3: addres.city,
                        addrLin4: addres.state,
                        addrLin5: addres.street,
                        addrLin6: addres.neighborhood,
                        strtName: "",
                        drnr: "S/N",
                        phno1: response.clientProfileData.phone,
                        zipCode: addres.postalCode,
                        clntName: `${response.clientProfileData.firstName}  ${response.clientProfileData.lastName}`,
                        email: `${response.clientProfileData.email}`,
                        contacto: `${response.clientProfileData.firstName}  ${response.clientProfileData.lastName}`,
                        addrType: "DESTINATION",
                      },
                    ],
                    radSrvcItemDTOList: [
                      {
                        srvcId: "",
                        weight: `${dimensions.weigth}`,
                        volL: `${dimensions.length}`,
                        volW: `${dimensions.weigth}`,
                        volH: `${dimensions.height}`,
                        cont: ``,
                        qunt: ``,
                      }
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
              console.log(pdfArray);
              new Mailer(
                "PDF GENERADO EXITOSAMENTE",
                "paquetexpress",
                `http://qaglp.paquetexpress.mx:8083/wsReportPaquetexpress/GenCartaPorte?trackingNoGen/${pdf}`,
                resServer
              );
            })
            .catch((e) => {
              console.log(e);
              resServer.json({ message: "error1" });
            });


        });
      })
      .catch((e) => {
        console.log(e);
        resServer.json({ message: "error2" });
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
