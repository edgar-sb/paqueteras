const axios = require("axios");
const FormData = require("form-data");
const pdf = require("base64topdf");
const Mailer = require("../../mailer/index");
const parseString = require('xml2js').parseString;

class DHL {
    formatDocument(parameterData, responseMethod) {
        // 
        var stringDHLEstandar = "";
        // 
        var items = parameterData.items,
            shippingData = parameterData.shippingData,
            paymentData = parameterData.paymentData,
            storePreferencesData = parameterData.storePreferencesData;
        // 
        var NodeXML_ServiceHeader_MessageTime = "2002-08-20T11:28:56.000-08:00",
            NodeXML_ServiceHeader_MessageReference = "1234567890123456789012345678901",
            NodeXML_ServiceHeader_SiteID = "v62_ykyVpd8ccd",
            NodeXML_ServiceHeader_Password = "ltQUE2tRGx",
            NodeXML_MetaData_SoftwareName = "3PV",
            NodeXML_MetaData_SoftwareVersion = "1.0",
            NodeXML_From_CountryCode = "MX",
            NodeXML_From_Postalcode = "03630",
            NodeXML_BkgDetails_PaymentCountryCode = "MX",
            NodeXML_BkgDetails_Date = new Date().toISOString(),
            NodeXML_BkgDetails_ReadyTime = "PT10H21M",
            NodeXML_BkgDetails_ReadyTimeGMTOffset = "+01:00",
            NodeXML_BkgDetails_DimensionUnit = "CM",
            NodeXML_BkgDetails_WeightUnit = "KG",
            NodeXML_BkgDetails_Pieces = "",
            NodeXML_BkgDetails_IsDutiable = "Y",
            NodeXML_BkgDetails_NetworkTypeCode = "MX",
            NodeXML_BkgDetails_InsuredValue = "555.000",
            NodeXML_BkgDetails_InsuredCurrency = "EUR",
            NodeXML_To_CountryCode = "US",
            NodeXML_To_Postalcode = "86001",
            NodeXML_Dutiable_DeclaredCurrency = "EUR",
            NodeXML_Dutiable_DeclaredValue = "234.0";
        // 
        items.forEach(element => {
            NodeXML_BkgDetails_Pieces += '<Piece>\n          <PieceID>' + element.id + '</PieceID>\n          <Height>' + element.additionalInfo.dimension.height + '</Height>\n          <Depth>20</Depth>\n          <Width>' + element.additionalInfo.dimension.width + '</Width>\n          <Weight>' + element.additionalInfo.dimension.weight + '</Weight>\n        </Piece>\n      ';
        });
        //
        stringDHLEstandar = '<?xml version="1.0" encoding="utf-8"?>\n<p:DCTRequest xmlns:p="http://www.dhl.com" xmlns:p1="http://www.dhl.com/datatypes" xmlns:p2="http://www.dhl.com/DCTRequestdatatypes" schemaVersion="2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.dhl.com DCT-req.xsd ">\n  <GetCapability>\n    <Request>\n      <ServiceHeader>\n        <MessageTime>' + NodeXML_ServiceHeader_MessageTime + '</MessageTime>\n        <MessageReference>' + NodeXML_ServiceHeader_MessageReference + '</MessageReference>\n\t\t<SiteID>' + NodeXML_ServiceHeader_SiteID + '</SiteID>\n\t\t<Password>' + NodeXML_ServiceHeader_Password + '</Password>\n      </ServiceHeader>\n\t  <MetaData>\n\t\t\t<SoftwareName>' + NodeXML_MetaData_SoftwareName + '</SoftwareName>\n\t\t\t<SoftwareVersion>' + NodeXML_MetaData_SoftwareVersion + '</SoftwareVersion>\n\t\t</MetaData>\n    </Request>\n    <From>\n      <CountryCode>' + NodeXML_From_CountryCode + '</CountryCode>\n      <Postalcode>' + NodeXML_From_Postalcode + '</Postalcode>\n    </From>\n    <BkgDetails>\n      <PaymentCountryCode>' + NodeXML_BkgDetails_PaymentCountryCode + '</PaymentCountryCode>\n      <Date>' + NodeXML_BkgDetails_Date + '</Date><ReadyTime>' + NodeXML_BkgDetails_ReadyTime + '</ReadyTime>\n      <ReadyTimeGMTOffset>' + NodeXML_BkgDetails_ReadyTimeGMTOffset + '</ReadyTimeGMTOffset>\n      <DimensionUnit>' + NodeXML_BkgDetails_DimensionUnit + '</DimensionUnit>\n      <WeightUnit>' + NodeXML_BkgDetails_WeightUnit + '</WeightUnit>\n      <Pieces>\n        ' + NodeXML_BkgDetails_Pieces + '</Pieces>      \n      <IsDutiable>' + NodeXML_BkgDetails_IsDutiable + '</IsDutiable>\n      <NetworkTypeCode>' + NodeXML_BkgDetails_NetworkTypeCode + '</NetworkTypeCode>\n      <InsuredValue>' + NodeXML_BkgDetails_InsuredValue + '</InsuredValue>\n      <InsuredCurrency>' + NodeXML_BkgDetails_InsuredCurrency + '</InsuredCurrency>\n    </BkgDetails>\n    <To>\n      <CountryCode>' + NodeXML_To_CountryCode + '</CountryCode>\n      <Postalcode>' + NodeXML_To_Postalcode + '</Postalcode>\n    </To>\n   <Dutiable>\n      <DeclaredCurrency>' + NodeXML_Dutiable_DeclaredCurrency + '</DeclaredCurrency>\n      <DeclaredValue>' + NodeXML_Dutiable_DeclaredValue + '</DeclaredValue>\n    </Dutiable>\n  </GetCapability>\n</p:DCTRequest>\n';
        // 
        var config = {
            method: 'post',
            url: 'https://xmlpi-ea.dhl.com/XMLShippingServlet',
            headers: {
                'Content-Type': 'application/xml'
            },
            data: stringDHLEstandar
        };
        // 
        axios(config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = DHL;
