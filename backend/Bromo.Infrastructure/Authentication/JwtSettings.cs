namespace Bromo.Infrastructure.Authentication;

public class JwtSettings
{
    public const string SectionName = "JwtSettings";

    public string SecretKey { get; set; } = string.Empty;
    public string Issuer { get; set; } = "BromoApi";
    public string Audience { get; set; } = "BromoClient";
    public int ExpiryInHours { get; set; } = 8;
}
