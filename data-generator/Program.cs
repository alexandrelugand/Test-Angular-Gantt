using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Reflection;
using System.Text;
using data_generator.Models;

namespace data_generator
{
    public class Program
    {
        private const int ProjectCount = 2;
        private const int WorkOrderCount = 7;
        private const int TaskCount = 12;

        private const int ProjectBaseId = 1000;
        private const int WorkOrderBaseId = 2000;
        private const int TaskBaseId = 3000;
        private static DateTime StartDate = DateTime.Parse("2020-01-01T08:00:00.000Z", CultureInfo.InvariantCulture, DateTimeStyles.AssumeUniversal);

        public static void Main(string[] args)
        {
            var projects = new List<Project>();
            var projectSeed = 0;
            var workOrderSeed = 0;
            var taskSeed = 0;
            for(var i = 0; i < ProjectCount; i++)
            {
                var project = new Project
                {
                    Id = GetId(ProjectBaseId, ref projectSeed),
                    Name = $"Project {i+1}",
                    Start = StartDate,
                    End = StartDate.AddDays(7)
                };

                var workOrderStart = project.Start;
                for(var j = 0; j < WorkOrderCount; j++)
                {
                    var workOrder = new WorkOrder
                    {
                        Id = GetId(WorkOrderBaseId, ref workOrderSeed),
                        Name = $"Work Order {i+1}-{j+1}",
                        Start = workOrderStart,
                        End = workOrderStart.AddDays(1)
                    };
                    
                    var taskStart = workOrder.Start;
                    for(var k = 0; k < TaskCount; k++)
                    {
                        var task = new Task
                        {
                            Id = GetId(TaskBaseId, ref taskSeed),
                            Name = $"Task {i+1}-{j+1}-{k+1}",
                            Start = taskStart,
                            End = taskStart.AddHours(2)
                        };

                        taskStart = taskStart.AddHours(2);
                        workOrder.Tasks.Add(task);
                    }
                    
                    workOrderStart = workOrderStart.AddDays(1);
                    project.WorkOrders.Add(workOrder);
                }

                StartDate = StartDate.AddDays(7);
                projects.Add(project);
            }      

            var sb = new StringBuilder();
            foreach(var project in projects)      
            {
                sb.AppendLine(project.ToJson());
                foreach(var workOrder in project.WorkOrders)
                {
                    sb.AppendLine(workOrder.ToJson());
                    foreach(var task in workOrder.Tasks)
                    {
                        sb.AppendLine(task.ToJson());
                    }
                }
            }
            var json = sb.ToString().TrimEnd('\n').TrimEnd('\r').TrimEnd(',');
            Console.Write(json);

            var dataFilePath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"..\..\..\..\data.json");
            if(File.Exists(dataFilePath))
                File.Delete(dataFilePath);
            
            using (StreamWriter sw = File.CreateText(dataFilePath)) 
            {
                sw.WriteLine($"[{json}]");
            }	
        }

        private static long GetId(int baseId, ref int seed)
        {
            return baseId + seed++;
        }
    }
}
