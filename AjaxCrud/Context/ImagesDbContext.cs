using AjaxCrud.Models;
using Microsoft.EntityFrameworkCore;

namespace AjaxCrud.Context
{
    public class ImagesDbContext : DbContext
    {

        public ImagesDbContext(DbContextOptions<ImagesDbContext> options) : base(options)
        {

        }
        public DbSet<DbImages> DbImages { get; set; }

    }
}