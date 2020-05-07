using System.Collections.Generic;
using System.Linq;
using Task = data_generator.Models.Task;

namespace data_generator.Models
{
    public class WorkOrder : Schedulable
    {
        public WorkOrder()
        {
            Tasks = new List<Task>();
        }

        public List<Task> Tasks { get; set; }

        public override string ToJson()
        {
            var children = string.Join(',', Tasks.Select(w => w.Id).Cast<object>().ToArray());
            return $"{{\"id\": {Id}, \"name\": \"{Name}\", \"children\": [{children}], \"classes\": \"work-order\", \"groups\": {{ \"display\": \"promote\"}}, \"movable\": true }},";
        }

        public override string ToString() => $"\tId: {Id} - Name: {Name} - Start: {Start.ToUniversalTime().ToString("O")} - End: {End.ToUniversalTime().ToString("O")}";
    }
}