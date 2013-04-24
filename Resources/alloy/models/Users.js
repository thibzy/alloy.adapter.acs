exports.definition = {
    config: {
        columns: {
            active: "boolean"
        },
        adapter: {
            type: "acs",
            collection_name: "users"
        },
        settings: {
            object_name: "users",
            object_method: "Users"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {
            authenticated: function() {
                if (Ti.App.Properties.hasProperty("Cloud.sessionId")) {
                    this.config.Cloud.sessionId = Ti.App.Properties.getString("Cloud.sessionId");
                    return true;
                }
                return false;
            },
            login: function(_params) {
                var that = this;
                this.config.Cloud.Users.login({
                    login: _params.login,
                    password: _params.password
                }, function(e) {
                    if (e.success) {
                        if (_params.success) {
                            Ti.App.Properties.setString("Cloud.sessionId", that.config.Cloud.sessionId);
                            _params.success(new model(e.users[0]));
                        }
                    } else {
                        Ti.API.error(e);
                        _params.error && _params.error(that, e.error && e.message || e);
                    }
                });
            },
            logout: function(_params) {
                var that = this;
                this.config.Cloud.Users.logout(function(e) {
                    if (e.success) {
                        if (_params.success) {
                            Ti.App.Properties.removeProperty("Cloud.sessionId");
                            _params.success(null);
                        }
                    } else {
                        Ti.API.error(e);
                        _params.error && _params.error(that, e.error && e.message || e);
                    }
                });
            }
        });
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("users", exports.definition, []);

collection = Alloy.C("users", exports.definition, model);

exports.Model = model;

exports.Collection = collection;