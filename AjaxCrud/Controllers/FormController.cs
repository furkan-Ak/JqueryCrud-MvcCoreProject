using AjaxCrud.Context;
using AjaxCrud.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AjaxCrud.ViewModels;

namespace AjaxCrud.Controllers
{
    public class FormController : Controller
    {

        private IConfiguration _configuration;
        private FormContext _formContext;
        private ImagesDbContext _imagesDbContext;
        private UlkeSehirContext _ulkeSehirContext;
        private OkulTurleriContext _okulTurleriContext;
        private DbFormOkulBilgiContext _dbFormOkulBilgiContext;



        public FormController(IConfiguration configuration, FormContext formContext, ImagesDbContext ımagesDbContext, UlkeSehirContext ulkeSehirContext, OkulTurleriContext okulTurleriContext, DbFormOkulBilgiContext dbFormOkulBilgiContext)
        {
            _configuration = configuration;
            _formContext = formContext;
            _imagesDbContext = ımagesDbContext;
            _ulkeSehirContext = ulkeSehirContext;
            _okulTurleriContext = okulTurleriContext;
            _dbFormOkulBilgiContext = dbFormOkulBilgiContext;
        }

        public IActionResult UpdatePage()
        {
            return View();
        }

        public IActionResult AddForms()
        {
            return View();
        }
        public IActionResult AddPage()
        {
            return View();
        }


        //[HttpGet]
        //public List<DbFormOkulBilgi> KayıtOkulGetir()
        //{
        //    List<DbFormOkulBilgi> kayıtOkulGetir= _dbFormOkulBilgiContext.DbFormOkulBilgi.ToList();
        //    return kayıtOkulGetir;
        //}


        [HttpGet] // ülke listesini getir.
        public List<DbUlkeSehir> GetUlkeList()
        {
            List<DbUlkeSehir> Ulke = _ulkeSehirContext.DbUlkeSehir.Where(x => x.UstId == 0).ToList();
            return Ulke; // değişecek
        }

        [HttpGet] // şehir listesini getir
        public List<DbUlkeSehir> GetSehirList(int id)
        {
            List<DbUlkeSehir> Sehir = _ulkeSehirContext.DbUlkeSehir.Where(x => x.UstId == id).ToList();
            return Sehir;
        }


        [HttpGet]
        public List<DbOkulTurleri> OkulList()
        {
            List<DbOkulTurleri> okullist = _okulTurleriContext.DbOkulTurleri.ToList();
            return okullist;
        }


        [HttpGet]
        [Route("Form/GetForms")]
        public List<AllFormViewModel> GetForms()
        {
            List<DbForm> formlist = _formContext.DbForm.Where(x => x.Id != 0).ToList();
            List<DbUlkeSehir> ulkelist = _ulkeSehirContext.DbUlkeSehir.ToList();
            List<AllFormViewModel> vmList = new List<AllFormViewModel>(); //view model syntax 

            foreach (DbForm item in formlist)
            {
                AllFormViewModel vm = new AllFormViewModel();
                vm.Form = item;
                vm.Image = _imagesDbContext.DbImages.FirstOrDefault(x => x.ImgId == item.MedyaId);
                vmList.Add(vm);
                vm.UlkeAd = ulkelist.Where(x => x.Id == item.Ulke).Select(x => x.Tanım).FirstOrDefault();//listedeki where şartı sağlayan verinin select içindeki namei al ve lsitedeki ilk ismi getir
                vm.SehirAd = ulkelist.Where(x => x.Id == item.Sehir).Select(x => x.Tanım).FirstOrDefault(); // farklı veritabnına idyi gönderip ismi alma mantığı 
            }
            //vm.MyList.Add("eklenen eleman 1");
            return vmList;
        }


        //Post method to add details    
        [HttpPost]
        [Route("/Form/AddForms")]
        public ActionResult AddForms(AllFormViewModel model)
        {
            DbForm form = new DbForm();

            form.FullName = model.Form.FullName;
            form.Adress = model.Form.Adress;
            form.Mail = model.Form.Mail;
            form.Telephone = model.Form.Telephone;
            form.MedyaId = model.Form.MedyaId;
            form.Ulke = model.Form.Ulke;
            form.Sehir = model.Form.Sehir;
            _formContext.DbForm.Add(form);
            _formContext.SaveChanges();
            //ist<DbFormOkulBilgi> dbFormOkulBilgiList = new List<DbFormOkulBilgi>();
            //if (model.OkulList == null)
            //{
            
            //}
            foreach (OkulVm item in model.OkulList)
            {
                DbFormOkulBilgi dbFormOkulBilgi = new DbFormOkulBilgi();
                dbFormOkulBilgi.OkulTurId = item.OkulTurId;
                dbFormOkulBilgi.OkulAd = item.OkulAd;
                dbFormOkulBilgi.DbFormId = form.Id;
                _dbFormOkulBilgiContext.Add(dbFormOkulBilgi);
                _dbFormOkulBilgiContext.SaveChanges(); // Liste olark tutsam nasıl tutarım hata alıyorum sadece sonuncuyu veri tabanına atıyo
            }
            //_dbFormOkulBilgiContext.Add(dbFormOkulBilgiList);
            //_dbFormOkulBilgiContext.SaveChanges();
            return RedirectToAction(nameof(AddForms));
        }

        [HttpPost]
        [Route("Form/DeleteForm/{id}")]
        public ActionResult DeleteForm(int id)
        {
            DbForm toBeDeleted = _formContext.DbForm.FirstOrDefault(x => x.Id == id); // databaseden bu id ye ait veriyi bulur getirir.
            List<DbFormOkulBilgi> tobeDeletedFormOkul = _dbFormOkulBilgiContext.DbFormOkulBilgi.Where(x => x.DbFormId == id).ToList();
            //_formContext.DbForm.Update(toBeDeleted);
            //_formContext.SaveChanges();
            //toBeDeleted.Adress = "üsküdar";
            ////....
            //_formContext.SaveChanges();

            if (toBeDeleted != null)
            {
                for (int i = 0; i < tobeDeletedFormOkul.Count; i++) // listede count method
                {
                    DbFormOkulBilgi a = _dbFormOkulBilgiContext.DbFormOkulBilgi.FirstOrDefault(x => x.Id == tobeDeletedFormOkul[i].Id);
                    _dbFormOkulBilgiContext.DbFormOkulBilgi.Remove(a);
                    _dbFormOkulBilgiContext.SaveChanges();
                }
                _formContext.DbForm.Remove(toBeDeleted);        
                _formContext.SaveChanges();
            }

            return RedirectToAction(nameof(AddForms));

        }

        // Update Form Controllers
        [HttpPost]
        [Route("Form/UpdateForm")]
        public ActionResult UpdateForm(AllFormViewModel model)
        {
            DbForm tobeUpdated = _formContext.DbForm.FirstOrDefault(x => x.Id == model.Form.Id);
            tobeUpdated.FullName = model.Form.FullName;
            tobeUpdated.Adress = model.Form.Adress;
            tobeUpdated.Mail = model.Form.Mail;
            tobeUpdated.Telephone = model.Form.Telephone;
            tobeUpdated.MedyaId = model.Form.MedyaId;
            tobeUpdated.Ulke = model.Form.Ulke;
            tobeUpdated.Sehir = model.Form.Sehir;

            _formContext.DbForm.Update(tobeUpdated);
            _formContext.SaveChanges();

        List<DbFormOkulBilgi> listeOkul = _dbFormOkulBilgiContext.DbFormOkulBilgi.Where(x=>x.DbFormId==model.Form.Id).ToList(); // null geliyo 
            for (int i = 0; i < listeOkul.Count; i++) // listede count method
            {
                DbFormOkulBilgi a = _dbFormOkulBilgiContext.DbFormOkulBilgi.FirstOrDefault(x=>x.Id== listeOkul[i].Id);
                _dbFormOkulBilgiContext.DbFormOkulBilgi.Remove(a);
            }    
            foreach (var item in model.OkulList)
            {
                DbFormOkulBilgi dbFormOkulBilgi = new DbFormOkulBilgi();
                dbFormOkulBilgi.OkulTurId = item.OkulTurId;
                dbFormOkulBilgi.OkulAd = item.OkulAd;
                dbFormOkulBilgi.DbFormId = tobeUpdated.Id;
                _dbFormOkulBilgiContext.Add(dbFormOkulBilgi);
                _dbFormOkulBilgiContext.SaveChanges(); // Liste olark tutsam nasıl tutarım hata alıyorum sadece sonuncuyu veri tabanına atıyo
            }
            return RedirectToAction(nameof(AddForms));
        }

        [HttpGet]
        [Route("Form/GetFormById/{id}")]
        public AllFormViewModel GetFormById(int id)
        {
            DbForm tobeUpdate = _formContext.DbForm.FirstOrDefault(x => x.Id == id);
            List<DbUlkeSehir> tobeUpUlke = _ulkeSehirContext.DbUlkeSehir.ToList();
            List<DbFormOkulBilgi> tobeUpOkulBilgi = _dbFormOkulBilgiContext.DbFormOkulBilgi.Where(x => x.DbFormId == tobeUpdate.Id).ToList();
            DbImages tobeUpdateImg = _imagesDbContext.DbImages.FirstOrDefault(x => x.ImgId == tobeUpdate.MedyaId);

            List<OkulVm> UpdateOkulList = new List<OkulVm>();
            foreach (var item in tobeUpOkulBilgi)
            {
                OkulVm dbFormOkulBilgi = new OkulVm();
                dbFormOkulBilgi.OkulTurId = item.OkulTurId ;
                dbFormOkulBilgi.OkulAd = item.OkulAd;
                UpdateOkulList.Add(dbFormOkulBilgi);
            }



            AllFormViewModel tobeUpdatedModel = new AllFormViewModel()
            {
                Form = tobeUpdate,
                Image = tobeUpdateImg,
                UlkeAd = tobeUpUlke.Where(x => x.Id == tobeUpdate.Ulke).Select(x => x.Tanım).FirstOrDefault(), // ülke ve şehir adlarını da gönderiyorum
                SehirAd = tobeUpUlke.Where(x => x.Id == tobeUpdate.Sehir).Select(x => x.Tanım).FirstOrDefault(),
                 OkulList = UpdateOkulList     //=tobeUpdate.Where(x=>x.Id==tobeUpdate.Id).
            };


            return tobeUpdatedModel;
        }

        // file Upload syntax
        [HttpPost]
        public async Task<IActionResult> UploadFile(IList<IFormFile> files)
        {
            DbImages dbImages = new DbImages();
            var path = "";
            var pathDp = ""; // kısa path (url)
            foreach (var formFile in files)// files dizisindeki her elemanı formfile içine tek tek alıyor ve buna göre aşağıdaki işlemleri yapıyo
            {
                if (formFile.Length > 0)
                {
                    string guid = Guid.NewGuid().ToString();
                    path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "image", guid + formFile.FileName); // tam url bütün yolu kapsıyor
                    pathDp = "image/" + guid + formFile.FileName; // istenilen klasör için url kısa hali   
                    var filePath = Path.GetTempFileName();

                    using (var stream = System.IO.File.Create(path))// bellekten silinsin yüklendiğinde o yüzden using kullandım.istenilen klasörder oluşturma 
                    {
                        await formFile.CopyToAsync(stream);
                    }
                }
                var name = formFile.FileName;
                var ımgURL = pathDp; // url  başında "/" işaret olmöadığı için direk verilken propu src ye katarsan fotoyu göstermek için yazmayacak bunun için ajax da ekstra 
                                     // ekleyebilirsin veya burda ekleyebilirsin benim ekleme ajax da .

                dbImages.ImageTitle = name;
                dbImages.ImageUrl = ımgURL;
                _imagesDbContext.Add(dbImages);
                _imagesDbContext.SaveChanges();


            }
            return Ok(dbImages); // direk succese veriyi yollamanı sağlıyor
        }


    }
}

//string fileName = Guid.NewGuid().ToString();
//if (upPhoto != null)
//{

//    fileName = upPhoto.FileName;
//    var Upload = Path.Combine(_url.WebRootPath, "wwwroot/image/", fileName);
//    upPhoto.CopyTo(new FileStream(Upload, FileMode.Create));
//}

/*    if (upPhoto.ImgId != null)
    {
        //işlemler olacak 
        var extention = Path.GetExtension(upPhoto.ImgId.FileName); // uzantıyı döndürür filename parametresini kullanmak için MedyaId tanımı IFormFile olmalı 
        var newimagename = Guid.NewGuid() + extention; // benzersiz isim için
        var location = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/image/", newimagename);
        using var stream = new FileStream(location, FileMode.Create); 
        upPhoto.ImgId.CopyTo(stream);
        ımg.ImageTitle= newimagename;
    }
*/
//return RedirectToAction(nameof(UploadFiles)); // return nereye olacak ???






