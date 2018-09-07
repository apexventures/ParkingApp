using parkingappApi.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace parkingappApi.LogicLayer
{
    public class DeleteData
    {
        string con;
        public DeleteData(string configuration)
        {
            con = configuration;
        }
        public bool Deletebookings(RemoveData rmd)
        {
            try
            {
                using (SqlConnection conn = new SqlConnection(con))
                {
                    conn.Open();
                    using (SqlCommand command = new SqlCommand("DELETE FROM tblAssignedArea WHERE AssignedID = '"+rmd.assignedID+"' ", conn))
                    {
                        command.ExecuteNonQuery();
                    }                    
                    conn.Close();
                    return true;
                }
            }
            catch (SystemException ex)
            {
                return false;
            }
        }
    }
   
}
