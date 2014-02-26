using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Model
{
    public interface IEmailSender
    {
        IEmailSendResult Send(IEmailMessage message);        
    }
}
