using System;
using System.Collections.Generic;
using System.Text;

namespace RealStatePS.Entity
{
    public class MethodResponse<T>
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }
}
