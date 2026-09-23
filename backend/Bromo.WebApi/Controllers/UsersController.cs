using Bromo.Application.DTOs.Users;
using Bromo.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Bromo.WebApi.Controllers;

[Authorize]
public class UsersController : ApiControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Read/View logged-in user profile information
    /// </summary>
    [HttpGet("profile")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProfile(CancellationToken cancellationToken)
    {
        if (CurrentUserId == Guid.Empty)
            return Unauthorized(new { message = "Invalid or expired user session." });

        var user = await _userService.GetProfileAsync(CurrentUserId, cancellationToken);
        return Ok(user);
    }

    /// <summary>
    /// Update logged-in user profile information
    /// </summary>
    [HttpPut("profile")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequestDto request, CancellationToken cancellationToken)
    {
        if (CurrentUserId == Guid.Empty)
            return Unauthorized(new { message = "Invalid or expired user session." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updatedUser = await _userService.UpdateProfileAsync(CurrentUserId, request, cancellationToken);
        return Ok(updatedUser);
    }

    /// <summary>
    /// Change password for logged-in user
    /// </summary>
    [HttpPut("change-password")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequestDto request, CancellationToken cancellationToken)
    {
        if (CurrentUserId == Guid.Empty)
            return Unauthorized(new { message = "Invalid or expired user session." });

        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _userService.ChangePasswordAsync(CurrentUserId, request, cancellationToken);
        return Ok(new { message = "Password changed successfully." });
    }

    /// <summary>
    /// Delete logged-in user account
    /// </summary>
    [HttpDelete("account")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteAccount(CancellationToken cancellationToken)
    {
        if (CurrentUserId == Guid.Empty)
            return Unauthorized(new { message = "Invalid or expired user session." });

        await _userService.DeleteAccountAsync(CurrentUserId, cancellationToken);
        return Ok(new { message = "Account deleted successfully." });
    }
}
