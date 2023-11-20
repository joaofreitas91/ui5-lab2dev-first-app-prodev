sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {

            },

            onPress: function (oEvent) {

                // Origem do evento
                const item = oEvent.getSource();

                // Título do item
                const itemTitle = item.getTitle();

                // Mensagem a ser exibida
                const message = `O item: "${itemTitle}" foi clicado!`;

                // Exibe uma mensagem na tela
                MessageToast.show(message);
            }
        });
    });
