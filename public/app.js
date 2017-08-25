var app = angular.module('app', []);
 
app.controller('test', function($scope, $locale, $http) {
    $http.get('/users')
        .success(function (data) {
            $scope.users = data;
            $scope.color = $scope.users.favoriteColor;
        });

    $scope.convertToDate = function(date){
        var dateObj = new Date(date);
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        newdate = day + "/" + month + "/" + year;
        return dateObj.toDateString();
    }

    $scope.deleteUser = function(user){
        $http.delete('/users/'+user.username)
            .success(function (data) {
                console.log(data);
            });
        $http.get('/users')
            .success(function (data) {
                $scope.users = data;
                $scope.color = $scope.users.favoriteColor;
            });
    }

    $scope.changeColor = function(username, color){
        $http.put('/users/'+username, {color: color})
            .success(function (data) {
                console.log(data);
            });
    }

    $scope.addUser = function(){
        $scope.form.joinDate = Date.now();
        $http.post('/users', JSON.stringify($scope.form))
            .success(function (data) {
                console.log(data);
            });
        $http.get('/users')
            .success(function (data) {
                $scope.users = data;
                $scope.color = $scope.users.favoriteColor;
            });
    }
});