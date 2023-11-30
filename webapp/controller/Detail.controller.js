sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("com.lab2dev.firstapp.controller.Detail", {
            onInit: function () {
                console.log("Detail");
            },

            onNavBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);

                } else {
                    const oComponent = this.getOwnerComponent()
                    const oRouter = oComponent.getRouter();
                    oRouter.navTo("RouteHome", {}, true);
                }
            }
        });
    });
