const axios = require("axios");
const FormData = require("form-data");
const pdf = require("base64topdf");
const Mailer = require("../../mailer/index");
const parseString = require('xml2js').parseString;

class DHL {
    formatDocument(parameterData, responseMethod) {
        // 
        var TemplateXML_DHLEstandar = "";
        // 
        var dataOrder = parameterData,
            items = parameterData.items,
            shippingData = parameterData.shippingData,
            paymentData = parameterData.paymentData,
            storePreferencesData = parameterData.storePreferencesData;
        // 
        var NodeXML_Request_ServiceHeader_MessageTime = "2021-06-18T10:15:33-06:00",
            NodeXML_Request_ServiceHeader_MessageReference = "0000000000000020210618218442",
            NodeXML_Request_ServiceHeader_SiteID = "v62_ykyVpd8ccd",
            NodeXML_Request_ServiceHeader_Password = "ltQUE2tRGx",
            NodeXML_RegionCode = "AM",
            NodeXML_RequestedPickupTime = "Y",
            NodeXML_NewShipper = "Y",
            NodeXML_LanguageCode = "ES",
            NodeXML_Billing_ShipperAccountNumber = "980383984",
            NodeXML_Billing_ShippingPaymentType = "S",
            NodeXML_Consignee_CompanyName = "AGUSTIN BOURS ",
            NodeXML_Consignee_AddressLine1 = "PRIVADA RETORNO, 508 JUAREZ SAN IGN",
            NodeXML_Consignee_AddressLine2 = "ACIO RÍO MUERTO",
            NodeXML_Consignee_City = "SONORA",
            NodeXML_Consignee_PostalCode = "85870",
            NodeXML_Consignee_CountryCode = "MX",
            NodeXML_Consignee_CountryName = "MEXICO",
            NodeXML_Consignee_Contact_PersonName = "AGUSTIN BOURS",
            NodeXML_Consignee_Contact_PhoneNumber = "5555555555",
            NodeXML_Consignee_Contact_Email = "prueba@prueba.com.mx",
            NodeXML_Reference_ReferenceID = "20210618ECOFE218442",
            NodeXML_Reference_ReferenceType = "St",
            NodeXML_ShipmentDetails_Pieces_Piece = "",
            NodeXML_ShipmentDetails_WeightUnit = "K",
            NodeXML_ShipmentDetails_GlobalProductCode = "N",
            NodeXML_ShipmentDetails_LocalProductCode = "N",
            NodeXML_ShipmentDetails_Date = "2021-09-03",
            NodeXML_ShipmentDetails_Contents = "ARTICULOS VARIOS",
            NodeXML_ShipmentDetails_DimensionUnit = "C",
            NodeXML_ShipmentDetails_PackageType = "CP",
            NodeXML_ShipmentDetails_IsDutiable = "N",
            NodeXML_ShipmentDetails_CurrencyCode = "MXN",
            NodeXML_Shipper_ShipperID = "980383984",
            NodeXML_Shipper_CompanyName = "AMERICAN COTTON",
            NodeXML_Shipper_AddressLine1 = "AVENIDA SIEMPREVIVA",
            NodeXML_Shipper_AddressLine2 = "COYOACAN",
            NodeXML_Shipper_City = "Ciudad de México",
            NodeXML_Shipper_Division = "COLONIA, REFERENCIAS ADICIONALES",
            NodeXML_Shipper_PostalCode = "04450",
            NodeXML_Shipper_CountryCode = "MX",
            NodeXML_Shipper_CountryName = "MEXICO",
            NodeXML_Shipper_Contact_PersonName = "MILOS ADRIAN TEODORI PEREZ",
            NodeXML_Shipper_Contact_PhoneNumber = "55555555",
            NodeXML_Shipper_Contact_PhoneExtension = "5555",
            NodeXML_Shipper_Contact_Email = "prueba@prueba.com",
            NodeXML_SpecialService_SpecialServiceType = "II",
            NodeXML_SpecialService_ChargeValue = "2726.00",
            NodeXML_SpecialService_CurrencyCode = "MXN",
            NodeXML_EProcShip = "N",
            NodeXML_LabelImageFormat = "PDF",
            NodeXML_RequestArchiveDoc = "Y",
            NodeXML_NumberOfArchiveDoc = "2",
            NodeXML_Label_LabelTemplate = "8X4_PDF";
        // 
        items.forEach(element => {
            NodeXML_ShipmentDetails_Pieces_Piece += '' +
                '<Piece>' +
                    '<PieceID>' + element.id + '</PieceID>' +
                    '<PackageType>CP</PackageType>' +
                    '<Weight>' + element.additionalInfo.dimension.weight + '</Weight>' +
                    '<Width>' + element.additionalInfo.dimension.width + '</Width>' +
                    '<Height>' + element.additionalInfo.dimension.height + '</Height>' +
                    '<Depth>43</Depth>' +
                '</Piece>' +
            '';
        });
        // 
        TemplateXML_DHLEstandar = '' + 
            '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
            '<req:ShipmentRequest xmlns:req="http://www.dhl.com" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.dhl.com ship-val-global-req.xsd" schemaVersion="10.0">' +
                '<Request>' +
                    '<ServiceHeader>' +
                        '<MessageTime>' + NodeXML_Request_ServiceHeader_MessageTime + '</MessageTime>' +
                        '<MessageReference>' + NodeXML_Request_ServiceHeader_MessageReference + '</MessageReference>' +
                        '<SiteID>' + NodeXML_Request_ServiceHeader_SiteID + '</SiteID>' +
                        '<Password>' + NodeXML_Request_ServiceHeader_Password + '</Password>' +
                    '</ServiceHeader>' +
                '</Request>' +
                '<RegionCode>' + NodeXML_RegionCode + '</RegionCode>' +
                '<RequestedPickupTime>' + NodeXML_RequestedPickupTime + '</RequestedPickupTime>' +
                '<NewShipper>' + NodeXML_NewShipper + '</NewShipper>' +
                '<LanguageCode>' + NodeXML_LanguageCode + '</LanguageCode>' +
                '<Billing>' +
                    '<ShipperAccountNumber>' + NodeXML_Billing_ShipperAccountNumber + '</ShipperAccountNumber>' +
                    '<ShippingPaymentType>' + NodeXML_Billing_ShippingPaymentType + '</ShippingPaymentType>' +
                '</Billing>' +
                '<Consignee>' +
                    '<CompanyName>' + NodeXML_Consignee_CompanyName + '</CompanyName>' +
                    '<AddressLine1>' + NodeXML_Consignee_AddressLine1 + '</AddressLine1>' +
                    '<AddressLine2>' + NodeXML_Consignee_AddressLine2 + '</AddressLine2>' +
                    '<City>' + NodeXML_Consignee_City + '</City>' +
                    '<PostalCode>' + NodeXML_Consignee_PostalCode + '</PostalCode>' +
                    '<CountryCode>' + NodeXML_Consignee_CountryCode + '</CountryCode>' +
                    '<CountryName>' + NodeXML_Consignee_CountryName + '</CountryName>' +
                    '<Contact>' +
                        '<PersonName>' + NodeXML_Consignee_Contact_PersonName + '</PersonName>' +
                        '<PhoneNumber>' + NodeXML_Consignee_Contact_PhoneNumber + '</PhoneNumber>' +
                        '<Email>' + NodeXML_Consignee_Contact_Email + '</Email>' +
                    '</Contact>' +
                '</Consignee>' +
                '<Reference>' +
                    '<ReferenceID>' + NodeXML_Reference_ReferenceID + '</ReferenceID>' +
                    '<ReferenceType>' + NodeXML_Reference_ReferenceType + '</ReferenceType>' +
                '</Reference>' +
                '<ShipmentDetails>' +
                    '<Pieces>' +
                        NodeXML_ShipmentDetails_Pieces_Piece +
                    '</Pieces>' +
                    '<WeightUnit>' + NodeXML_ShipmentDetails_WeightUnit + '</WeightUnit>' +
                    '<GlobalProductCode>' + NodeXML_ShipmentDetails_GlobalProductCode + '</GlobalProductCode>' +
                    '<LocalProductCode>' + NodeXML_ShipmentDetails_LocalProductCode + '</LocalProductCode>' +
                    '<Date>' + NodeXML_ShipmentDetails_Date + '</Date>' +
                    '<Contents>' + NodeXML_ShipmentDetails_Contents + '</Contents>' +
                    '<DimensionUnit>' + NodeXML_ShipmentDetails_DimensionUnit + '</DimensionUnit>' +
                    '<PackageType>' + NodeXML_ShipmentDetails_PackageType + '</PackageType>' +
                    '<IsDutiable>' + NodeXML_ShipmentDetails_IsDutiable + '</IsDutiable>' +
                    '<CurrencyCode>' + NodeXML_ShipmentDetails_CurrencyCode + '</CurrencyCode>' +
                '</ShipmentDetails>' +
                '<Shipper>' +
                    '<ShipperID>' + NodeXML_Shipper_ShipperID + '</ShipperID>' +
                    '<CompanyName>' + NodeXML_Shipper_CompanyName + '</CompanyName>' +
                    '<AddressLine1>' + NodeXML_Shipper_AddressLine1 + '</AddressLine1>' +
                    '<AddressLine2>' + NodeXML_Shipper_AddressLine2 + '</AddressLine2>' +
                    '<City>' + NodeXML_Shipper_City + '</City>' +
                    '<Division>' + NodeXML_Shipper_Division + '</Division>' +
                    '<PostalCode>' + NodeXML_Shipper_PostalCode + '</PostalCode>' +
                    '<CountryCode>' + NodeXML_Shipper_CountryCode + '</CountryCode>' +
                    '<CountryName>' + NodeXML_Shipper_CountryName + '</CountryName>' +
                    '<Contact>' +
                        '<PersonName>' + NodeXML_Shipper_Contact_PersonName + '</PersonName>' +
                        '<PhoneNumber>' + NodeXML_Shipper_Contact_PhoneNumber + '</PhoneNumber>' +
                        '<PhoneExtension>' + NodeXML_Shipper_Contact_PhoneExtension + '</PhoneExtension>' +
                        '<Email>' + NodeXML_Shipper_Contact_Email + '</Email>' +
                    '</Contact>' +
                '</Shipper>' +
                '<SpecialService>' +
                    '<SpecialServiceType>' + NodeXML_SpecialService_SpecialServiceType + '</SpecialServiceType>' +
                    '<ChargeValue>' + NodeXML_SpecialService_ChargeValue + '</ChargeValue>' +
                    '<CurrencyCode>' + NodeXML_SpecialService_CurrencyCode + '</CurrencyCode>' +
                '</SpecialService>' +
                '<EProcShip>' + NodeXML_EProcShip + '</EProcShip>' +
                '<LabelImageFormat>' + NodeXML_LabelImageFormat + '</LabelImageFormat>' +
                '<RequestArchiveDoc>' + NodeXML_RequestArchiveDoc + '</RequestArchiveDoc>' +
                '<NumberOfArchiveDoc>' + NodeXML_NumberOfArchiveDoc + '</NumberOfArchiveDoc>' +
                '<Label>' +
                    '<LabelTemplate>' + NodeXML_Label_LabelTemplate + '</LabelTemplate>' +
                '</Label>' +
            '</req:ShipmentRequest>' +
        '';
        // 
        var config = {
            method: 'GET',
            url: 'https://xmlpi-ea.dhl.com/XMLShippingServlet',
            headers: {
                'Content-Type': 'application/xml'
            },
            data: TemplateXML_DHLEstandar
        };
        // 
        axios(config)
            .then((response) => {
                console.log(response);
                var XMLResponse_DHLEstandar;
                parseString(response.data, (error, result) => {
                    XMLResponse_DHLEstandar = result;
                });
                var file = XMLResponse_DHLEstandar['res:ShipmentResponse'].LabelImage[0].OutputImage[0],
                    name = dataOrder.orderId;
                pdf.base64Decode(file, `./routes/Documents/${name}.pdf`);
                new Mailer("PDF GENERADO EXITOSAMENTE", "DHL", `https://deliveryspackage.herokuapp.com/routes/Documents/${name}.pdf`, responseMethod);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

module.exports = DHL;
