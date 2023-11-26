sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, models) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {
                const params = {
                    urlParameters: {
                        $expand: "Category"
                    }
                };

                const products = models.getProducts(params);

                products.then((oProductsModel) => {
                    this.getView().setModel(oProductsModel, 'products');

                }).catch((oError) => {
                    MessageBox.error(oError);

                });
            },

            onPress: function (oEvent) {

                // Origem do evento
                const item = oEvent.getSource();

                // Título do item
                const itemTitle = item.getTitle();

                const i18n = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                // Mensagem a ser exibida
                const message = i18n.getText("itemClicked", [itemTitle])

                // Exibe uma mensagem na tela
                MessageBox.information(message, {
                    title: "Informação do item"
                });
            }
        });
    });
