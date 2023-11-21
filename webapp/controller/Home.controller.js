sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, JSONModel) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {
                //Simulando uma lista de produtos
                const products = [
                    { title: "Arroz", counter: 5 },
                    { title: "Feijão", counter: 8 },
                    { title: "Macarrão", counter: 10 },
                    { title: "Óleo de Cozinha", counter: 3 },
                    { title: "Leite", counter: 7 },
                    { title: "Café", counter: 4 },
                    { title: "Açúcar", counter: 6 },
                    { title: "Sal", counter: 2 },
                    { title: "Farinha de Trigo", counter: 9 },
                    { title: "Sabonete", counter: 11 }
                ];

                // Cria um modelo JSON com os produtos (JSONModel)
                const oModel = new JSONModel(products);

                // Define o modelo com o nome "products" e fazendo a ligação com a view (Aggregation Binding)
                this.getView().setModel(oModel, "products");

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
