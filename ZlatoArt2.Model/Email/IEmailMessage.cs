using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ZlatoArt2.Model
{
    public interface IEmailMessage
    {
        string FullName { get; set; }
        string Email { get; set; }
        string Subject { get; set; }
        string Text { get; set; }
    }
}
