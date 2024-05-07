using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KolejnaPodroz.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class migconprice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Connections",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Connections");
        }
    }
}
