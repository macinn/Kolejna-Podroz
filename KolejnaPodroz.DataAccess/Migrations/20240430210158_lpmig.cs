using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KolejnaPodroz.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class lpmig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Points",
                table: "Connections",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "LoyaltyPoints",
                table: "AccountInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Points",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "LoyaltyPoints",
                table: "AccountInfo");
        }
    }
}
