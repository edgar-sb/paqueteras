var express = require("express");
var router = express.Router();
var axios = require("axios");
var FormData = require("form-data");
//remesa?order_id=1143693399500-01&tipo_de_envio_id=S
router.get("/remesa", (req, res, next) => {
  var order_id = req.query.order_id; // resivimos por parametro get el id de la orden
  var tipo_de_envio_id = req.query.tipo_de_envio_id // tipo de envio P, S ,
  var data = new FormData();

  var config = {
    method: "get",
    url: `http://eurocotton.vtexcommercestable.com.br/api/oms/pvt/orders/${order_id}`,
    headers: {
      "X-VTEX-API-AppKey": "vtexappkey-eurocotton-PSTXNG",
      "X-VTEX-API-AppToken":
        "CYXDBWUMZYMPNVRYJORWEXGNBBMQUJWTNQFLKBAKRMVDKXCIDEDEALOESJCZJERQBSBXQFOINGFRBDDDYDMPFSTCCATBZABMUFBRWFSYQVQUFWDPGYBFRBKJZZUPLNIM",
      "Content-Type": "application/json",
      Cookie: "janus_sid=d0423c81-9459-4e1f-98ef-9ab57253e2a3",
      ...data.getHeaders(),
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      var envios = response.data.items.length;
      var data = JSON.stringify({
        usuario: "amecotweb",
        password: "cotton2021",
        nombreorigen: "EuroCotton",
        rfcorigen: "NODECLARADO",
        direccionorigen: "CIUDAD DE MÉXICO MEX Doctor José María Vertiz 1168 1",
        coloniaorigen: "INDEPENDENCIA",
        cporigen: "03630",
        correoorigen: "pruebas@eurocotton.com",
        telefonoorigen: "525543774538",
        nombredestino: response.data.clientProfileData.firstName + ' ' + response.data.clientProfileData.lastName,
        rfcdestino: "Nodeclarado",
        direcciondestino: "CALLE 14 3",
        coloniadestino: "Reforma Social",
        cpdestino: response.data.shippingData.address.postalCode,
        correodestino: response.data.clientProfileData.email,
        telefonodestino: response.data.clientProfileData.phone,
        tipoentrega: 1,
        tipoenvio: tipo_de_envio_id,
        envios: envios,
        numeropedido: order_id,
        referencia: "Nodeclarado",
        codigomercancia: 34,
        largo: 3000,
        alto: 3000,
        ancho: 300,
        peso: 1,
        valordeclarado: response.data.totals[0].value,
      });

      var config = {
        method: "post",
        url: "https://webservice.odmexpress.com.mx/odmexpress/Remesa",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (resP) {
          res.send(JSON.stringify(resP.data));
        })
        .catch(function (error) {
          res.render("error", { message: "" });
        });
    })
    .catch(function (error) {
      res.render("error", { message: error });
    });
});

router.get("/test", (req, res, next) => {
  res.redirect("remesa?id=1143693399500&tipo_de_envio_id=S");
});

module.exports = router;
