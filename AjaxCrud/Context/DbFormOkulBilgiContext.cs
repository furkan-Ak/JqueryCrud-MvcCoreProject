using AjaxCrud.Models;
using Microsoft.EntityFrameworkCore;

namespace AjaxCrud.Context
{
    public class DbFormOkulBilgiContext:DbContext
    {
        public DbFormOkulBilgiContext(DbContextOptions<DbFormOkulBilgiContext> options) : base(options)
        {

        }

        public DbSet<DbFormOkulBilgi> DbFormOkulBilgi { get; set; }
    }
}
