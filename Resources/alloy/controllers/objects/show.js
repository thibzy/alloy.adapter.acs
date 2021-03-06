function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.container = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "container"
    });
    $.__views.container && $.addTopLevelView($.__views.container);
    $.__views.__alloyId72 = Ti.UI.createTableViewSection({
        headerTitle: "Required",
        id: "__alloyId72"
    });
    var __alloyId73 = [];
    __alloyId73.push($.__views.__alloyId72);
    $.__views.__alloyId74 = Ti.UI.createTableViewRow({
        height: 44,
        backgroundColor: "#fcfcfc",
        borderColor: "#eee",
        selectionStyle: Ti.UI.iPhone.TableViewCellSelectionStyle.NONE,
        touchEnabled: false,
        id: "__alloyId74"
    });
    $.__views.__alloyId72.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createLabel({
        left: 0,
        width: 90,
        color: "#333",
        shadowColor: "#fff",
        shadowOffset: {
            x: 0,
            y: 1
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
        font: {
            fontSize: 14
        },
        touchEnabled: false,
        text: "classname",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.classname = Ti.UI.createTextField({
        left: 100,
        width: 190,
        color: "#262626",
        shadowColor: "#fff",
        shadowOffset: {
            x: 0,
            y: 1
        },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: 16
        },
        id: "classname"
    });
    $.__views.__alloyId74.add($.__views.classname);
    $.__views.__alloyId69 = Ti.UI.createTableView({
        backgroundColor: "#fff",
        style: Ti.UI.iPhone.TableViewStyle.GROUPED,
        data: __alloyId73,
        id: "__alloyId69"
    });
    $.__views.container.add($.__views.__alloyId69);
    $.__views.__alloyId71 = Ti.UI.createView({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        id: "__alloyId71"
    });
    $.__views.search = Ti.UI.createSearchBar({
        top: 0,
        id: "search",
        hintText: "id"
    });
    $.__views.__alloyId71.add($.__views.search);
    $.__views.execute = Ti.UI.createButton({
        top: 54,
        right: 10,
        left: 10,
        height: 44,
        title: "show",
        id: "execute"
    });
    $.__views.__alloyId71.add($.__views.execute);
    $.__views.__alloyId69.headerView = $.__views.__alloyId71;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.search.addEventListener("focus", function() {
        $.search.applyProperties({
            showCancel: true
        });
    });
    $.search.addEventListener("blur", function() {
        $.search.applyProperties({
            showCancel: false
        });
    });
    $.search.addEventListener("return", function() {
        $.search.blur();
    });
    $.search.addEventListener("cancel", function() {
        $.search.blur();
    });
    $.execute.addEventListener("click", function() {
        var message = Alloy.createWidget("be.k0suke.progresshud", "widget", {
            message: "--- response ----------\n\nobjects/show execute"
        });
        $.container.add(message.getView());
        message.on("click", function() {
            $.container.remove(message.getView());
        });
        var objects = Alloy.createModel("Objects");
        objects.setClassname($.classname.getValue());
        objects.show({
            id: $.search.getValue(),
            success: function(model) {
                message.trigger("add", {
                    message: "success: " + model.get("id")
                });
            },
            error: function(model, response) {
                message.trigger("add", {
                    message: "error: " + response
                });
            }
        });
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;