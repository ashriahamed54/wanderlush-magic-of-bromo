using Bromo.Domain.Common;
using Bromo.Domain.Enums;

namespace Bromo.Domain.Entities;

public class User : BaseEntity
{
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Bio { get; set; }
    public string? AvatarUrl { get; set; }
    public UserRole Role { get; set; } = UserRole.Traveler;
    public bool IsActive { get; set; } = true;
    public DateTime? LastLoginAtUtc { get; set; }

    public void UpdateProfile(string fullName, string? phoneNumber, string? bio, string? avatarUrl)
    {
        FullName = fullName.Trim();
        PhoneNumber = phoneNumber?.Trim();
        Bio = bio?.Trim();
        AvatarUrl = avatarUrl?.Trim();
        UpdatedAtUtc = DateTime.UtcNow;
    }

    public void UpdatePassword(string newPasswordHash)
    {
        PasswordHash = newPasswordHash;
        UpdatedAtUtc = DateTime.UtcNow;
    }

    public void RecordLogin()
    {
        LastLoginAtUtc = DateTime.UtcNow;
    }
}
