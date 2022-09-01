using System.ComponentModel.DataAnnotations;

namespace AjaxCrud.Models
{
    public class DbFormOkulBilgi
    {
        [Key]
        public int Id { get; set; }
        public int DbFormId { get; set; }
        public int OkulTurId { get; set; }
        public string OkulAd { get; set; }

    }
}
