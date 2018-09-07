using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Hosting;
using parkingappApi.Models;

namespace parkingappApi.LogicLayer
{  
   
    public class AddUsers
    {
        int LastParkingID;
        int LocationID;
        string con;
        IPathProvider iph;
        public AddUsers(string configuration, IPathProvider ipath )
        {
            iph = ipath;
            con = configuration;          
        }
        public bool AddData(PutUsers value)
        {
            string body = htmlBody(value.FirstName, value.Password);
            sendEmail(value.Email, body);
            string user = "user";
            bool active = true;
            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {

                    SqlCommand cmd = new SqlCommand("insert into tblUser (FirstName,LastName,Email,Password,Address,Type,IsActive) values('" + value.FirstName + "','" + value.LastName + "','" + value.Email + "','" + value.Password + "','" + value.Address + "','" + user + "','" + active + "') ", conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    cmd.ExecuteNonQuery();
                    conn.Close();                   
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public void sendEmail(string mail, string body)
        {
            MailMessage o = new MailMessage("diteeru44@gmail.com", mail, "From Erudite solutions Faisalabad", body);
            o.IsBodyHtml = true;
            NetworkCredential netCred = new NetworkCredential("diteeru44@gmail.com", "eruditetest");
            SmtpClient smtpobj = new SmtpClient("smtp.gmail.com", 587);
            smtpobj.EnableSsl = true;
            smtpobj.Credentials = netCred;
            smtpobj.Send(o);
        }
        public string htmlBody(string stdname, string Password)
        {

            string body = string.Empty;

            using (StreamReader reader = new StreamReader(iph.MapPath("emailBody.html")))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{StdName}", stdname);
            body = body.Replace("{password}", Password);
            return body;
        }
        public bool AddLocations(InsertLocations value)
        {          
         
            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {

                    SqlCommand cmd = new SqlCommand("insert into tblParkingLocation (LocationName) values('" + value.LocationName + "')", conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool AddParkingArea(InsertParkingArea value)
        {
            LocationID = value.LocationID;

            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {

                    SqlCommand cmd = new SqlCommand("insert into tblParkingArea (ParkingArea,LocationID) values('" + value.ParkingArea + "','"+value.LocationID+ "'); SELECT CONVERT(int, SCOPE_IDENTITY());", conn);
                    conn.Open();
                    LastParkingID = (int)cmd.ExecuteScalar();
                    conn.Close();
                    AddAssignedArea();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool AddAssignedArea()
        {
            string date = DateTime.Now.ToString();

            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {

                    SqlCommand cmd = new SqlCommand("insert into tblAssignedArea (LocationID,ParkingID,UserID,Status,UpdateDate,IsActive,BookedDate) values('" + LocationID + "','" + LastParkingID + "','1','empty','"+date+"','true','"+date+"')", conn);
                    conn.Open();
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    cmd.ExecuteNonQuery();
                    conn.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool AddBookedArea(InsertAssignedArea asd)
        {
            string date = DateTime.Now.ToString();

            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {
                    conn.Open();
                    string query = "insert into tblAssignedArea (LocationID,ParkingID,UserID,Status,UpdateDate,IsActive,BookedDate)  values";

                    string dates = ""; 
                    for (int i = 0; i <= asd.BookedDate.Count - 1; i++)
                    {
                        dates += asd.BookedDate[i].ToString() +',';
                        query += "('" + asd.LocationID + "','" + asd.ParkingID + "','"+asd.UserID+"','hold','" + date + "','true','" + asd.BookedDate[i] + "'),";
                    }
                    query = query.Substring(0, query.Length - 1);
                    SqlCommand cmd = new SqlCommand(query, conn);
                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                        cmd.ExecuteNonQuery();
                    conn.Close();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public bool UpdateBookedArea(GetAssignedData GAD)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {

                    SqlCommand cmd = new SqlCommand("Update tblAssignedArea Set Status  = 'booked' where AssignedID ="+ GAD.AssignedID +"", conn);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                  //  LoadBOOKING(GAD.UserID,GAD.ParkingID,GAD.BookedDate);
                    return true;
                }
               
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        public List<sendEmail> LoadBOOKING(int userid,int parkingid,DateTime dt)
        {
           
            using (SqlConnection conn = new SqlConnection(con))
            {
                SqlCommand cmd = new SqlCommand(@"SELECT       tblAssignedArea.BookedDate, tblParkingArea.ParkingArea, tblParkingLocation.LocationName, tblUser.FirstName, tblUser.Email
                         FROM            tblAssignedArea INNER JOIN
                         tblParkingLocation ON tblAssignedArea.LocationID = tblParkingLocation.LocationID INNER JOIN
                         tblParkingArea ON tblAssignedArea.ParkingID = tblParkingArea.ParkingID INNER JOIN
                         tblUser ON tblAssignedArea.UserID = tblUser.UserID where tblUser.UserID = "+userid+"  and tblAssignedArea.ParkingID ="+parkingid+" and tblAssignedArea.BookedDate IN("+ dt + ")", conn);
                conn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                List<sendEmail> data = new List<sendEmail>();
                while (dr.Read())
                {
                    sendEmail ld = new sendEmail();
                    ld.LocationName = dr["LocationName"].ToString();
                    ld.ParkingArea = dr["ParkingArea"].ToString();
                    ld.FirstName = dr["FirstName"].ToString();
                    ld.Email = dr["Email"].ToString();
                    ld.BookedDate = dr["BookedDate"].ToString(); 
                    data.Add(ld);
                }
                string body = htmlbookedbody(data);
                sendEmailBookedArea(data[0].Email,body);
                return data;

            }
        }
        public string htmlbookedbody(List<sendEmail> data)
        {
            string body = string.Empty;
            using (StreamReader reader = new StreamReader(iph.MapPath("bookedEmail.html")))
            {
                body = reader.ReadToEnd();
            }
            string tableBody = "<table style='border=2px solid black'><tr><th>Location</th><th>Parking</th><th>Date</th></tr>";
            for (int i = 0; i < data.Count; i++)
            {
                tableBody += "<tr><td>" + data[i].LocationName + "</td><td>" + data[i].ParkingArea + "</td><td>"+ data[i].BookedDate + "</td></tr>";
            }
            tableBody += "</table>";
            body = body.Replace("{FirstName}", data[0].FirstName);
            body = body.Replace("{locationname}", data[0].LocationName);
            body = body.Replace("{parkingtable}", tableBody);           
            return body;
        }
        public void sendEmailBookedArea(string mail, string body)
        {
            MailMessage o = new MailMessage("diteeru44@gmail.com", mail, "From Erudite solutions Faisalabad", body);
            o.IsBodyHtml = true;
            NetworkCredential netCred = new NetworkCredential("diteeru44@gmail.com", "eruditetest");
            SmtpClient smtpobj = new SmtpClient("smtp.gmail.com", 587);
            smtpobj.EnableSsl = true;
            smtpobj.Credentials = netCred;
            smtpobj.Send(o);
        }

    }
}
