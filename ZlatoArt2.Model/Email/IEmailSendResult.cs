using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZlatoArt2.Model.Email
{
    public interface IEmailSendResult
    {
        bool Success { get; }
        string MessageId { get; }
        string Message { get; }
    }
}
