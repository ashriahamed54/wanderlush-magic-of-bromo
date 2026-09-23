using Bromo.Application.DTOs.Users;

namespace Bromo.Application.Services;

public interface IUserService
{
    Task<UserDto> GetProfileAsync(Guid userId, CancellationToken cancellationToken = default);
    Task<UserDto> UpdateProfileAsync(Guid userId, UpdateProfileRequestDto request, CancellationToken cancellationToken = default);
    Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordRequestDto request, CancellationToken cancellationToken = default);
    Task<bool> DeleteAccountAsync(Guid userId, CancellationToken cancellationToken = default);
}
