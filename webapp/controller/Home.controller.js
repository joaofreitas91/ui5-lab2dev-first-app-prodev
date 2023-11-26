sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel, ODataModel) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {
                const oDataModel = new ODataModel("/northwind/northwind.svc/");

                oDataModel.read("/Products", {
                    success: (oProducts) => {
                        console.log(oProducts);
                        const products = oProducts.results;

                        console.log(products);

                        const oModel = new JSONModel(products);
                        this.getView().setModel(oModel, 'products');
                    },
                    error: (oError) => {
                        MessageBox.error("Erro ao carregar os dados");
                    }
                });
            },

            onPress: function (oEvent) {

                // Origem do evento
                const item = oEvent.getSource();

                // Título do item
                const itemTitle = item.getTitle();

                // Mensagem a ser exibida
                const message = `O item: "${itemTitle}" foi clicado!`;

                // Exibe uma mensagem na tela
                MessageBox.information(message, {
                    title: "Informação do item"
                });
            }
        });
    });
