using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KolejnaPodroz.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class NewModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destination",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "From",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Connections");

            migrationBuilder.RenameColumn(
                name: "Wagon",
                table: "Connections",
                newName: "FromId");

            migrationBuilder.RenameColumn(
                name: "Seat",
                table: "Connections",
                newName: "DestinationId");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Tickets",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Seat",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Wagon",
                table: "Tickets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Stations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stations", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Connections_DestinationId",
                table: "Connections",
                column: "DestinationId");

            migrationBuilder.CreateIndex(
                name: "IX_Connections_FromId",
                table: "Connections",
                column: "FromId");

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Stations_DestinationId",
                table: "Connections",
                column: "DestinationId",
                principalTable: "Stations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Connections_Stations_FromId",
                table: "Connections",
                column: "FromId",
                principalTable: "Stations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Stations_DestinationId",
                table: "Connections");

            migrationBuilder.DropForeignKey(
                name: "FK_Connections_Stations_FromId",
                table: "Connections");

            migrationBuilder.DropTable(
                name: "Stations");

            migrationBuilder.DropIndex(
                name: "IX_Connections_DestinationId",
                table: "Connections");

            migrationBuilder.DropIndex(
                name: "IX_Connections_FromId",
                table: "Connections");

            migrationBuilder.DropColumn(
                name: "Price",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Seat",
                table: "Tickets");

            migrationBuilder.DropColumn(
                name: "Wagon",
                table: "Tickets");

            migrationBuilder.RenameColumn(
                name: "FromId",
                table: "Connections",
                newName: "Wagon");

            migrationBuilder.RenameColumn(
                name: "DestinationId",
                table: "Connections",
                newName: "Seat");

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "From",
                table: "Connections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Connections",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
