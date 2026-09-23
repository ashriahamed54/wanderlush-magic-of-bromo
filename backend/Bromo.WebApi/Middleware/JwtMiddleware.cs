using Bromo.Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Bromo.WebApi.Middleware;

public class JwtMiddleware
{
    private readonly RequestDelegate _next;

    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(
        HttpContext context,
        IJwtTokenGenerator tokenGenerator,
        IApplicationDbContext dbContext)
    {
        var token = context.Request.Headers["Authorization"]
            .FirstOrDefault()?
            .Split(" ")
            .Last();

        if (!string.IsNullOrWhiteSpace(token))
        {
            var userId = tokenGenerator.ValidateToken(token);
            if (userId.HasValue)
            {
                // Attach user id and user entity to context
                context.Items["UserId"] = userId.Value;

                var user = await dbContext.Users
                    .AsNoTracking()
                    .FirstOrDefaultAsync(u => u.Id == userId.Value && u.IsActive);

                if (user != null)
                {
                    context.Items["User"] = user;
                    var claims = new System.Collections.Generic.List<System.Security.Claims.Claim>
                    {
                        new(System.Security.Claims.ClaimTypes.NameIdentifier, user.Id.ToString()),
                        new(System.Security.Claims.ClaimTypes.Email, user.Email),
                        new(System.Security.Claims.ClaimTypes.Name, user.FullName),
                        new(System.Security.Claims.ClaimTypes.Role, user.Role.ToString())
                    };
                    var identity = new System.Security.Claims.ClaimsIdentity(claims, "Bearer");
                    context.User = new System.Security.Claims.ClaimsPrincipal(identity);
                }
            }
        }

        await _next(context);
    }
}
