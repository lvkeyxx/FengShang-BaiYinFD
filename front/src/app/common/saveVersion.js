angular.module('BaiYin.common.saveVersion', [])

.service('saveVersion', [function() {
    this.versionData = null;
    this.create = function(versionData) {
        this.versionData = versionData;
    };
    this.destroy = function() {
        this.versionData = null;
    };
    return this;
}])