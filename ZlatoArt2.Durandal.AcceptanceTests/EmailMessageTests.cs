using Ninject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http.SelfHost;
using Xunit;
using ZlatoArt2.EF;
using ZlatoArt2.Email.AWS;
using ZlatoArt2.Model;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Durandal.AcceptanceTests
{
    public class EmailMessageTests
    {
        private HttpSelfHostServer _server;

        public EmailMessageTests()
        {
            _server = HttpSelfHost.GetServer();
        }

        //[Fact]
        public void EmailRequestStubsTest()
        {
            var kernel = new StandardKernel();
            kernel.Bind<IEmailSender>().ToMethod<EmailSenderTester>(m => CreateEmailSenderTester(true, "message", "messageId"));
            kernel.Bind<IEmailMessageRepository>().ToMethod(m => CreateEmailMessageRepositoryTester());

            var message = new Message()
            {
                Email = "erikaspl@gmail.com",
                FullName = "Erikas Pliauksta",
                Subject = "This is my subject",
                Text = "This is email text"
            };

            _server.Configuration.DependencyResolver = new NinjectResolver(kernel);
            using (var client = new HttpClient(_server))
            {
                client.BaseAddress = HttpSelfHost.BaseAddress;
                var requestMessage = HttpSelfHost.CreateHttpRequestMessage<Message>(message);
                var response = client.PostAsync("api/Message", requestMessage);

                Assert.Equal(response.Result.StatusCode, HttpStatusCode.OK);

            }
        }

        //[Fact]
        public void EmailRequestTest()
        {
            var kernel = new StandardKernel();
            kernel.Bind<IEmailSender>().ToMethod<EmailSender>(m => CreateEmailSender());
            kernel.Bind<IEmailMessageRepository>().ToMethod(m => CreateEmailMessageRepositoryTester());

            var message = new Message()
            {
                Email = "erikaspl@gmail.com",
                FullName = "Erikas Pliauksta",
                Subject = "This is my subject",
                Text = "This is email text"
            };

            _server.Configuration.DependencyResolver = new NinjectResolver(kernel);
            using (var client = new HttpClient(_server))
            {
                client.BaseAddress = HttpSelfHost.BaseAddress;
                var requestMessage = HttpSelfHost.CreateHttpRequestMessage<Message>(message);
                var response = client.PostAsync("api/Message", requestMessage);

                Assert.Equal(response.Result.StatusCode, HttpStatusCode.OK);

            }
        }

        //[Fact]
        [UseDatabase]
        public void EmailRequestTestRealDb()
        {
            var kernel = new StandardKernel();
            kernel.Bind<IEmailSender>().ToMethod(m => CreateEmailSenderTester(true, "message", "messageId"));
            kernel.Bind<IEmailMessageRepository>().ToMethod(m => CreateEmailMessageRepository());

            var message = new Message()
            {
                Email = "erikaspl@gmail.com",
                FullName = "Erikas Pliauksta",
                Subject = "This is my subject",
                Text = "This is email text"
            };

            _server.Configuration.DependencyResolver = new NinjectResolver(kernel);
            using (var client = new HttpClient(_server))
            {
                client.BaseAddress = HttpSelfHost.BaseAddress;
                var requestMessage = HttpSelfHost.CreateHttpRequestMessage<Message>(message);
                var response = client.PostAsync("api/Message", requestMessage);

                Assert.Equal(response.Result.StatusCode, HttpStatusCode.OK);

                var context = new ZlatoartContext();

                var messages = context.Messages.Where(m => m.Email == message.Email);

                Assert.Equal(messages.Count(), 1);
                Assert.Equal(messages.First().FullName, message.FullName);
                Assert.Equal(messages.First().Subject, message.Subject);
                Assert.Equal(messages.First().Text, message.Text);
            }
        }

        //[Fact]
        public void EmailSenderExceptionTest()
        {
            var kernel = new StandardKernel();
            kernel.Bind<IEmailSender>().ToMethod(m => CreateEmailSenderExceptionTester());
            kernel.Bind<IEmailMessageRepository>().ToMethod(m => CreateEmailMessageRepositoryTester());

            var message = new Message()
            {
                Email = "erikaspl@gmail.com",
                FullName = "Erikas Pliauksta",
                Subject = "This is my subject",
                Text = "This is email text"
            };

            _server.Configuration.DependencyResolver = new NinjectResolver(kernel);
            using (var client = new HttpClient(_server))
            {
                client.BaseAddress = HttpSelfHost.BaseAddress;
                var requestMessage = HttpSelfHost.CreateHttpRequestMessage<Message>(message);
                var response = client.PostAsync("api/Message", requestMessage);

                Assert.Equal(response.Result.StatusCode, HttpStatusCode.InternalServerError);

            }
        }

        private static EmailSender CreateEmailSender()
        {
            var AWSAccessKey = "AKIAJUGXJOEAWSMCCP5A";
            var AWSSecretKey = "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";
            var ContactEmail = "info@zlatoart.com";
            var ContactFromEmail = "info@zlatoart.com";
            var charset = "UTF-8";
            return new EmailSender(AWSAccessKey, AWSSecretKey, ContactEmail, ContactFromEmail, charset);
        }

        private static EmailMessageRepository CreateEmailMessageRepository()
        {
            return new EmailMessageRepository(new ZlatoartContext());
        }

        private static EmailMessageRepositoryTester CreateEmailMessageRepositoryTester()
        {
            return new EmailMessageRepositoryTester();
        }

        private static EmailSenderTester CreateEmailSenderTester(bool success, string message, string messageId)
        {
            return new EmailSenderTester(success, message, messageId);
        }

        private static EmailSenderExceptionTester CreateEmailSenderExceptionTester()
        {
            return new EmailSenderExceptionTester();
        }
    }
}
