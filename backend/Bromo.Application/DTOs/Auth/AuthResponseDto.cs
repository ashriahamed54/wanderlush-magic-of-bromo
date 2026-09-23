using Bromo.Application.DTOs.Users;

namespace Bromo.Application.DTOs.Auth;

public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public string TokenType { get; set; } = "Bearer";
    public int ExpiresInMinutes { get; set; } = 480; // 8 hours
    public UserDto User { get; set; } = null!;
}
