using System;

namespace data_generator.Models
{
    public abstract class Schedulable : EntityBase
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}