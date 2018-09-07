using parkingappApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace parkingappApi.LogicLayer
{
    public class FetchData
    {
        string con;
        public FetchData(string configuration)
        {
            con = configuration;
        }
        public List<LoadData> LoadLocations()
        {           
            using (SqlConnection conn = new SqlConnection(con))
            {
               
                SqlCommand cmd = new SqlCommand("select * from tblParkingLocation", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<LoadData> data = new List<LoadData>();
                while (dr.Read())
                {
                    LoadData ld = new LoadData();
                    ld.LocationID = Convert.ToInt32(dr["LocationID"]);
                    ld.LocationName= dr["LocationName"].ToString();
                    data.Add(ld);
                }
                return data;
            }
        }
        public List<LoadParkingArea> LoadParkingArea(LoadParkingArea1 lpa)
        {
            using (SqlConnection conn = new SqlConnection(con))
            {

                SqlCommand cmd = new SqlCommand("select * from tblParkingArea where LocationID ='"+lpa.LocationID+"'", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<LoadParkingArea> data = new List<LoadParkingArea>();
                while (dr.Read())
                {
                    LoadParkingArea ld = new LoadParkingArea();
                    ld.LocationID =Convert.ToInt32( dr["LocationID"]);
                    ld.ParkingID =Convert.ToInt32(dr["ParkingID"]);
                    ld.ParkingArea = dr["ParkingArea"].ToString();                   
                    data.Add(ld);
                }
                return data;
            }
        }
        public List<LoadAssignedArea> LoadAssignedArea(LoadAssignedArea1 lpa)
        {
            using (SqlConnection conn = new SqlConnection(con))
            {

                SqlCommand cmd = new SqlCommand("select BookedDate,LocationID,ParkingID from tblAssignedArea where LocationID = '" + lpa.LocationID+ "' and ParkingID='"+lpa.ParkingID+"' and BookedDate >='" + DateTime.Now+"' and Status ='booked'", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<LoadAssignedArea> data = new List<LoadAssignedArea>();
                while (dr.Read())
                {
                    LoadAssignedArea ld = new LoadAssignedArea();
                    ld.LocationID = Convert.ToInt32(dr["LocationID"]);
                    ld.ParkingID = Convert.ToInt32(dr["LocationID"]);
                    ld.FromDate = Convert.ToDateTime(dr["BookedDate"]);
                    data.Add(ld);
                }
                return data;
            }
        }
        public List<LoadBookedData> FetchBookedData(GetUserID gui)
        {
            using (SqlConnection conn = new SqlConnection(con))
            {

                SqlCommand cmd = new SqlCommand(@"SELECT  tblAssignedArea.AssignedID, tblParkingArea.ParkingArea, tblParkingLocation.LocationName, tblAssignedArea.BookedDate
                         FROM tblAssignedArea INNER JOIN
                         tblParkingLocation ON tblAssignedArea.LocationID = tblParkingLocation.LocationID INNER JOIN
                         tblParkingArea ON tblAssignedArea.ParkingID = tblParkingArea.ParkingID
						 where tblAssignedArea.UserID ='" + gui.UserID + "' and tblAssignedArea.Status = 'booked'", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<LoadBookedData> data = new List<LoadBookedData>();
                while (dr.Read())
                {
                    LoadBookedData ld = new LoadBookedData();
                    ld.AssignedID = Convert.ToInt32( dr["AssignedID"]);
                    ld.ParkingArea = dr["ParkingArea"].ToString();
                    ld.LocationName = dr["LocationName"].ToString();
                    ld.BookedDate = Convert.ToDateTime( dr["BookedDate"]);
                    data.Add(ld);
                }
                return data;
            }
        }
        public List<LoadHoldData> FetchHoldData()
        {
            using (SqlConnection conn = new SqlConnection(con))
            {

                SqlCommand cmd = new SqlCommand(@"SELECT tblAssignedArea.AssignedID, tblUser.FirstName, tblParkingLocation.LocationName, tblParkingArea.ParkingArea, tblAssignedArea.BookedDate, tblAssignedArea.Status, tblAssignedArea.UserID, tblAssignedArea.ParkingID, 
                         tblAssignedArea.LocationID
                         FROM tblAssignedArea INNER JOIN
                         tblParkingLocation ON tblAssignedArea.LocationID = tblParkingLocation.LocationID INNER JOIN
                         tblParkingArea ON tblAssignedArea.ParkingID = tblParkingArea.ParkingID INNER JOIN
                         tblUser ON tblAssignedArea.UserID = tblUser.UserID
						where tblAssignedArea.Status = 'hold' and tblAssignedArea.BookedDate >= '"+DateTime.Now+"'", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<LoadHoldData> data = new List<LoadHoldData>();
                while (dr.Read())
                {
                    LoadHoldData ld = new LoadHoldData();
                    ld.AssignedID = Convert.ToInt32(dr["AssignedID"]);
                    ld.UserID = Convert.ToInt32(dr["UserID"]);
                    ld.ParkingID = Convert.ToInt32(dr["ParkingID"]);
                    ld.LocationID = Convert.ToInt32(dr["LocationID"]);
                    ld.ParkingArea = dr["ParkingArea"].ToString();
                    ld.FirstName = dr["FirstName"].ToString();
                    ld.LocationName = dr["LocationName"].ToString();
                    ld.Status = dr["Status"].ToString();
                    ld.BookedDate = Convert.ToDateTime(dr["BookedDate"]);
                    data.Add(ld);
                }
                return data;
            }
        }
        //public bool FetchSpData(LoadspData sp)
        //{
        //    int displayLength = sp.iDisplayLength;
        //    int displayStart = sp.iDisplayStart;
        //    int sortCol = sp.iSortCol_0;
        //    string sortDir =sp. sSortDir_0;
        //    string search = sp.sSearch;
        //    List<Booking> bk = new List<Booking>();
        //    int filteredCount = 0;
        //    using (SqlConnection conn = new SqlConnection(con))
        //    {
        //        SqlCommand cmd = new SqlCommand("spGetUserBookings", conn);
        //        cmd.CommandType = CommandType.StoredProcedure;

        //        SqlParameter paramDisplayLength = new SqlParameter()
        //        {
        //            ParameterName = "@DisplayLength",
        //            Value = displayLength
        //        };
        //        cmd.Parameters.Add(paramDisplayLength);

        //        SqlParameter paramDisplayStart = new SqlParameter()
        //        {
        //            ParameterName = "@DisplayStart",
        //            Value = displayStart
        //        };
        //        cmd.Parameters.Add(paramDisplayStart);

        //        SqlParameter paramSortCol = new SqlParameter()
        //        {
        //            ParameterName = "@SortCol",
        //            Value = sortCol
        //        };
        //        cmd.Parameters.Add(paramSortCol);

        //        SqlParameter paramSortDir = new SqlParameter()
        //        {
        //            ParameterName = "@SortDir",
        //            Value = sortDir
        //        };
        //        cmd.Parameters.Add(paramSortDir);

        //        SqlParameter paramSearchString = new SqlParameter()
        //        {
        //            ParameterName = "@Search",
        //            Value = string.IsNullOrEmpty(search) ? null : search
        //        };
        //        cmd.Parameters.Add(paramSearchString);

        //        SqlParameter paraminsertuserid = new SqlParameter()
        //        {
        //            ParameterName = "@userid",
        //          // Value = page
        //        };
        //        cmd.Parameters.Add(paramSearchString);
        //        conn.Open();
        //        SqlDataReader rdr = cmd.ExecuteReader();
        //        while (rdr.Read())
        //        {
        //            Booking book = new Booking();
        //           // book.AssignedID = Convert.ToInt32(rdr["AssignedID"]);
        //            filteredCount = Convert.ToInt32(rdr["TotalCount"]);
        //            book.ParkingArea = rdr["ParkingArea"].ToString();
        //            book.LocationName = rdr["LocationName"].ToString();
        //            book.BookedDate = Convert.ToDateTime( rdr["BookedDate"]);
        //            bk.Add(book);
        //        }
        //    }
        //    var result = new
        //    {
        //        iTotalRecords = GetEmployeeTotalCount(),
        //        iTotalDisplayRecords = filteredCount,
        //        aaData = bk

        //    };
        //    return true;

        //JavaScriptSerializer js = new JavaScriptSerializer();
        //    //Context.Response.Write(js.Serialize(result));
        //}
        //private int GetEmployeeTotalCount()
        //{
        //    int totalEmployeeCount = 0;
        //    using (SqlConnection conn = new SqlConnection(con))
        //    {
        //        SqlCommand cmd = new
        //            SqlCommand("select count(*) from tblAssignedArea", conn);
        //        conn.Open();
        //        totalEmployeeCount = (int)cmd.ExecuteScalar();
        //    }
        //    return totalEmployeeCount;
        //}
    }
}
