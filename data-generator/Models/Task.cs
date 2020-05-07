namespace data_generator.Models
{
    public class Task : Schedulable
    {   
        public override string ToJson()
        {
            return $"{{\"id\": {Id}, \"name\": \"{Name}\", \"tasks\": [{{\"name\": \"{Name}\", \"color\": \"#F1C232\", \"from\": \"{Start.ToUniversalTime().ToString("O")}\", \"to\": \"{End.ToUniversalTime().ToString("O")}\", \"progress\": 0 }} ]}},";
        }

        public override string ToString() => $"\t\tId: {Id} - Name: {Name} - Start: {Start.ToUniversalTime().ToString("O")} - End: {End.ToUniversalTime().ToString("O")}";
    }
}