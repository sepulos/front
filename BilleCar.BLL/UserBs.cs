using BilleCar.BOL;
using BilleCar.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BLL
{
    public class UserBs
    {
        private UserDb objDb;
        public List<string> Errors = new List<string>();

        public UserBs()
        {
            objDb = new UserDb();
        }
        public ICollection<User> GetAll()
        {
            return objDb.GetAll().ToList();
        }

        public bool Insert(User user)
        {
            if (IsValidOnInsert(user))
            {
                objDb.Insert(user);
                return true;
            }
            else
                return false;

        }
        public void Delete(string email)
        {
            objDb.Delete(email);
        }
        public bool Update(User user)
        {
            if (IsValidOnUpdate(user))
            {
                objDb.Update(user);
                return true;
            }
            else
                return false;

        }
        public User GetByEmail(string email)
        {
            return objDb.GetByEmail(email);

            //tutaj mordo sproboj
        }
        //public bool GetByEmail(ref User usr)
        //{
        //    var user = objDb.GetByEmail(usr.Email);
         //   if (user == null)
        //    {
        //        Errors.Add("Email nie istnieje");
        //    }
        //    else if (user.Pass != usr.Pass)
        //    {
        //        Errors.Add("Błędne hasło");
        //    }
        //    if (Errors.Count() == 0)
         //   {
        //        usr = user;
       //         return true;
       //     }
        //    else
       //         return false;
       // }
        public bool IsValidOnInsert(User user)
        {
            return true;
        }
        //public bool IsValidOnInsert(User usr)
        //{
         //   UserBs userObjBs = new UserBs();
         //
//
         //   int count;
            //Unique Email Validation
        //    string EmailValue = usr.Email.ToString();
       //     count = userObjBs.GetAll().Where(x => x.Email == EmailValue).ToList().Count();
        //    if (count != 0)
       //     {
        //        Errors.Add("Email Already Exist");
       //     }
//
      //      if (Errors.Count() == 0)
      //          return true;
     //       else
       //         return false;
     //   }
        public bool IsValidOnUpdate(User user)
        {
            return true;
        }
    }
}
