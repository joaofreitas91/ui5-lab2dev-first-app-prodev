sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "com/lab2dev/firstapp/model/models",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/firstapp/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, models, Filter, FilterOperator, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Home", {
            formatter: formatter,

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
                //Acesso ao Component
                const oComponent = this.getOwnerComponent()

                //Acesso ao Router
                const oRouter = oComponent.getRouter();

                //Navegação para a rota RouteDetail
                oRouter.navTo("RouteDetail");
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

            onOpenDialog: function () {
                const viewId = this.getView().getId();

                if (!this.dialog) {
                    this.dialog = sap.ui.xmlfragment(viewId, "com.lab2dev.firstapp.view.fragments.Dialog", this);
                    this.getView().addDependent(this.dialog);
                }

                this.dialog.open();
            },

            oncloseDialog: function () {
                this.dialog.close();
            }
        });
    });
