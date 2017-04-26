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
    public class AnnouncementController : ApiController
    {

        AnnouncementBs announcementObjBs;
        public AnnouncementController()
        {
            announcementObjBs = new AnnouncementBs();
        }
        [ResponseType(typeof(ICollection<Announcement>))]
        public IHttpActionResult Get()
        {
            return Ok(announcementObjBs.GetAll());
        }
        [ResponseType(typeof(Announcement))]
        public IHttpActionResult Get(int id)
        {
            Announcement announcement = announcementObjBs.GetByID(id);
            if (announcement != null)
                return Ok(announcement);
            else
                return NotFound();
        }

        [ResponseType(typeof(Announcement))]
        public IHttpActionResult Post(Announcement announcement)
        {
            if (ModelState.IsValid)
            {
                if (announcementObjBs.Insert(announcement))
                {
                    return CreatedAtRoute("DefaultApi", new { id = announcement.AnnouncementId }, announcement);

                }
                else
                {
                    foreach (var error in announcementObjBs.Errors)
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

        [ResponseType(typeof(Announcement))]
        public IHttpActionResult Put(int id, Announcement announcement)
        {
            if (ModelState.IsValid)
            {
                announcementObjBs.Update(announcement);
                return Ok(announcement);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(Announcement))]
        public IHttpActionResult Delete(int id)
        {
            Announcement announcement = announcementObjBs.GetByID(id);
            if (announcement != null)
            {
                announcementObjBs.Delete(id);
                return Ok(announcement);
            }
            else
            {
                return NotFound();
            }
        }


    }
}
