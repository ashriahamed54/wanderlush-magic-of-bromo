using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace Bromo.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class ApiControllerBase : ControllerBase
{
    protected Guid CurrentUserId
    {
        get
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (Guid.TryParse(idClaim, out var id))
                return id;

            if (HttpContext.Items["UserId"] is Guid contextId)
                return contextId;

            return Guid.Empty;
        }
    }

    protected string? CurrentUserEmail =>
        User.FindFirst(ClaimTypes.Email)?.Value;

    protected string? CurrentUserRole =>
        User.FindFirst(ClaimTypes.Role)?.Value;
}
