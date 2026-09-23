using Bromo.Infrastructure;
using Bromo.Infrastructure.Persistence;
using Bromo.WebApi.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Ensure Railway PORT environment variable is respected
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
Environment.SetEnvironmentVariable("ASPNETCORE_URLS", $"http://+:{port}");

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
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wanderlush Clean Architecture API v1");
    c.RoutePrefix = "swagger";
});

app.MapGet("/", () => Results.Redirect("/swagger"));

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
        db.Database.EnsureCreated();
        logger.LogInformation("Database connected and schema verified.");

        if (!db.Users.Any())
        {
            var hasher = scope.ServiceProvider.GetRequiredService<Bromo.Application.Common.Interfaces.IPasswordHasher>();
            db.Users.Add(new Bromo.Domain.Entities.User
            {
                Id = Guid.Parse("a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"),
                FullName = "Aris Prasetyo",
                Email = "aris.traveler@wanderlush.com",
                PasswordHash = hasher.HashPassword("Bromo2026!"),
                PhoneNumber = "+62 812-3456-7890",
                Bio = "Bromo caldera explorer, mountain photographer, and highland trekker.",
                AvatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
                Role = Bromo.Domain.Enums.UserRole.Traveler,
                IsActive = true
            });
            db.SaveChanges();
            logger.LogInformation("Seeded initial demo traveler into database.");
        }
    }
    catch (Exception ex)
    {
        logger.LogInformation("Database connection note on startup: {Message}", ex.Message);
    }
}

app.Run();
