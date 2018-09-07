using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace parkingappApi
{
    public class InsertData
    {

    }
    public class PutUsers
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public string Type { get; set; }
        public bool IsActive { get; set; }
    }
    public class InsertLocations
    {
        public string LocationName { get; set; }
    }
    public class InsertParkingArea
    {
        public int ParkingID { get; set; }
        public string ParkingArea { get; set; }
        public int LocationID { get; set; }
    }
    public class InsertAssignedArea
    {
        public int LocationID { get; set; }
        public int ParkingID { get; set; }
        public int UserID { get; set; }
        public string Status { get; set; }
        public List<DateTime> BookedDate { get; set; }
        public byte IsActive { get; set; }      
        public DateTime UpdateDate { get; set; }

    }
    public class sendEmail {
        public string BookedDate { get; set; }
        public string ParkingArea { get; set; }
        public string LocationName { get; set; }
        public string FirstName { get; set; }
        public string Email { get; set; }

    }
   
}
