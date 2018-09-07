using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using parkingappApi.LogicLayer;
using parkingappApi.Models;
using static parkingappApi.Models.HandleLogin;

namespace parkingappApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : Controller
    {
        AddUsers _ad;
        checkLogin _chk;
        FetchData _fetchdata;
        DeleteData _deleteData;
        public UserController(IPathProvider pathProvider,IConfiguration configuration )
        {            
            string con = configuration.GetConnectionString("DefaultConnection");
            _ad = new AddUsers(con,pathProvider);
            _chk = new checkLogin(con);
            _fetchdata = new FetchData(con);
            _deleteData = new DeleteData(con);
        }
        [HttpGet("[action]")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
        [HttpPost("[action]")]
        public bool PostUsers([FromBody]PutUsers value)
        {
          return  _ad.AddData(value);
        }
        [HttpPost("[action]")]
        public CheckLogin GetLogin([FromBody] CheckLogin lg)
        {
            return _chk.chkLogin(lg);
        }
        [HttpGet("[action]")]
        public List<LoadData> GetLocations()
        {
            return _fetchdata.LoadLocations();
        }
        [HttpPost("[action]")]
        public List<LoadParkingArea> GetParkingArea([FromBody] LoadParkingArea1 lpa)
        {
            return _fetchdata.LoadParkingArea(lpa);
        }
        [HttpPost("[action]")]
        public bool PostLocations([FromBody]InsertLocations value)
        {
            return _ad.AddLocations(value);
        }
        [HttpPost("[action]")]
        public bool PostParkingArea([FromBody]InsertParkingArea value)
        {
            return _ad.AddParkingArea(value);
        }
        [HttpPost("[action]")]
        public List<LoadAssignedArea> GetAssignedArea([FromBody] LoadAssignedArea1 lpa)
        {
            return _fetchdata.LoadAssignedArea(lpa);
        }
        [HttpPost("[action]")]
        public bool PostBookedArea([FromBody]InsertAssignedArea value)
        {
            return _ad.AddBookedArea(value);
        }
        [HttpPost("[action]")]
        public List<LoadBookedData> GetbookedData([FromBody] GetUserID id)
        {
            return _fetchdata.FetchBookedData(id);
        }
        [HttpDelete("[action]")]
        public bool Deletebookings([FromBody] RemoveData value)
        {
            return _deleteData.Deletebookings(value);
        }
        [HttpGet("[action]")]
        public List<LoadHoldData> GetHoldLocations()
        {
            return _fetchdata.FetchHoldData();
        }
        //[HttpPost("[action]")]
        //public bool GetboookedData([FromBody] LoadspData value)
        //{
        //    return _fetchdata.FetchSpData(value);
        //}
        [HttpPut("[action]")]
        public bool PutBookedData([FromBody] GetAssignedData value)
        {
            return _ad.UpdateBookedArea(value);
        }

    }
}