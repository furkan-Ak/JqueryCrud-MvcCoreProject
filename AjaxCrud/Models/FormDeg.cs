using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace AjaxCrud.Models
{
    public class DbForm
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Adress { get; set; }
        public string Mail { get; set; }
        public int Telephone { get; set; }
        public int Ulke { get; set; }
        public int Sehir { get; set; }
        public int? MedyaId { get; set; }


    }
}
