using System.Text;
using Bromo.Application.Common.Interfaces;
using Bromo.Application.Services;
using Bromo.Infrastructure.Authentication;
using Bromo.Infrastructure.Persistence;
using Bromo.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Bromo.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // 1. Database DbContext: PostgreSQL on Railway/Cloud, SQLite for smooth local development
        var envDbUrl = configuration["DATABASE_URL"] 
            ?? configuration["DATABASE_PUBLIC_URL"] 
            ?? Environment.GetEnvironmentVariable("DATABASE_URL")
            ?? Environment.GetEnvironmentVariable("DATABASE_PUBLIC_URL");

        var configuredConn = configuration.GetConnectionString("DefaultConnection");
        bool hasPostgresConfig = !string.IsNullOrWhiteSpace(envDbUrl) || 
            (!string.IsNullOrWhiteSpace(configuredConn) && !configuredConn.Contains("your_secure_password"));

        if (hasPostgresConfig)
        {
            var connectionString = BuildPostgreSqlConnectionString(configuration);
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString, b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }
        else
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite("Data Source=bromo_wanderlush.db", b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));
        }

        services.AddScoped<IApplicationDbContext>(provider =>
            provider.GetRequiredService<ApplicationDbContext>());

        // 2. JWT Configuration
        var jwtSection = configuration.GetSection(JwtSettings.SectionName);
        services.Configure<JwtSettings>(jwtSection);
        var jwtSettings = jwtSection.Get<JwtSettings>() ?? new JwtSettings();
        var secretKey = !string.IsNullOrWhiteSpace(jwtSettings.SecretKey) 
            ? jwtSettings.SecretKey 
            : "WanderlushSuperSecretJwtKeyForBromoExplorations2026!#RequiresAtLeast256BitsLength";

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromMinutes(5)
            };
        });

        // 3. Security & Application Services
        services.AddHttpContextAccessor();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();
        services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
        services.AddScoped<ICurrentUserService, CurrentUserService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IUserService, UserService>();

        return services;
    }

    private static string BuildPostgreSqlConnectionString(IConfiguration configuration)
    {
        // 1. If DATABASE_URL or DATABASE_PUBLIC_URL is provided (e.g. Railway / Cloud Postgres), prioritize it!
        var envDbUrl = configuration["DATABASE_URL"] 
            ?? configuration["DATABASE_PUBLIC_URL"] 
            ?? Environment.GetEnvironmentVariable("DATABASE_URL")
            ?? Environment.GetEnvironmentVariable("DATABASE_PUBLIC_URL");

        if (!string.IsNullOrWhiteSpace(envDbUrl))
        {
            return ParsePostgreSqlUrl(envDbUrl);
        }

        // 2. Otherwise check ConnectionStrings:DefaultConnection
        var connStr = configuration.GetConnectionString("DefaultConnection");
        if (!string.IsNullOrWhiteSpace(connStr) && !connStr.Contains("your_secure_password"))
        {
            return ParsePostgreSqlUrl(connStr);
        }

        // 3. Fallback for local development
        return "Host=localhost;Port=5432;Database=bromo_wanderlush_db;Username=postgres;Password=postgres;";
    }

    private static string ParsePostgreSqlUrl(string rawUrl)
    {
        if (rawUrl.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) ||
            rawUrl.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
        {
            try
            {
                var uri = new Uri(rawUrl);
                var userInfo = uri.UserInfo.Split(':');
                var username = userInfo.Length > 0 ? userInfo[0] : "postgres";
                var password = userInfo.Length > 1 ? userInfo[1] : "";
                var port = uri.Port > 0 ? uri.Port : 5432;
                var database = uri.AbsolutePath.TrimStart('/');
                return $"Host={uri.Host};Port={port};Database={database};Username={username};Password={password};SSL Mode=Prefer;Trust Server Certificate=true;";
            }
            catch
            {
                return rawUrl;
            }
        }
        return rawUrl;
    }
}
