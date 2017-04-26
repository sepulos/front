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
    public class DepartmentController : ApiController
    {

        DepartmentBs departmentObjBs;
        public DepartmentController()
        {
            departmentObjBs = new DepartmentBs();
        }
        [ResponseType(typeof(ICollection<Department>))]
        public IHttpActionResult Get()
        {
            return Ok(departmentObjBs.GetAll());
        }
        [ResponseType(typeof(Department))]
        public IHttpActionResult Get(int id)
        {
            Department department = departmentObjBs.GetByID(id);
            if (department != null)
                return Ok(department);
            else
                return NotFound();
        }
        [ResponseType(typeof(Department))]
        public IHttpActionResult Post(Department department)
        {
            if (ModelState.IsValid)
            {
                if (departmentObjBs.Insert(department))
                {
                    return CreatedAtRoute("DefaultApi", new { id = department.DepartmentId }, department);

                }
                else
                {
                    foreach (var error in departmentObjBs.Errors)
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

        [ResponseType(typeof(Department))]
        public IHttpActionResult Put(int id, Department department)
        {
            if (ModelState.IsValid)
            {
                departmentObjBs.Update(department);
                return Ok(department);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [ResponseType(typeof(Department))]
        public IHttpActionResult Delete(int id)
        {
            Department department = departmentObjBs.GetByID(id);
            if (department != null)
            {
                departmentObjBs.Delete(id);
                return Ok(department);
            }
            else
            {
                return NotFound();
            }
        }


    }
}
