using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections.Specialized;
using System.Configuration;
using ZlatoArt2.Model;
using Breeze.WebApi.EF;
using ZlatoArt2.EF;
using ZlatoArt2.Model.Email;

namespace ZlatoArt2.Durandal.Controllers
{
    public class MessageController : ApiController
    {
        private IEmailSender _emailSender;
        private IEmailMessageRepository _repository;

        public MessageController(IEmailSender emailSender, IEmailMessageRepository repository)
        {
            _emailSender = emailSender;
            _repository = repository;
        }

        [HttpPost]
        public HttpResponseMessage Post(Model.Message message)
        {
            HttpResponseMessage response;

            try
            {
                var emailSendResult = _emailSender.Send(message);

                if (emailSendResult.Success)
                {
                    response = Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    response = Request.CreateResponse(HttpStatusCode.InternalServerError, emailSendResult.Message);
                }

                _repository.SaveMessage(message);
            }
            catch (Exception ex)
            {
                response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

            return response;
        }
    }
}
