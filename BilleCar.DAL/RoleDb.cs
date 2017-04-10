using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL
{
    public class RoleDb : DALBase
    {


        public ICollection<Role> GetAll()
        {
            return db.Roles.ToList();
        }

        public Role GetById(int id)
        {
            return db.Roles.Where(x => x.RoleId == id).FirstOrDefault();
        }

        public void Insert(Role role)
        {
            db.Roles.Add(role);
            Save();
        }
        public void Delete(int id)
        {
            Role role = db.Roles.Where(x => x.RoleId == id).FirstOrDefault();
            db.Roles.Remove(role);
        }
        public void Update(Role role)
        {
            db.Entry(role).State = EntityState.Modified;
            db.Configuration.ValidateOnSaveEnabled = false;
            Save();
            db.Configuration.ValidateOnSaveEnabled = true;
        }
        public void Save()
        {
            db.SaveChanges();
        }
    }
}
