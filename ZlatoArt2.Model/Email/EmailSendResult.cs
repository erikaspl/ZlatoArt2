using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZlatoArt2.Model.Email
{
    public class EmailSendResult : IEmailSendResult
    {
        public bool Success { get; set; }

        public string MessageId {get; set; }

        public string Message { get; set; }
    }
}
