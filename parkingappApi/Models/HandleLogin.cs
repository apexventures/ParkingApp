using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace parkingappApi.Models
{
    public class HandleLogin
    {
        public class CheckLogin
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public string FirstName { get; set; }
            public string Type { get; set; }
            public bool IsLogin { get; set; }
            public int UserID { get; set; }

        }
        //public class RtnLogIn
        //{
        //    public bool IsLogin { get; set; }

        //}

    }
    

}
