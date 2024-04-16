using KolejnaPodroz.DataAccess.Data;
using KolejnaPodroz.DataAccess.Repository.IRepository;
using KolejnaPodroz.DataAccess.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Rewrite;
using KolejnaPodroz.Domain.Services.StationService;
using KolejnaPodroz.Domain.Services.ProviderService;
using KolejnaPodroz.Domain.Services.ConnectionService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mysqlbuilder = new MySqlConnectionStringBuilder
{
    Server = "kp-db.mysql.database.azure.com",
    Database = "kp",
    UserID = "kpadmin",
    Password = "admin123!",
    SslMode = MySqlSslMode.Required,
};

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseMySQL(mysqlbuilder.ConnectionString);
});

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IStationService, StationService>();
builder.Services.AddScoped<IConnectionService, ConnectionService>();
builder.Services.AddScoped<IProviderService, ProviderService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://dev-smj8b7vj3kgqfm7t.us.auth0.com/";
        options.Audience = "ORNb5eV7D2sZI9Laq6SXrMqYLJF3LgcP"; // Nazwa audytorium z Auth0
        options.TokenValidationParameters = new TokenValidationParameters
        {
            RoleClaimType = "role", // Klucz roli w tokenie
        };
    });

var PolicyName = "AllowAll";
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(PolicyName,
        builder =>
        {
            builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

var app = builder.Build();

app.UseFileServer();

app.UseCors(PolicyName);
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
