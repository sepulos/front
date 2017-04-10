using BilleCar.BOL;
using BilleCar.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class RoleBs
    {
        private RoleDb objDb;

        public RoleBs()
        {
            objDb = new RoleDb();
        }
        public ICollection<Role> GetAll()
        {
            return objDb.GetAll().ToList();
        }

        public Role GetByID(int Id)
        {
            return objDb.GetById(Id);
        }
        public bool Insert(Role role)
        {
            if (IsValidOnInsert(role))
            {
                objDb.Insert(role);
                return true;
            }
            else
                return false;

        }
        public void Delete(int Id)
        {
            objDb.Delete(Id);
        }
        public bool Update(Role role)
        {
            if (IsValidOnUpdate(role))
            {
                objDb.Update(role);
                return true;
            }
            else
                return false;

        }
        public bool IsValidOnInsert(Role role)
        {
            return true;
        }
        public bool IsValidOnUpdate(Role role)
        {
            return true;
        }
    }
}
