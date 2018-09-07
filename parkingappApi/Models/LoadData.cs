using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace parkingappApi.Models
{
    public class LoadData
    {
        public int LocationID { get; set; }
        public string LocationName { get; set; }
    }
    public class LoadParkingArea
    {
        public int LocationID { get; set; }
        public string ParkingArea { get; set; }
        public int ParkingID { get; set; }
        public string Status { get; set; }

    }
    public class LoadParkingArea1
    {
        public int LocationID { get; set; }       
    }
    public class LoadAssignedArea
    {
        public int LocationID { get; set; }
        public DateTime FromDate { get; set; }
        public int ParkingID { get; set; }
    }
    public class LoadAssignedArea1
    {
        public int LocationID { get; set; }
        public int ParkingID { get; set; }
    }
    public class LoadBookedData {
        public string ParkingArea { get; set; }
        public string LocationName { get; set; }
        public DateTime BookedDate { get; set; }
        public int AssignedID { get; set; }

    }
    public class GetUserID {
        public int UserID { get; set; }
    }
    public class LoadspData {
        public int iDisplayLength { get; set; }
        public int iDisplayStart { get; set; }
        public int iSortCol_0 { get; set; }
        public string sSortDir_0 { get; set; }
        public string sSearch { get; set; }
        public int uID { get; set; }
    }
    public class Booking {
       // public int AssignedID { get; set; }
        public string ParkingArea { get; set; }
        public string LocationName { get; set; }
        public DateTime BookedDate { get; set; }
    }
    public class LoadHoldData
    {
        public int AssignedID { get; set; }
        public string FirstName { get; set; }
        public string LocationName { get; set; }
        public string ParkingArea { get; set; }
        public DateTime BookedDate { get; set; }       
        public string Status { get; set; }
        public int UserID { get; set; }
        public int ParkingID { get; set; }
        public int LocationID { get; set; }
    }
    public class GetAssignedData
    {
        public int AssignedID { get; set; }
        public int LocationID { get; set; }
        public int UserID { get; set; }
        public int ParkingID { get; set; }
        public DateTime BookedDate { get; set; }
        
    }
}
