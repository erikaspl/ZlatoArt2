using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.EF
{
    public class EmailMessageRepository : IEmailMessageRepository
    {
        private ZlatoartContext _contextProvider;
        public EmailMessageRepository(ZlatoartContext contextProvider)
        {
            _contextProvider = contextProvider;
        }

        public bool SaveMessage(Model.Message message)
        {
            _contextProvider.Messages.Add(message);
            var savedCount = _contextProvider.SaveChanges();

            return (savedCount > 0);
        }
    }
}
