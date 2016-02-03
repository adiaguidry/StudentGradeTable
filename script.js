var app = angular.module('myApp', ['firebase']);
app.controller('app_controller', function ($scope, $firebaseArray) {
    $scope.student = {};
    $scope.student_array = [];
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    this.student_array = $firebaseArray(sgtRef);
    this.avgGrade = $scope.student_grade_avg;
});
app.controller('form_controller', function ($scope, $firebaseArray) {
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    this.students = $firebaseArray(sgtRef);

    this.add_student = function (student) {
        this.students.$add({
            name: student.name,
            course: student.course,
            grade: student.grade
        });
        $scope.student_grade_avg = student.grade;
        console.log("adding" , $scope.student_array.length)
        $scope.student_array.push(student);
        $scope.student = {};
    };
    this.cancel_click = function () {
        $scope.student = {};
    };

});
app.controller('student_list_controller', function ($scope, $firebaseArray) {
    var sgtRef = new Firebase("https://adiassgt.firebaseio.com/students");
    $scope.student_array = $firebaseArray(sgtRef);
    console.log("this is student controller " , $scope.student_array.length);
    this.delete_student = function (i) {
        $scope.student_array.$remove($scope.student_array[i]);
        console.log("this is i: " , i);
        $scope.student_array.splice(i, 1);

    };
});

//        //calculating the average
//        avg = Math.floor(total / count);
//        if (isNaN(avg)) {
//            $('.avgGrade').text(0);
//        } else {
//            //appending to the html element
//            $('.avgGrade').text(avg);
//        }
//    };

