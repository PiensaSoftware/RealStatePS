using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace RealStatePS.Entity
{
    public class FileAttachment
    {
        public string Name { get; set; }
        public Stream File { get; set; }
        public string MediaType { get; set; }
    }
}
