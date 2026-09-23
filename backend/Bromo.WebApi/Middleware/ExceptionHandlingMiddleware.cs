using System.Net;
using System.Text.Json;
using Bromo.Application.Common.Exceptions;
using Bromo.Domain.Exceptions;

namespace Bromo.WebApi.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unhandled exception occurred during request execution: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var statusCode = HttpStatusCode.InternalServerError;
        object response;

        switch (exception)
        {
            case ValidationException valEx:
                statusCode = HttpStatusCode.BadRequest;
                response = new
                {
                    status = (int)statusCode,
                    title = "Validation Error",
                    message = valEx.Message,
                    errors = valEx.Errors
                };
                break;

            case UnauthorizedException unauthEx:
                statusCode = HttpStatusCode.Unauthorized;
                response = new
                {
                    status = (int)statusCode,
                    title = "Unauthorized",
                    message = unauthEx.Message
                };
                break;

            case NotFoundException notFoundEx:
                statusCode = HttpStatusCode.NotFound;
                response = new
                {
                    status = (int)statusCode,
                    title = "Not Found",
                    message = notFoundEx.Message
                };
                break;

            case DomainException domainEx:
                statusCode = HttpStatusCode.BadRequest;
                response = new
                {
                    status = (int)statusCode,
                    title = "Domain Rule Violation",
                    message = domainEx.Message
                };
                break;

            default:
                statusCode = HttpStatusCode.InternalServerError;
                response = new
                {
                    status = (int)statusCode,
                    title = "Server Error",
                    message = "An unexpected error occurred. Please try again later."
                };
                break;
        }

        context.Response.StatusCode = (int)statusCode;
        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsync(JsonSerializer.Serialize(response, jsonOptions));
    }
}
