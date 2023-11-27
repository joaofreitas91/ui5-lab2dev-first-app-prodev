sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, models, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            onInit: function () {
                const params = {
                    urlParameters: {
                        $expand: "Category"
                    }
                };

                const products = models.getProducts(params);

                const list = this.byId("list");

                list.setBusy(true);

                products
                    .then((oProductsModel) => {
                        this.getView().setModel(oProductsModel, 'products');

                    })
                    .catch((oError) => {
                        MessageBox.error(oError);

                    })
                    .finally(() => {
                        list.setBusy(false);
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
            },

            onSearch: function (oEvent) {
                // add filter for search
                const aFilters = [];
                const sQuery = oEvent.getSource().getValue();

                if (sQuery && sQuery.length > 0) {
                    const filter = new Filter("ProductName", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }

                // update list binding
                const oList = this.byId("list");
                const oBinding = oList.getBinding("items");
                oBinding.filter(aFilters);
            },

            onSearchOData: function (oEvent) {
                const sQuery = oEvent.getSource().getValue();

                const params = {
                    urlParameters: {
                        $expand: "Category"
                    },
                    filters: [
                        new Filter("ProductName", FilterOperator.Contains, sQuery)
                    ]
                };

                const products = models.getProducts(params);

                const list = this.byId("list");

                list.setBusy(true);

                products
                    .then((oProductsModel) => {
                        this.getView().setModel(oProductsModel, 'products');

                    })
                    .catch((oError) => {
                        MessageBox.error(oError);

                    })
                    .finally(() => {
                        list.setBusy(false);
                    });
            },
        });
    });
