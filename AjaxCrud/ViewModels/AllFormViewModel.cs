using AjaxCrud.Models;
using System.Collections.Generic;

namespace AjaxCrud.ViewModels
{
    public class AllFormViewModel
    {
        public DbForm Form { get; set; } 
        public DbImages Image { get; set; }
        public string UlkeAd { get; set; }
        public string SehirAd { get; set; }
       public List<OkulVm> OkulList { get; set; }



        //public List<string> MyList { get; set; }
    }
    public class OkulVm
    {
       public  string OkulAd { get; set; }
        public int OkulTurId { get; set; }




    }
}
