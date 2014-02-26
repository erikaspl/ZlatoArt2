using Amazon;
using ASM = Amazon.SimpleEmail.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ZlatoArt2.Model;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Email.AWS
{
    public class EmailSender : IEmailSender
    {
        private string _awsAccessKey;
        private string _awsSecretKey;
        private string _contactEmail;
        private string _contactFromEmail;
        private string _charset;

        public EmailSender(string awsAccessKey, string awsSecretKey, string contactEmail, string contactFromEmail, string charset)
        {
            _awsAccessKey = awsAccessKey;
            _awsSecretKey = awsSecretKey;
            _contactEmail = contactEmail;
            _contactFromEmail = contactFromEmail;
            _charset = charset;
        }

        public IEmailSendResult Send(IEmailMessage message)
        {
            var asmRequest = new ASM.ListVerifiedEmailAddressesRequest();
            var ses = AWSClientFactory.CreateAmazonSimpleEmailServiceClient(_awsAccessKey, _awsSecretKey, RegionEndpoint.USEast1);

            try
            {
                var awsConfirmResponse = ses.ListVerifiedEmailAddresses();
                var verifiedEmails = awsConfirmResponse.VerifiedEmailAddresses;
                if (verifiedEmails.Contains(_contactEmail) && verifiedEmails.Contains(_contactFromEmail))
                {
                    var emailRequest = new ASM.SendEmailRequest();
                    var destination = new ASM.Destination();
                    destination.ToAddresses.Add(_contactEmail);

                    var awsMessage = CreateMessage(message);
                    emailRequest.Destination = destination;
                    emailRequest.Message = awsMessage;
                    emailRequest.Source = _contactFromEmail;
                    emailRequest.ReplyToAddresses = new List<string>() { message.Email };

                    var awsSendResponse = ses.SendEmail(emailRequest);
                    var messageId = awsSendResponse.MessageId;

                    return new EmailSendResult{
                        Success = (awsSendResponse.HttpStatusCode == System.Net.HttpStatusCode.OK),
                        MessageId = awsSendResponse.MessageId,
                        Message = string.Empty
                    };    
                }
                else
                {
                    return new EmailSendResult
                    {
                        Success = false,
                        MessageId = string.Empty,
                        Message = string.Format("Unable to verify email address. {0} or {1}", _contactEmail, _contactFromEmail)
                    };    
                }

            }
            catch (Exception ex)
            {                
                return new EmailSendResult
                {
                    Success = false,
                    MessageId = string.Empty,
                    Message = ex.Message
                };  
            }
        }

        private ASM.Message CreateMessage(IEmailMessage message)
        {
            string subjectText = !string.IsNullOrEmpty(message.Subject) ? message.Subject : "General enquiry";
            var subject = new ASM.Content();
            subject.Charset = _charset;
            subject.Data = subjectText;

            var text = new ASM.Content();
            text.Charset = _charset;
            text.Data = message.Text;

            var body = new ASM.Body();
            body.Text = text;

            var awsMessage = new ASM.Message();
            awsMessage.Body = body;
            awsMessage.Subject = subject;

            return awsMessage;
        }

    }
}
