﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BilleCar.BOL
{
    public partial class Announcement
    {
        public Announcement()
        {
            StartDate = DateTime.Now;
            DepartmentRefId = 1;
            AutorRefUser = "admin@o2.pl";
        }

        [Key]
        public int AnnouncementId { get; set; }
        public string AutorRefUser { get; set; }
        [ForeignKey("AutorRefUser")]
        public User AuthorEmail { get; set; }
        public int DepartmentRefId { get; set; }
        [ForeignKey("DepartmentRefId")]
        public Department DepartmentId { get; set; }
        public string StartPlace { get; set; }
        public string EndPlace { get; set; }
        public DateTime? AddDate { get; set; }
        public DateTime StartDate { get; set; }
        public int FreeSlots { get; set; }

        public ICollection<AnnoucmentUser> AnnoucmentUser { get; set; }
    }
}
