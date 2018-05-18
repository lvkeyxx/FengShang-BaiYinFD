angular.module('BaiYin.common.saveData', [])

.service('addIdService', [function() {
    this.create = function(workOrderArray) {
        this.workOrderArray = workOrderArray;
    };
    this.destroy = function() {
        this.workOrderArray = [];
    };
    return this;
}])

.factory('SaveWordOrderIdService', ['addIdService', function(addIdService) {
    var saveWordOrderId = {};
    saveWordOrderId.containsBool = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                return false;
            }
        }
        return true;
    }

    saveWordOrderId.containsIndexTwo = function(arr, obj) {
        var i = arr.length;
        while (i--) {
            if (arr[i].accountName === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.containsIndex = function(arr, obj, name) {
        var i = arr.length;
        while (i--) {
            if (arr[i].name === obj) {
                return i;
            }
        }
    }
    saveWordOrderId.isEmpty = function(arr) {
        return arr ? arr.workOrderArray.length > 0 : false;
    }

    saveWordOrderId.arrSize = function(arr) {
        return arr.workOrderArray.length;
    }

    saveWordOrderId.getId = function(arr, i) {
        return arr.workOrderArray[i];
    }

    saveWordOrderId.addArray = function(workOrderArray) {
        addIdService.create(workOrderArray);
    }

    saveWordOrderId.deleteArray = function() {
        addIdService.destroy();
    }

    saveWordOrderId.getWorkOrderArray = function() {
        return addIdService;
    };
    return saveWordOrderId;
}])