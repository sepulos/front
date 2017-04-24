using BilleCar.BLL;
using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace BilleCar.API.Controllers
{
    [EnableCors("*", "*", "*")]
    public class UserController : ApiController
    {

        UserBs userObjBs;
        public UserController()
        {
            userObjBs = new UserBs();
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Get()
        {
            return Ok(userObjBs.GetAll());
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Get(string email)
        {
            User user =userObjBs.GetByEmail(email);
            if (user != null)
                return Ok(user);
            else
                return NotFound();
        }
        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Post(User user)
        {
            if (ModelState.IsValid)
            {
                if (userObjBs.Insert(user))
                {
                    return CreatedAtRoute("DefaultApi", new { email = user.Email }, user);
                }
                else
                {
                    foreach (var error in userObjBs.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                    return BadRequest(ModelState);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<Department>))]
        public IHttpActionResult Put(string email, User user)
        {
            if (ModelState.IsValid)
            {
                userObjBs.Update(user);
                return Ok(user);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(ICollection<User>))]
        public IHttpActionResult Delete(string email)
        {
            User user = userObjBs.GetByEmail(email);
            if (user != null)
            {
                userObjBs.Delete(email);
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }


    }
}
