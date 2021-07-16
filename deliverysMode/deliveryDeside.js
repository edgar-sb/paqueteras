const ODM = require("./deliverys/ODM");
const RDP = require("./deliverys/RDP");
const PKE = require("./deliverys/PKE");

module.exports = paqueteras = (pack, req, res) => {
  const deliverys = {
    ["ODM"] : (data)=> {
      var document_odm = new ODM();
      //console.log(document_odm.formatDocument(data));
    },
    ["redpack"] : (data)=> {
      var document_rdp = new RDP();
      //document_rdp.formatDocument(data);
      //console.log(data)
    },
    ["paqueteexpress"] : (data)=> {
      var document_pke = new PKE();
      /* document_pke.formatDocument(data); */
      //console.log(document_pke.formatDocument(data))
    },
    ["Estafetav2"] : (data)=>{
      res.json({"message":`Metodo Estafeta V2`})
    }
  };

  pack.shippingData.logisticsInfo.map((vtexInfo) => {
    vtexInfo.deliveryIds.map((delivery) => {
      let deliveryId = delivery.courierName;
      if (typeof deliverys[deliveryId] == "function") {
        deliverys[deliveryId](pack);
        console.log(delivery)
      } else {
        res.json({"message":`No hay metodo para ${deliveryId}`})
      }
    });
  });
};
