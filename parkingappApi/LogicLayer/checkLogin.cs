using parkingappApi.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using static parkingappApi.Models.HandleLogin;

namespace parkingappApi.LogicLayer
{
    public class checkLogin
    {
        string con;
        public checkLogin(string configuration)
        {
            con = configuration;
        }
        public CheckLogin chkLogin(CheckLogin lg)
        {
            DataTable dt = new DataTable();
            using (SqlConnection conn = new SqlConnection(con))
            {
                SqlCommand cmd = new SqlCommand("select * from tblUser Where Email = '" + lg.Email + "' AND Password ='" + lg.Password + "'", conn);
                conn.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                CheckLogin ab = new CheckLogin();
                if (dt.Rows.Count > 0)
                {
                   ab.Email= dt.Rows[0]["Email"].ToString();
                    ab.FirstName = dt.Rows[0]["FirstName"].ToString();
                    ab.Type = dt.Rows[0]["Type"].ToString();
                    ab.UserID =Convert.ToInt32( dt.Rows[0]["UserID"]);
                    ab.IsLogin = true;

                }
                else
                {
                    ab.Email = null;
                    ab.FirstName = null;
                    ab.Type = null;
                    ab.IsLogin = false;
                  
                }

                conn.Close();
                return ab;
            }
        }
    }
}
