using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Durandal.AcceptanceTests
{
    public class EmailMessageRepositoryTester : IEmailMessageRepository
    {
        public bool SaveMessage(Model.Message message)
        {
            return true;
        }
    }
}
