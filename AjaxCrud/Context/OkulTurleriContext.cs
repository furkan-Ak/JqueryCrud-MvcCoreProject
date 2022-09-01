using AjaxCrud.Models;
using Microsoft.EntityFrameworkCore;

namespace AjaxCrud.Context
{
    public class OkulTurleriContext : DbContext
    {

        public OkulTurleriContext(DbContextOptions<OkulTurleriContext> options) : base(options)
        {

        }
        public DbSet<DbOkulTurleri> DbOkulTurleri { get; set; }
 
      

    }
}
