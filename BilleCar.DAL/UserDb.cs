using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.DAL
{
    public class UserDb : DALBase
    {


        public ICollection<User> GetAll()
        {
            return db.Users.ToList();
        }

        public User GetByEmail(string email)
        {
            return db.Users.Find(email);
        }

        public void Insert(User user)
        {
            db.Users.Add(user);
            Save();
        }
        /*   public void Delete(string email)
           {
               User user = db.Users.Where(x => x.Email == email).FirstOrDefault();
               db.Users.Remove(user);
           }*/


        public void Delete(string email)
        {
            User user = db.Users.Find(email);
            db.Users.Remove(user);
            Save();
        }
        public void Update(User user)
        {
            db.Entry(user).State = EntityState.Modified;
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
