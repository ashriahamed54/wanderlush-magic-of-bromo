using Bromo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Bromo.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
