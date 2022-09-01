using AjaxCrud.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AjaxCrud.Context
{
    public class FormContext : DbContext
    {

        public FormContext(DbContextOptions<FormContext> options) : base(options)
        {
        }
        public DbSet<DbForm> DbForm { get; set; }
       
    }

}
