using System.ComponentModel.DataAnnotations;

namespace AjaxCrud.Models
{
    public class DbUlkeSehir
    {
        [Key]
        public int Id { get; set; }
        public string Tanım { get; set; } // ülke ve şehir adları bunda
        public int UstId { get; set; }

    }
}
