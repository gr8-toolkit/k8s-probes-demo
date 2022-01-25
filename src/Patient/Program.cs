var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var httpBin = app.Services.GetService<IConfiguration>()["HTTPBIN_URL"];
var httpClient = new HttpClient();

async Task<string> CheckDependency()
{
    await httpClient.GetStringAsync(httpBin);

    return "The dependency is OK";
}

app.MapGet("/check-nodep", () => DateTime.Now);
app.MapGet("/check-dep", CheckDependency);

app.Run();
