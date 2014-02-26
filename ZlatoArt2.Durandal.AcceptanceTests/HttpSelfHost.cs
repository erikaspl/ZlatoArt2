using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.SelfHost;

namespace ZlatoArt2.Durandal.AcceptanceTests
{
    public static class HttpSelfHost
    {
        private static Uri _baseAddress = new Uri("http://localhost:9876");
        public static Uri BaseAddress
        {
            get
            {
                return _baseAddress;
            }
        }

        public static HttpSelfHostServer GetServer()
        {
            var config = new HttpSelfHostConfiguration(_baseAddress);

            new Bootstrap().Configure(config);
            var selfHostServer = new HttpSelfHostServer(config);
            return selfHostServer;
        }

        public static HttpContent CreateHttpRequestMessage<T>(T obj)
        {
            MediaTypeFormatter formatter = new JsonMediaTypeFormatter();
            HttpContent content = new ObjectContent<T>(obj, formatter);
            return content;
        }
    }
}
