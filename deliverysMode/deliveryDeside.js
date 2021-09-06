const ODM = require("./deliverys/ODM");
const RDP = require("./deliverys/RDP");
const PKE = require("./deliverys/PKE");
const DHL = require("./deliverys/DHL");
/* new Mailer("PDF GENERADO EXITOSAMENTE","ODM",res.data.urlCartaPorte,resServer) */
module.exports = paqueteras = (pack, req, res) => {
  const deliverys = {
    ["ODM"]: (data) => {
      var document_odm = new ODM();
      document_odm.formatDocument(data, res);
    },
    ["redpack"]: (data) => {
      var document_rdp = new RDP();
      document_rdp.formatDocument(data, res);
    },
    ["paqueteexpress"]: (data) => {
      var document_pke = new PKE();
      document_pke.formatDocument(data, res);
    },
    ["Estafetav2"]: (data) => {
      res.json({ "message": `No hay metodo implementado` });
    },
    ["Dhl Día Siguiente"]: (data) => {
      var document_dhl = new DHL();
      document_dhl.formatDocument(data, res);
    },
    ["Dhl Preferente"]: (data) => {
      var document_dhl = new DHL();
      document_dhl.formatDocument(data, res);
    },
    ["Dhl Estandar"]: (data) => {
      var document_dhl = new DHL();
      document_dhl.formatDocument(data, res);
    }
  };
  pack.shippingData.logisticsInfo.map((vtexInfo) => {
    vtexInfo.deliveryIds.map((delivery) => {
      let deliveryId = delivery.courierName;
      if (typeof deliverys[deliveryId] == "function") {
        deliverys[deliveryId](pack);
        console.log(delivery);
      } else {
        res.json({ "message": `No hay metodo para ${deliveryId}` });
      }
    });
  });
};
