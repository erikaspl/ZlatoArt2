using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model;

namespace ZlatoArt2.Durandal.AcceptanceTests
{
    public class EmailSenderExceptionTester : IEmailSender
    {
        public Model.Email.IEmailSendResult Send(IEmailMessage message)
        {
            throw new Exception("This is test eexception");
        }
    }
}
