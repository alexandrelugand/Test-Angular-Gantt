(function (angular) {
    "use strict";

    angular.module('gantt.demo').controller('main', ['$scope', '$http', '$log', function ($scope, $http, $log) {
      
        $http.get("data.json")
          .success(function (data) {
              $scope.data = data;
          })
          .error(function (data) {
              $log.error("Failed to load data");
          });
       
        $scope.options = {
            mode: 'custom',
            scale: 'day',
            sortMode: undefined,
            sideMode: 'TreeTable',
            daily: false,
            maxHeight: 750,
            width: false,
            zoom: 1,
            columns: ['model.name', 'from', 'to'],
            treeTableColumns: ['from', 'to'],
            columnsHeaders: {'model.name': 'Name', 'from': 'From', 'to': 'To'},
            columnsClasses: {'model.name': 'gantt-column-name', 'from': 'gantt-column-from', 'to': 'gantt-column-to'},
            columnsFormatters: {
              'from': function (from) {
                return from !== undefined ? from.format('lll') : undefined
              },
              'to': function (to) {
                return to !== undefined ? to.format('lll') : undefined
              }
            },
            treeHeaderContent: '<i class="fa fa-align-justify"></i> {{getHeader()}}',
            columnsHeaderContents: {
              'model.name': '<i class="fa fa-align-justify"></i> {{getHeader()}}',
              'from': '<i class="fa fa-calendar"></i> {{getHeader()}}',
              'to': '<i class="fa fa-calendar"></i> {{getHeader()}}'
            },
            autoExpand: 'none',
            taskOutOfRange: 'truncate',
            fromDate: moment(null),
            toDate: undefined,
            rowContent: '<i class="fa fa-align-justify"></i> {{row.model.name}}',
            taskContent: '<i class="fa fa-tasks"></i> {{task.model.name}}',
            allowSideResizing: true,
            labelsEnabled: true,
            currentDate: 'line',
            currentDateValue: new Date(2013, 9, 23, 11, 20, 0),
            draw: false,
            readOnly: false,
            groupDisplayMode: 'group',
            filterTask: '',
            filterRow: '',
            timeFrames: {
              'day': {
                start: moment('8:00', 'HH:mm'),
                end: moment('20:00', 'HH:mm'),
                color: '#ACFFA3',
                working: true,
                default: true
              },
              'noon': {
                start: moment('12:00', 'HH:mm'),
                end: moment('13:30', 'HH:mm'),
                working: false,
                default: true
              },
              'closed': {
                working: false,
                default: true
              },
              'weekend': {
                working: false
              },
              'holiday': {
                working: false,
                color: 'red',
                classes: ['gantt-timeframe-holiday']
              }
            },
            dateFrames: {
              'weekend': {
                evaluator: function (date) {
                  return date.isoWeekday() === 6 || date.isoWeekday() === 7
                },
                targets: ['weekend']
              },
              '11-november': {
                evaluator: function (date) {
                  return date.month() === 10 && date.date() === 11
                },
                targets: ['holiday']
              }
            },
            timeFramesWorkingMode: 'hidden',
            timeFramesNonWorkingMode: 'hidden',
            columnMagnet: '15 minutes',
            timeFramesMagnet: true,
            dependencies: {
              enabled: true,
              conflictChecker: true
            },
            movable: {
              allowRowSwitching: function (task, targetRow) {
                return task.row.model.name !== 'Milestones' && targetRow.model.name !== 'Milestones'
              }
            },
            corner: {
              headersLabels: function (key) {
                return key.charAt(0).toUpperCase() + key.slice(1)
              },
              headersLabelsTemplates: '{{getLabel(header)}} <i class="fa fa-calendar"></i>'
            },
            targetDataAddRowIndex: undefined,
            canDraw: function (event) {
              let isLeftMouseButton = event.button === 0 || event.button === 1
              return $scope.options.draw && !$scope.options.readOnly && isLeftMouseButton
            },
            drawTaskFactory: function () {
              return {
                id: ganttUtils.randomUuid(),  // Unique id of the task.
                name: 'Drawn task', // Name shown on top of each task.
                color: '#AA8833' // Color of the task in HEX format (Optional).
              }
            }
            // api: function (api) {
            //   // API Object is used to control methods and events from angular-gantt.
            //   $scope.api = api
        
            //   api.core.on.ready($scope, function () {
            //     // Log various events to console
            //     api.scroll.on.scroll($scope, logScrollEvent)
            //     api.core.on.ready($scope, logReadyEvent)
        
            //     api.data.on.remove($scope, addEventName('data.on.remove', logDataEvent))
            //     api.data.on.load($scope, addEventName('data.on.load', logDataEvent))
            //     api.data.on.clear($scope, addEventName('data.on.clear', logDataEvent))
            //     api.data.on.change($scope, addEventName('data.on.change', logDataEvent))
        
            //     api.tasks.on.add($scope, addEventName('tasks.on.add', logTaskEvent))
            //     api.tasks.on.change($scope, addEventName('tasks.on.change', logTaskEvent))
            //     api.tasks.on.rowChange($scope, addEventName('tasks.on.rowChange', logTaskEvent))
            //     api.tasks.on.remove($scope, addEventName('tasks.on.remove', logTaskEvent))
        
            //     if (api.tasks.on.moveBegin) {
            //       api.tasks.on.moveBegin($scope, addEventName('tasks.on.moveBegin', logTaskEvent))
            //       // api.tasks.on.move($scope, addEventName('tasks.on.move', logTaskEvent));
            //       api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', logTaskEvent))
        
            //       api.tasks.on.resizeBegin($scope, addEventName('tasks.on.resizeBegin', logTaskEvent))
            //       // api.tasks.on.resize($scope, addEventName('tasks.on.resize', logTaskEvent));
            //       api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', logTaskEvent))
            //     }
        
            //     if (api.tasks.on.drawBegin) {
            //       api.tasks.on.drawBegin($scope, addEventName('tasks.on.drawBegin', logTaskEvent))
            //       // api.tasks.on.draw($scope, addEventName('tasks.on.draw', logTaskEvent));
            //       api.tasks.on.drawEnd($scope, addEventName('tasks.on.drawEnd', logTaskEvent))
            //     }
        
            //     api.rows.on.add($scope, addEventName('rows.on.add', logRowEvent))
            //     api.rows.on.change($scope, addEventName('rows.on.change', logRowEvent))
            //     api.rows.on.move($scope, addEventName('rows.on.move', logRowEvent))
            //     api.rows.on.remove($scope, addEventName('rows.on.remove', logRowEvent))
        
            //     api.side.on.resizeBegin($scope, addEventName('labels.on.resizeBegin', logLabelsEvent))
            //     // api.side.on.resize($scope, addEventName('labels.on.resize', logLabelsEvent));
            //     api.side.on.resizeEnd($scope, addEventName('labels.on.resizeEnd', logLabelsEvent))
        
            //     api.timespans.on.add($scope, addEventName('timespans.on.add', logTimespanEvent))
            //     api.columns.on.generate($scope, logColumnsGenerateEvent)
        
            //     api.rows.on.filter($scope, logRowsFilterEvent)
            //     api.tasks.on.filter($scope, logTasksFilterEvent)
        
            //     api.data.on.change($scope, function (newData) {
            //       if (dataToRemove === undefined) {
            //         dataToRemove = [
            //           {'id': newData[2].id}, // Remove Kickoff row
            //           {
            //             'id': newData[0].id, 'tasks': [
            //             {'id': newData[0].tasks[0].id},
            //             {'id': newData[0].tasks[3].id}
            //             ]
            //           }, // Remove some Milestones
            //           {
            //             'id': newData[7].id, 'tasks': [
            //             {'id': newData[7].tasks[0].id}
            //             ]
            //           } // Remove order basket from Sprint 2
            //         ]
            //       }
            //     })
        
            //     // When gantt is ready, load data.
            //     // `data` attribute could have been used too.
            //     $scope.load()
        
            //     // Add some DOM events
            //     api.directives.on.new($scope, function (directiveName, directiveScope, element) {
            //       if (directiveName === 'ganttTask') {
            //         element.bind('click', function (event) {
            //           event.stopPropagation()
            //           logTaskEvent('task-click', directiveScope.task)
            //         })
            //         element.bind('mousedown touchstart', function (event) {
            //           event.stopPropagation()
            //           $scope.live.row = directiveScope.task.row.model
            //           if (directiveScope.task.originalModel !== undefined) {
            //             $scope.live.task = directiveScope.task.originalModel
            //           } else {
            //             $scope.live.task = directiveScope.task.model
            //           }
            //           $scope.$digest()
            //         })
            //       } else if (directiveName === 'ganttRow') {
            //         element.bind('click', function (event) {
            //           event.stopPropagation()
            //           logRowEvent('row-click', directiveScope.row)
            //         })
            //         element.bind('mousedown touchstart', function (event) {
            //           event.stopPropagation()
            //           $scope.live.row = directiveScope.row.model
            //           $scope.$digest()
            //         })
            //       } else if (directiveName === 'ganttRowLabel') {
            //         element.bind('click', function () {
            //           logRowEvent('row-label-click', directiveScope.row)
            //         })
            //         element.bind('mousedown touchstart', function () {
            //           $scope.live.row = directiveScope.row.model
            //           $scope.$digest()
            //         })
            //       }
            //     })
        
            //     api.tasks.on.rowChange($scope, function (task) {
            //       $scope.live.row = task.row.model
            //     })
        
            //     objectModel = new GanttObjectModel(api)
            //   })
            // }
          };
        
    }]);    

})(angular);