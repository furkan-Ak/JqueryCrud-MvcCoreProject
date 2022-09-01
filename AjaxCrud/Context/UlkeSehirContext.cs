using AjaxCrud.Models;
using Microsoft.EntityFrameworkCore;

namespace AjaxCrud.Context
{
    public class UlkeSehirContext : DbContext
    {
        public UlkeSehirContext(DbContextOptions<UlkeSehirContext> options) : base(options)
        {

        }
        public DbSet<DbUlkeSehir> DbUlkeSehir { get; set; }

    }
}

