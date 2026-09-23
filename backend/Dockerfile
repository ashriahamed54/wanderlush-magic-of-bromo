# Multi-stage Dockerfile for Bromo .NET 8 Web API
# Optimized for Railway and Containerized Cloud Deployments

# Stage 1: Build & Publish
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files first for efficient layer caching
COPY ["Bromo.CleanArchitecture.sln", "./"]
COPY ["Bromo.Domain/Bromo.Domain.csproj", "Bromo.Domain/"]
COPY ["Bromo.Application/Bromo.Application.csproj", "Bromo.Application/"]
COPY ["Bromo.Infrastructure/Bromo.Infrastructure.csproj", "Bromo.Infrastructure/"]
COPY ["Bromo.WebApi/Bromo.WebApi.csproj", "Bromo.WebApi/"]

# Restore dependencies
RUN dotnet restore "Bromo.WebApi/Bromo.WebApi.csproj"

# Copy remaining source code
COPY . .

# Build and publish release output
WORKDIR "/src/Bromo.WebApi"
RUN dotnet publish "Bromo.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 2: Minimal Runtime Container
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Default port configuration (overridden dynamically by Railway's PORT env var)
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "Bromo.WebApi.dll"]
