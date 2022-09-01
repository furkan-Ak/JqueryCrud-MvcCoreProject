using System.ComponentModel.DataAnnotations;

namespace AjaxCrud.Models
{
    public class DbImages // veritabanıyla class name i aynı olmasına özen göster hata verdirebiliyor.
    {
        [Key]
        public int ImgId { get; set; }
        public string ImageUrl { get; set; }
        public string ImageTitle { get; set; }

    }
}
