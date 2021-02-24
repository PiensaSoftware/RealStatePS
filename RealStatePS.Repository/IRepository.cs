using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RealStatePS.Repository
{
    public interface IRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        Task<IEnumerable<T>> GetAllAsync();
        T Get(object key);
        Task<T> GetAsync(object key);
        T Find(Expression<Func<T, bool>> match);
        Task<T> FindAsync(Expression<Func<T, bool>> match);
        IEnumerable<T> FindAll(Expression<Func<T, bool>> match);
        Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> match);
        T Add(T entity);
        IEnumerable<T> AddRange(IEnumerable<T> entities);
        Task<T> AddAsync(T entity);
        T Update(T entity, object key);
        Task<T> UpdateAsync(T entity, object key);
        void Delete(T entity);
        void DeleteRange(IEnumerable<T> entities);
        Task<int> DeleteAsync(T entity);
        int Count();
        Task<int> CountAsync();
        DbCommand LoadCmd(string spName);
        DbCommand AddParameter(DbCommand cmd, string name, object value);
        IEnumerable<T> ExecuteSP(DbCommand cmd);
    }
}
