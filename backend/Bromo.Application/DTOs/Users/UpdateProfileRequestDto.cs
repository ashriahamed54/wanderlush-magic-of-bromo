using System.ComponentModel.DataAnnotations;

namespace Bromo.Application.DTOs.Users;

public class UpdateProfileRequestDto
{
    [Required(ErrorMessage = "Full name is required.")]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Full name must be between 2 and 100 characters.")]
    public string FullName { get; set; } = string.Empty;

    [StringLength(50, ErrorMessage = "Phone number must not exceed 50 characters.")]
    public string? PhoneNumber { get; set; }

    [StringLength(500, ErrorMessage = "Bio must not exceed 500 characters.")]
    public string? Bio { get; set; }

    [StringLength(500, ErrorMessage = "Avatar URL must not exceed 500 characters.")]
    public string? AvatarUrl { get; set; }
}
