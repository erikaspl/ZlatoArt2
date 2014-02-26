[assembly: WebActivator.PreApplicationStartMethod(typeof(ZlatoArt2.Durandal.App_Start.NinjectWebCommon), "Start")]
[assembly: WebActivator.ApplicationShutdownMethodAttribute(typeof(ZlatoArt2.Durandal.App_Start.NinjectWebCommon), "Stop")]

namespace ZlatoArt2.Durandal.App_Start
{
    using System;
    using System.Web;

    using Microsoft.Web.Infrastructure.DynamicModuleHelper;

    using Ninject;
    using Ninject.Web.Common;
    using ZlatoArt2.Model;
    using ZlatoArt2.Email.AWS;
    using System.Configuration;
    using ZlatoArt2.Model.Email;
    using ZlatoArt2.EF;

    public static class NinjectWebCommon 
    {
        private static readonly Bootstrapper bootstrapper = new Bootstrapper();

        public static IKernel Kernel
        {
            get
            {
                return bootstrapper.Kernel;
            }
        }

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start() 
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }
        
        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }
        
        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
           
            RegisterServices(kernel);
            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IEmailSender>().ToMethod<EmailSender>(m => CreateEmailSender());
            kernel.Bind<IEmailMessageRepository>().ToMethod(m => CreateEmailMessageRepository());
        }

        private static EmailMessageRepository CreateEmailMessageRepository()
        {
            return new EmailMessageRepository(new ZlatoartContext());
        }

        private static EmailSender CreateEmailSender()
        {
            string awsAccessKey =  ConfigurationManager.AppSettings["AWSAccessKey"];
            string awsSecretKey =  ConfigurationManager.AppSettings["AWSSecretKey"];
            string contactEmail = ConfigurationManager.AppSettings["ContactEmail"];
            string contactFromEmail =  ConfigurationManager.AppSettings["ContactFromEmail"];
            string charset = "UTF-8";

            return new EmailSender(awsAccessKey, awsSecretKey, contactEmail, contactFromEmail, charset);
        }
    }
}
