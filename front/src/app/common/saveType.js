angular.module('BaiYin.common.saveType', [])

.service('saveType', [function() {
    this.addIndexType = '0';
    this.addHistoryType = '0';
    this.createIndexType = function(addIndexType) {
        this.addIndexType = addIndexType;
    };
    this.createHistoryType = function(addHistoryType) {
        this.addHistoryType = addHistoryType;
    };

    this.distory = function() {
        this.addIndexType = '0';
        this.addHistoryType = '0';
    }
    return this;
}])

.factory('SaveTypeService', ['saveType', function(saveType) {
    var saveTypeExample = {};

    saveTypeExample.addIndexType = function(addIndexType) {
        saveType.createIndexType(addIndexType);
    }

    saveTypeExample.getIndexType = function() {
        return saveType.addIndexType;
    };

    saveTypeExample.addHistoryType = function(addHistoryType) {
        saveType.createHistoryType(addHistoryType);
    }

    saveTypeExample.getHistoryType = function() {
        return saveType.addHistoryType;
    };

    saveTypeExample.distory = function() {
        saveType.distory();
    }

    return saveTypeExample;
}])