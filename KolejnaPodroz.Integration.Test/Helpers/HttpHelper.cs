using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KolejnaPodroz.Integration.Test.Helpers
{
    internal class HttpHelper
    {
        public static StringContent GetJsonHttpContent(object items)
        {
            return new StringContent(JsonConvert.SerializeObject(items), Encoding.UTF8, "application/json");
        }

        internal static class Urls
        {
            public readonly static string PostConnetion = "/api/Connection/AdminPost";
            public readonly static string GetConnetion = "/api/Connection/";
        }
    }
}
