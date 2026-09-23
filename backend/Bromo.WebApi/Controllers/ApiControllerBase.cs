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
            if (HttpContext.Items["UserId"] is Guid contextId && contextId != Guid.Empty)
                return contextId;

            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("sub")?.Value
                ?? User.FindFirst("id")?.Value
                ?? User.FindFirst("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;

            if (Guid.TryParse(idClaim, out var id))
                return id;

            return Guid.Empty;
        }
    }

    protected string? CurrentUserEmail =>
        User.FindFirst(ClaimTypes.Email)?.Value;

    protected string? CurrentUserRole =>
        User.FindFirst(ClaimTypes.Role)?.Value;
}
