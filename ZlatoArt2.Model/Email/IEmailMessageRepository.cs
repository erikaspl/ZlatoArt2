using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZlatoArt2.Model.Email
{
    public interface IEmailMessageRepository
    {
        bool SaveMessage(Model.Message message);
    }
}
