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
                }
            }
        }

        await _next(context);
    }
}
