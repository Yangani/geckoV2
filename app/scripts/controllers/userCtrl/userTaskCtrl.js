'use strict';

angular.module( 'myApp' )

.controller( 'UserTasksCtrl',
    function ( $rootScope, $scope, $state, $cookies, User ) {
      console.log('typeof cookie: ', typeof $cookies.get('sessionId'));
      if ($cookies.get('sessionId') !== 'undefined') {

        var newTask = {};
        $scope.myTasks = [];

        $scope.addTask = function() {
          newTask.date = $scope.date;
          newTask.time = $scope.data.time;
          newTask.task = $scope.data.addedTask;
          newTask.notes = $scope.notes;

          console.log('New Task: ', newTask);

          User.userPostAddTask(newTask)
          .then(function (tasks) {
            User.userGetTasks();
            console.log('All tasks: ', tasks);
          })
        }

        $scope.refreshTasks = function() {
          User.userGetTasks()
          .then(function (tasks) {
          // todo: push new/updated tasks to tasks arr
          // so we can display them.
          $scope.myTasks = tasks.data;

            console.log('My Tasks: ', $scope.myTasks);
            console.log('Refreshed tasks: ', tasks.data);
          })
        }

        $scope.userLogout = function() {
          User.userPostLogout()
          .then(function (res) {
            console.log('after user logout: ', res);
            $state.go('index');
          })
        }
        $scope.refreshTasks();
      } else {
        $state.go('userLogin');
      }
});