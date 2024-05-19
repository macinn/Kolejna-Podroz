using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KolejnaPodroz.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class updateUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TicketsBought",
                table: "AccountInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TravelTime",
                table: "AccountInfo",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TicketsBought",
                table: "AccountInfo");

            migrationBuilder.DropColumn(
                name: "TravelTime",
                table: "AccountInfo");
        }
    }
}
