var app = angular.module('myApp', ['firebase']);
app.controller('app_controller',[ "$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    $scope.student = {};
    $scope.student_array = [];
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    this.student_array = $firebaseArray(sgtRef);
    this.avgGrade = $scope.student_grade_avg;
}]);
app.controller('form_controller',[ "$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    this.students = $firebaseArray(sgtRef);

    this.add_student = function (student) {
        this.students.$add({
            name: student.name,
            course: student.course,
            grade: student.grade
        });
        $scope.student_grade_avg = student.grade;
        console.log("adding", $scope.student_array.length)
        $scope.student_array.push(student);
        $scope.student = {};
    };
    this.cancel_click = function () {
        $scope.student = {};
    };

}]);
app.controller('student_list_controller', [ "$scope", "$firebaseArray", function ($scope, $firebaseArray) {
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    $scope.student_array = $firebaseArray(sgtRef);
    console.log("this is student controller ", $scope.student_array.length);
    this.delete_student = function (i) {
        $scope.student_array.$remove($scope.student_array[i]);
        console.log("this is i: ", i);
        $scope.student_array.splice(i, 1);
    };
}]);


app.controller('grade_controller',["$scope", function ($scope) {
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    $scope.students_grades = [];
    $scope.grade_avg;
    sgtRef.on("child_added", function (snapshot) {
        var data = snapshot.val();
        $scope.students_grades.push(parseFloat(data.grade));
        $scope.students_grade_avg();
        console.log(data.grade, $scope.students_grades);
    }, function (errorObject) {
        console.log("the read failed: ", errorObject);
    });
    $scope.students_grade_avg = function(){
        var total = 0;
        for(var i =0; i< $scope.students_grades.length; i++){
            total += $scope.students_grades[i];
        }
        $scope.grade_avg = (total/$scope.students_grades.length).toFixed(0) +"%";
        console.log("this is the avg " + (total/$scope.students_grades.length));
        return total;
    }

}]);


