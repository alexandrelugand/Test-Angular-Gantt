using System;
using System.Collections.Generic;
using System.Linq;

namespace data_generator.Models
{
    public class Project : Schedulable
    {
        public Project()
        {
            WorkOrders = new List<WorkOrder>();
        }
        public List<WorkOrder> WorkOrders { get; set; }

        public override string ToJson()
        {
            var children = string.Join(',', WorkOrders.Select(w => w.Id).Cast<object>().ToArray());
            return $"{{\"id\": {Id}, \"name\": \"{Name}\", \"children\": [{children}], \"classes\": \"project\", \"groups\": {{ \"display\": \"promote\"}}, \"movable\": true }},";
        }

        public override string ToString() => $"Id: {Id} - Name: {Name} - Start: {Start.ToUniversalTime().ToString("O")} - End: {End.ToUniversalTime().ToString("O")}";
    }
}