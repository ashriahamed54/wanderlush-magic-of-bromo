using Bromo.Domain.Entities;

namespace Bromo.Application.Common.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
    Guid? ValidateToken(string token);
}
