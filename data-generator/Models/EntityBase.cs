using data_generator.Interfaces;

namespace data_generator.Models
{
    public abstract class EntityBase : EntityId, IEntityBase
    {
        public string Name { get; set; }

        public abstract string ToJson();
    }
}