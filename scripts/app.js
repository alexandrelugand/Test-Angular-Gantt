(function (angular) {
    "use strict";

    angular.module('gantt.demo', 
        ['gantt',
         'gantt.bounds', 
         'gantt.corner',
         'gantt.dependencies',
         'gantt.drawtask',
         'gantt.groups',
         'gantt.labels',
         'gantt.movable',
         'gantt.overlap',
         'gantt.progress',
         'gantt.resizeSensor',
         'gantt.sections',
         'gantt.sortable',
         'gantt.table',
         'gantt.tooltips',
         'gantt.tree']);

})(angular);