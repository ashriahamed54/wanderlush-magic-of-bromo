using Bromo.Infrastructure;
using Bromo.Infrastructure.Persistence;
using Bromo.WebApi.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Ensure Railway PORT environment variable is respected
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

// 1. Add Clean Architecture Layers & Services
builder.Services.AddInfrastructureServices(builder.Configuration);

// 2. Add Controllers with JSON formatting
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        // Keep default automatic 400 responses clean
    });

builder.Services.AddEndpointsApiExplorer();

// 3. Configure Swagger with JWT Bearer Authentication
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Wanderlush Bromo Clean Architecture API",
        Version = "v1",
        Description = ".NET Clean Architecture Web API with JWT Authentication, EF Core, and PostgreSQL for Wanderlush."
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Bearer token like: Bearer {your token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// 4. Configure CORS for Next.js Client
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNextJsClient", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001",
                "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            .SetIsOriginAllowed(_ => true); // Supports AI Studio preview domains
    });
});

var app = builder.Build();

// 5. Global Exception Handling Middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

// 6. Swagger documentation
if (app.Environment.IsDevelopment() || true)
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wanderlush API v1");
        c.RoutePrefix = string.Empty; // Swagger UI at root
    });
}

// 7. Security and Routing Pipeline
app.UseCors("AllowNextJsClient");

app.UseAuthentication();
app.UseMiddleware<JwtMiddleware>();
app.UseAuthorization();

app.MapControllers();

// 8. Auto-verify PostgreSQL connection and ensure schema
using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        if (db.Database.CanConnect())
        {
            logger.LogInformation("Successfully connected to PostgreSQL database.");
            db.Database.EnsureCreated();
        }
        else
        {
            logger.LogWarning("PostgreSQL database is currently unreachable. Requests will be handled once database is started or fallback mode.");
        }
    }
    catch (Exception ex)
    {
        logger.LogInformation("Database connection note on startup: {Message}", ex.Message);
    }
}

app.Run();
