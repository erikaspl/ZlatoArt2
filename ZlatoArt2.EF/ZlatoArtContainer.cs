using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.EntityClient;
using System.Data.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZlatoArt2.EF
{
    public partial class ZlatoArtContainer
    {
        public static string GetConnectionString()
        {
            string baseConnectionString = ConfigurationManager.ConnectionStrings["ZlatoartContext-provider"].ConnectionString;

            EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();
            entityBuilder.Provider = "System.Data.SqlClient";
            entityBuilder.ProviderConnectionString = baseConnectionString;
            entityBuilder.Metadata = @"res://*/ZlatoArt.csdl|res://*/ZlatoArt.ssdl|res://*/ZlatoArt.msl";

            return entityBuilder.ToString();
        }
    }
}
