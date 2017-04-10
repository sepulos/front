using BilleCar.BLL;
using BilleCar.BOL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.ConsoleUI
{
    class Program
    {
        static void Main(string[] args)
        {
            DepartmentBs U = new DepartmentBs();
            U.Insert(new Department() { Adress="kaukaz", Name="lata sarp" });
        }
    }
}
