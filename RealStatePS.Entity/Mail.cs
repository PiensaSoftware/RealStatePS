using System;
using System.Collections.Generic;
using System.Text;

namespace RealStatePS.Entity
{
    public class Mail
    {
        public string Subject { get; set; }
        public string Content { get; set; }
        public List<FileAttachment> Files { get; set; }
    }
}
