using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Durandal.AcceptanceTests
{
    public class EmailSenderTester : IEmailSender
    {
        private bool _success;
        private string _message;
        private string _messageId;
        public EmailSenderTester(bool success, string message, string messageId)
        {
            _success = success;
            _message = message;
            _messageId = messageId;
        }

        public Model.Email.IEmailSendResult Send(IEmailMessage message)
        {
            return new EmailSendResult() {
                Success = _success,
                Message = _message,
                MessageId = _messageId
            };
        }
    }
}
