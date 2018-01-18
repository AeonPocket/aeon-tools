/**
 * Controller for login View.
 */
(function () {
    angular.module('aeonTools').controller('checkTxCtrl',
        ['$scope', '$mdToast',
        function ($scope, $mdToast) {

            $scope.data = {};

            $scope.check = function () {
                try {
                    var amount = 0;
                    var tx = JSON.parse($scope.data.txJson);
                    for (var i in tx.outputs) {
                        var keyPair = generate_key_image(
                            tx.extra.pub_key[0], $scope.data.viewKey, decode_address($scope.data.walletAddress).spend,
                            "0000000000000000000000000000000000000000000000000000000000000000", i);

                        if (keyPair.ephemeral_pub == tx.outputs[i].txOutKey) {
                            amount += tx.outputs[i].amount;
                        }
                    }

                    $scope.data.receivedAmount = (amount/Math.pow(10,12)).toFixed(12);
                } catch (e) {
                    $mdToast.showSimple("Unable to parse JSON");
                }
            }
        }]
    )
})();